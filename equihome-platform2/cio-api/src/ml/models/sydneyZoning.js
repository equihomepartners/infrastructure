const tf = require('@tensorflow/tfjs-node');
const { loadTrainedModel } = require('../utils/modelLoader');

class SydneyZoningModel {
  constructor() {
    this.geographicModel = null;
    this.riskModel = null;
    this.transitionModel = null;
  }

  async initialize() {
    this.geographicModel = await loadTrainedModel('sydney_geographic');
    this.riskModel = await loadTrainedModel('sydney_risk');
    this.transitionModel = await loadTrainedModel('sydney_transition');
  }

  async classifyZone(suburbData) {
    const {
      marketMetrics,
      economicIndicators,
      infrastructure,
      transport,
      schools,
      development,
      population,
      propertyMetrics
    } = suburbData;

    // Analyze market fundamentals
    const fundamentalFeatures = tf.tensor2d([
      // Price metrics
      propertyMetrics.medianPrice,
      propertyMetrics.priceGrowth5Year,
      propertyMetrics.priceGrowth10Year,
      propertyMetrics.medianEquityLevel,
      
      // Market strength
      marketMetrics.daysOnMarket,
      marketMetrics.clearanceRate,
      marketMetrics.listingVolume,
      marketMetrics.buyerDemand,
      
      // Growth indicators
      development.plannedProjects,
      development.investmentValue,
      infrastructure.planned,
      infrastructure.existing,
      
      // Economic strength
      economicIndicators.employment,
      economicIndicators.income,
      economicIndicators.businessGrowth,
      
      // Population metrics
      population.growth,
      population.density,
      population.medianAge
    ]);

    // Analyze risk factors
    const riskFeatures = tf.tensor2d([
      propertyMetrics.priceVolatility,
      propertyMetrics.rentalYield,
      marketMetrics.supplyDemandRatio,
      marketMetrics.inventoryLevel,
      economicIndicators.unemploymentRate,
      economicIndicators.businessClosures,
      population.turnover
    ]);

    const fundamentalScore = await this.geographicModel.predict(fundamentalFeatures);
    const riskScore = await this.riskModel.predict(riskFeatures);

    return this.determineZone(fundamentalScore, riskScore, suburbData);
  }

  async predictTransition(currentZone, marketData) {
    const transitionFeatures = tf.tensor2d([
      marketData.priceGrowthRate,
      marketData.salesVolumeTrend,
      marketData.developmentProgress,
      marketData.infrastructureCompletion,
      marketData.economicGrowth,
      marketData.populationChange
    ]);

    const transitionProbability = await this.transitionModel.predict(transitionFeatures);
    return this.analyzeTransition(currentZone, transitionProbability, marketData);
  }

  determineZone(fundamentalScore, riskScore, suburbData) {
    // Weight the scores based on importance
    const weightedScore = (fundamentalScore * 0.7) + ((1 - riskScore) * 0.3);
    
    // Green Zone: Strong fundamentals, high equity, proven growth
    if (weightedScore >= 0.8 && 
        suburbData.propertyMetrics.medianEquityLevel > 0.4 && 
        suburbData.marketMetrics.clearanceRate > 65) {
      return {
        zone: 'green',
        confidence: weightedScore,
        fundamentals: {
          equity: suburbData.propertyMetrics.medianEquityLevel,
          growth: suburbData.propertyMetrics.priceGrowth5Year,
          demand: suburbData.marketMetrics.buyerDemand
        },
        strengths: this.identifyStrengths(suburbData),
        opportunities: this.identifyOpportunities(suburbData)
      };
    } 
    // Yellow Zone: Emerging potential, moderate fundamentals
    else if (weightedScore >= 0.6 && 
             suburbData.development.plannedProjects > 0 &&
             suburbData.infrastructure.planned > 0) {
      return {
        zone: 'yellow',
        confidence: weightedScore,
        fundamentals: {
          development: suburbData.development.plannedProjects,
          infrastructure: suburbData.infrastructure.planned,
          growth: suburbData.propertyMetrics.priceGrowth5Year
        },
        catalysts: this.identifyCatalysts(suburbData),
        risks: this.identifyRisks(suburbData)
      };
    }
    // Red Zone: Weak fundamentals or high risk
    else {
      return {
        zone: 'red',
        confidence: weightedScore,
        fundamentals: {
          risk: riskScore,
          market: suburbData.marketMetrics.supplyDemandRatio,
          economics: suburbData.economicIndicators.unemploymentRate
        },
        concerns: this.identifyConcerns(suburbData),
        watchFactors: this.identifyWatchFactors(suburbData)
      };
    }
  }

  analyzeTransition(currentZone, probability, marketData) {
    const transitionLikelihood = this.calculateTransitionLikelihood(probability, marketData);
    const timeframe = this.estimateTransitionTimeframe(probability, marketData);
    
    return {
      currentZone,
      transitionProbability: transitionLikelihood,
      timeframe,
      catalysts: this.identifyTransitionCatalysts(marketData),
      requirements: this.identifyTransitionRequirements(marketData),
      confidenceScore: this.calculateConfidenceScore(probability, marketData)
    };
  }

  identifyStrengths(suburbData) {
    const strengths = [];
    
    if (suburbData.propertyMetrics.medianEquityLevel > 0.5) {
      strengths.push('High equity levels');
    }
    if (suburbData.marketMetrics.clearanceRate > 70) {
      strengths.push('Strong auction performance');
    }
    if (suburbData.propertyMetrics.priceGrowth5Year > 0.25) {
      strengths.push('Consistent capital growth');
    }
    if (suburbData.economicIndicators.income > 100000) {
      strengths.push('High household income');
    }
    
    return strengths;
  }

  identifyOpportunities(suburbData) {
    const opportunities = [];
    
    if (suburbData.development.plannedProjects > 3) {
      opportunities.push('Major development pipeline');
    }
    if (suburbData.infrastructure.planned > 2) {
      opportunities.push('Infrastructure improvements');
    }
    if (suburbData.marketMetrics.buyerDemand > 0.8) {
      opportunities.push('Strong buyer demand');
    }
    
    return opportunities;
  }

  identifyCatalysts(suburbData) {
    const catalysts = [];
    
    if (suburbData.development.investmentValue > 1000000) {
      catalysts.push('Significant development investment');
    }
    if (suburbData.infrastructure.planned > 0) {
      catalysts.push('Planned infrastructure');
    }
    if (suburbData.population.growth > 0.02) {
      catalysts.push('Population growth');
    }
    
    return catalysts;
  }

  identifyRisks(suburbData) {
    const risks = [];
    
    if (suburbData.marketMetrics.supplyDemandRatio > 1.2) {
      risks.push('Supply exceeds demand');
    }
    if (suburbData.propertyMetrics.priceVolatility > 0.15) {
      risks.push('Price volatility');
    }
    if (suburbData.economicIndicators.unemploymentRate > 0.06) {
      risks.push('Higher unemployment');
    }
    
    return risks;
  }

  identifyConcerns(suburbData) {
    const concerns = [];
    
    if (suburbData.marketMetrics.daysOnMarket > 60) {
      concerns.push('Slow market absorption');
    }
    if (suburbData.propertyMetrics.priceGrowth5Year < 0) {
      concerns.push('Negative price growth');
    }
    if (suburbData.economicIndicators.businessClosures > 0.1) {
      concerns.push('Business closures');
    }
    
    return concerns;
  }

  identifyWatchFactors(suburbData) {
    const factors = [];
    
    if (suburbData.development.plannedProjects > 0) {
      factors.push('Development progress');
    }
    if (suburbData.infrastructure.planned > 0) {
      factors.push('Infrastructure implementation');
    }
    if (suburbData.economicIndicators.businessGrowth > 0) {
      factors.push('Economic improvement');
    }
    
    return factors;
  }

  calculateTransitionLikelihood(probability, marketData) {
    const baseProb = probability[0];
    const marketFactor = this.calculateMarketFactor(marketData);
    return Math.min(baseProb * marketFactor, 1.0);
  }

  calculateMarketFactor(marketData) {
    const factors = [
      marketData.priceGrowthRate > 0 ? 1.2 : 0.8,
      marketData.salesVolumeTrend > 0 ? 1.1 : 0.9,
      marketData.developmentProgress > 0.5 ? 1.2 : 1.0,
      marketData.infrastructureCompletion > 0.5 ? 1.2 : 1.0,
      marketData.economicGrowth > 0 ? 1.1 : 0.9,
      marketData.populationChange > 0 ? 1.1 : 0.9
    ];
    
    return factors.reduce((a, b) => a * b, 1.0);
  }

  estimateTransitionTimeframe(probability, marketData) {
    const basePeriod = probability[0] > 0.8 ? 6 : 
                      probability[0] > 0.6 ? 12 : 18;
    
    const adjustments = [
      marketData.developmentProgress > 0.7 ? -2 : 0,
      marketData.infrastructureCompletion > 0.7 ? -2 : 0,
      marketData.economicGrowth > 0.05 ? -1 : 0,
      marketData.populationChange > 0.02 ? -1 : 0
    ];
    
    const adjustment = adjustments.reduce((a, b) => a + b, 0);
    return Math.max(basePeriod + adjustment, 3);
  }

  calculateConfidenceScore(probability, marketData) {
    const baseConfidence = probability[0];
    const marketConfidence = (
      marketData.priceGrowthRate > 0 ? 0.2 : 0 +
      marketData.developmentProgress > 0.5 ? 0.2 : 0 +
      marketData.infrastructureCompletion > 0.5 ? 0.2 : 0 +
      marketData.economicGrowth > 0 ? 0.2 : 0 +
      marketData.populationChange > 0 ? 0.2 : 0
    );
    
    const score = (baseConfidence * 0.6) + (marketConfidence * 0.4);
    return score > 0.8 ? 'High' : score > 0.6 ? 'Medium' : 'Low';
  }

  identifyTransitionCatalysts(marketData) {
    const catalysts = [];
    
    if (marketData.developmentProgress > 0.7) {
      catalysts.push('Development completion');
    }
    if (marketData.infrastructureCompletion > 0.7) {
      catalysts.push('Infrastructure delivery');
    }
    if (marketData.economicGrowth > 0.05) {
      catalysts.push('Economic growth');
    }
    if (marketData.populationChange > 0.02) {
      catalysts.push('Population growth');
    }
    
    return catalysts;
  }

  identifyTransitionRequirements(marketData) {
    const requirements = [];
    
    if (marketData.developmentProgress < 0.5) {
      requirements.push('Development progress');
    }
    if (marketData.infrastructureCompletion < 0.5) {
      requirements.push('Infrastructure completion');
    }
    if (marketData.economicGrowth <= 0) {
      requirements.push('Economic improvement');
    }
    if (marketData.populationChange <= 0) {
      requirements.push('Population growth');
    }
    
    return requirements;
  }
}

module.exports = new SydneyZoningModel(); 
const tf = require('@tensorflow/tfjs-node');
const { loadTrainedModel } = require('../utils/modelLoader');
const sydneyZoning = require('./sydneyZoning');

class PortfolioOptimizationModel {
  constructor() {
    this.opportunityModel = null;
    this.riskModel = null;
  }

  async initialize() {
    this.opportunityModel = await loadTrainedModel('portfolio_opportunity');
    this.riskModel = await loadTrainedModel('portfolio_risk');
  }

  async analyzeOpportunities(portfolioData) {
    const {
      currentHoldings,
      marketConditions,
      zoneData,
      propertyMetrics
    } = portfolioData;

    const opportunityFeatures = tf.tensor2d([
      ...Object.values(marketConditions),
      ...Object.values(propertyMetrics),
      ...this.extractZoneMetrics(zoneData)
    ]);

    const riskFeatures = tf.tensor2d([
      ...this.calculateConcentrationMetrics(currentHoldings),
      ...Object.values(marketConditions),
      ...this.extractRiskMetrics(zoneData)
    ]);

    const opportunityScores = await this.opportunityModel.predict(opportunityFeatures);
    const riskAssessment = await this.riskModel.predict(riskFeatures);

    return this.generateInsights(opportunityScores, riskAssessment, portfolioData);
  }

  extractZoneMetrics(zoneData) {
    return [
      zoneData.fundamentals.equity,
      zoneData.fundamentals.growth,
      zoneData.fundamentals.demand,
      zoneData.marketMetrics.clearanceRate,
      zoneData.marketMetrics.daysOnMarket,
      zoneData.development.plannedProjects,
      zoneData.infrastructure.planned
    ];
  }

  extractRiskMetrics(zoneData) {
    return [
      zoneData.propertyMetrics.priceVolatility,
      zoneData.marketMetrics.supplyDemandRatio,
      zoneData.economicIndicators.unemploymentRate,
      zoneData.population.turnover
    ];
  }

  calculateConcentrationMetrics(holdings) {
    const totalValue = Object.values(holdings).reduce((sum, h) => sum + h.value, 0);
    const metrics = [];

    // Geographic concentration
    const bySuburb = this.calculateConcentration(
      holdings, 
      h => h.suburb, 
      totalValue
    );

    // Property type concentration
    const byType = this.calculateConcentration(
      holdings,
      h => h.propertyType,
      totalValue
    );

    // Price point concentration
    const byPriceRange = this.calculateConcentration(
      holdings,
      h => this.getPriceRange(h.value),
      totalValue
    );

    return [...bySuburb, ...byType, ...byPriceRange];
  }

  calculateConcentration(holdings, keyFn, total) {
    const groups = {};
    
    Object.values(holdings).forEach(holding => {
      const key = keyFn(holding);
      groups[key] = (groups[key] || 0) + holding.value;
    });

    return Object.values(groups).map(value => value / total);
  }

  getPriceRange(value) {
    if (value < 750000) return 'entry';
    if (value < 1500000) return 'mid';
    return 'premium';
  }

  generateInsights(opportunityScores, riskAssessment, portfolioData) {
    return {
      opportunities: this.identifyOpportunities(opportunityScores, portfolioData),
      risks: this.assessRisks(riskAssessment, portfolioData),
      recommendations: this.generateRecommendations(
        opportunityScores,
        riskAssessment,
        portfolioData
      ),
      diversification: this.analyzeDiversification(portfolioData.currentHoldings),
      marketPosition: this.assessMarketPosition(portfolioData)
    };
  }

  identifyOpportunities(scores, portfolioData) {
    const opportunities = [];
    const { zoneData, marketConditions } = portfolioData;

    // High-equity opportunities
    if (zoneData.fundamentals.equity > 0.4 && scores[0] > 0.7) {
      opportunities.push({
        type: 'High Equity Position',
        strength: 'Strong',
        metrics: {
          equity: zoneData.fundamentals.equity,
          growth: zoneData.fundamentals.growth
        },
        strategy: 'Target properties with substantial equity growth potential'
      });
    }

    // Growth corridor opportunities
    if (zoneData.development.plannedProjects > 2 && scores[1] > 0.6) {
      opportunities.push({
        type: 'Growth Corridor',
        strength: 'Emerging',
        metrics: {
          projects: zoneData.development.plannedProjects,
          infrastructure: zoneData.infrastructure.planned
        },
        strategy: 'Position for future growth catalysts'
      });
    }

    // Market cycle opportunities
    if (marketConditions.cyclePosition === 'Recovery' && scores[2] > 0.65) {
      opportunities.push({
        type: 'Market Timing',
        strength: 'Tactical',
        metrics: {
          cycle: marketConditions.cyclePosition,
          confidence: marketConditions.cycleConfidence
        },
        strategy: 'Enter market during recovery phase'
      });
    }

    return opportunities;
  }

  assessRisks(riskAssessment, portfolioData) {
    const risks = [];
    const { zoneData, marketConditions } = portfolioData;

    // Concentration risk
    if (riskAssessment[0] > 0.7) {
      risks.push({
        type: 'Concentration Risk',
        level: 'High',
        metrics: this.calculateConcentrationMetrics(portfolioData.currentHoldings),
        mitigation: 'Diversify holdings across different suburbs and property types'
      });
    }

    // Market risk
    if (marketConditions.volatility > 0.15) {
      risks.push({
        type: 'Market Volatility',
        level: 'Elevated',
        metrics: {
          volatility: marketConditions.volatility,
          trend: marketConditions.volatilityTrend
        },
        mitigation: 'Implement stronger risk controls and monitoring'
      });
    }

    // Geographic risk
    if (zoneData.marketMetrics.supplyDemandRatio > 1.2) {
      risks.push({
        type: 'Supply Risk',
        level: 'Moderate',
        metrics: {
          ratio: zoneData.marketMetrics.supplyDemandRatio,
          absorption: zoneData.marketMetrics.daysOnMarket
        },
        mitigation: 'Monitor supply levels and market absorption rates'
      });
    }

    return risks;
  }

  generateRecommendations(opportunities, risks, portfolioData) {
    const recommendations = [];
    const { zoneData, marketConditions } = portfolioData;

    // Strategic recommendations
    if (opportunities[0] > 0.8 && risks[0] < 0.3) {
      recommendations.push({
        type: 'Strategic',
        action: 'Expand Position',
        rationale: 'Strong fundamentals with manageable risk',
        implementation: [
          'Focus on high-equity properties',
          'Target key growth corridors',
          'Maintain quality standards'
        ]
      });
    }

    // Tactical recommendations
    if (marketConditions.cyclePosition === 'Recovery' && opportunities[1] > 0.7) {
      recommendations.push({
        type: 'Tactical',
        action: 'Market Entry',
        rationale: 'Favorable market cycle position',
        implementation: [
          'Identify undervalued assets',
          'Focus on strong fundamentals',
          'Monitor market indicators'
        ]
      });
    }

    // Risk management recommendations
    if (risks[0] > 0.6) {
      recommendations.push({
        type: 'Risk Management',
        action: 'Portfolio Adjustment',
        rationale: 'Elevated risk levels require attention',
        implementation: [
          'Diversify holdings',
          'Strengthen risk controls',
          'Regular monitoring'
        ]
      });
    }

    return recommendations;
  }

  analyzeDiversification(holdings) {
    const analysis = {
      geographic: this.calculateDiversificationMetrics(holdings, h => h.suburb),
      propertyType: this.calculateDiversificationMetrics(holdings, h => h.propertyType),
      pricePoint: this.calculateDiversificationMetrics(holdings, h => this.getPriceRange(h.value))
    };

    return {
      metrics: analysis,
      score: this.calculateDiversificationScore(analysis),
      recommendations: this.generateDiversificationRecommendations(analysis)
    };
  }

  calculateDiversificationMetrics(holdings, keyFn) {
    const groups = {};
    const totalValue = Object.values(holdings).reduce((sum, h) => sum + h.value, 0);

    Object.values(holdings).forEach(holding => {
      const key = keyFn(holding);
      groups[key] = (groups[key] || 0) + holding.value;
    });

    const concentrations = Object.values(groups).map(value => value / totalValue);
    return {
      herfindahl: concentrations.reduce((sum, c) => sum + Math.pow(c, 2), 0),
      largest: Math.max(...concentrations),
      count: Object.keys(groups).length
    };
  }

  calculateDiversificationScore(analysis) {
    const weights = {
      geographic: 0.4,
      propertyType: 0.3,
      pricePoint: 0.3
    };

    return Object.entries(weights).reduce((score, [key, weight]) => {
      const metrics = analysis[key];
      return score + (
        (1 - metrics.herfindahl) * 0.5 +
        (1 - metrics.largest) * 0.3 +
        Math.min(metrics.count / 5, 1) * 0.2
      ) * weight;
    }, 0);
  }

  generateDiversificationRecommendations(analysis) {
    const recommendations = [];

    if (analysis.geographic.herfindahl > 0.3) {
      recommendations.push('Expand into additional suburbs');
    }

    if (analysis.propertyType.largest > 0.5) {
      recommendations.push('Diversify property types');
    }

    if (analysis.pricePoint.count < 3) {
      recommendations.push('Consider different price points');
    }

    return recommendations;
  }

  assessMarketPosition(portfolioData) {
    const { marketConditions, zoneData } = portfolioData;

    return {
      cycle: {
        position: marketConditions.cyclePosition,
        confidence: marketConditions.cycleConfidence,
        timeframe: marketConditions.cycleDuration
      },
      fundamentals: {
        equity: zoneData.fundamentals.equity,
        growth: zoneData.fundamentals.growth,
        demand: zoneData.fundamentals.demand
      },
      sentiment: {
        current: marketConditions.sentiment,
        trend: marketConditions.sentimentTrend,
        drivers: this.identifyMarketDrivers(marketConditions)
      },
      outlook: this.generateMarketOutlook(marketConditions, zoneData)
    };
  }

  identifyMarketDrivers(marketConditions) {
    const drivers = [];

    if (marketConditions.buyerDemand > 0.7) {
      drivers.push({
        factor: 'Buyer Demand',
        impact: 'Positive',
        strength: 'Strong'
      });
    }

    if (marketConditions.supplyConstraints > 0.6) {
      drivers.push({
        factor: 'Supply Constraints',
        impact: 'Positive',
        strength: 'Moderate'
      });
    }

    if (marketConditions.affordability < 0.4) {
      drivers.push({
        factor: 'Affordability',
        impact: 'Negative',
        strength: 'Moderate'
      });
    }

    return drivers;
  }

  generateMarketOutlook(marketConditions, zoneData) {
    const outlook = {
      shortTerm: this.assessTimeframe(marketConditions, zoneData, 'short'),
      mediumTerm: this.assessTimeframe(marketConditions, zoneData, 'medium'),
      longTerm: this.assessTimeframe(marketConditions, zoneData, 'long')
    };

    return {
      ...outlook,
      confidence: this.calculateOutlookConfidence(outlook),
      keyFactors: this.identifyOutlookFactors(marketConditions, zoneData)
    };
  }

  assessTimeframe(marketConditions, zoneData, timeframe) {
    const factors = {
      short: {
        sentiment: marketConditions.sentiment,
        demand: zoneData.fundamentals.demand,
        supply: marketConditions.supplyConstraints
      },
      medium: {
        development: zoneData.development.plannedProjects,
        infrastructure: zoneData.infrastructure.planned,
        population: zoneData.population.growth
      },
      long: {
        equity: zoneData.fundamentals.equity,
        growth: zoneData.fundamentals.growth,
        economics: zoneData.economicIndicators.growth
      }
    };

    const weights = timeframe === 'short' ? [0.4, 0.4, 0.2] :
                   timeframe === 'medium' ? [0.3, 0.4, 0.3] :
                   [0.3, 0.3, 0.4];

    const score = Object.values(factors[timeframe]).reduce(
      (sum, value, i) => sum + value * weights[i],
      0
    );

    return {
      outlook: score > 0.7 ? 'Positive' : score > 0.4 ? 'Neutral' : 'Negative',
      confidence: this.calculateTimeframeConfidence(factors[timeframe]),
      drivers: Object.entries(factors[timeframe])
        .filter(([_, value]) => value > 0.6)
        .map(([factor]) => factor)
    };
  }

  calculateTimeframeConfidence(factors) {
    const values = Object.values(factors);
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
    
    return (1 - Math.sqrt(variance)) * 100;
  }

  calculateOutlookConfidence(outlook) {
    return (
      outlook.shortTerm.confidence * 0.4 +
      outlook.mediumTerm.confidence * 0.35 +
      outlook.longTerm.confidence * 0.25
    );
  }

  identifyOutlookFactors(marketConditions, zoneData) {
    const factors = [];

    // Market cycle factors
    if (marketConditions.cyclePosition === 'Recovery' || marketConditions.cyclePosition === 'Growth') {
      factors.push({
        type: 'Cycle',
        impact: 'Positive',
        timeframe: 'Short to Medium Term'
      });
    }

    // Development factors
    if (zoneData.development.plannedProjects > 2) {
      factors.push({
        type: 'Development',
        impact: 'Positive',
        timeframe: 'Medium to Long Term'
      });
    }

    // Economic factors
    if (zoneData.economicIndicators.growth > 0.03) {
      factors.push({
        type: 'Economic',
        impact: 'Positive',
        timeframe: 'Long Term'
      });
    }

    return factors;
  }
}

module.exports = new PortfolioOptimizationModel(); 
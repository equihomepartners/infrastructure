const tf = require('@tensorflow/tfjs-node');
const { loadTrainedModel } = require('../utils/modelLoader');

class MarketAnalysisModel {
  constructor() {
    this.trendModel = null;
    this.cycleModel = null;
    this.correlationModel = null;
  }

  async initialize() {
    this.trendModel = await loadTrainedModel('market_trends');
    this.cycleModel = await loadTrainedModel('market_cycle');
    this.correlationModel = await loadTrainedModel('market_correlation');
  }

  async analyzeMarket(marketData) {
    const {
      priceHistory,
      volumeMetrics,
      marketSentiment,
      economicIndicators
    } = marketData;

    const trendFeatures = tf.tensor2d([
      ...priceHistory,
      ...volumeMetrics,
      ...Object.values(marketSentiment)
    ]);

    const cycleFeatures = tf.tensor2d([
      ...Object.values(economicIndicators),
      ...Object.values(marketSentiment)
    ]);

    const trendAnalysis = await this.trendModel.predict(trendFeatures);
    const cyclePosition = await this.cycleModel.predict(cycleFeatures);

    return this.generateMarketInsights(trendAnalysis, cyclePosition, marketData);
  }

  async analyzeCorrelations(zoneData) {
    const correlationFeatures = tf.tensor2d([
      ...zoneData.priceMovements,
      ...zoneData.marketMetrics,
      ...zoneData.economicFactors
    ]);

    const correlations = await this.correlationModel.predict(correlationFeatures);
    return this.interpretCorrelations(correlations, zoneData);
  }

  generateMarketInsights(trendAnalysis, cyclePosition, marketData) {
    return {
      marketCycle: {
        position: this.determineCyclePosition(cyclePosition),
        confidence: this.calculateConfidence(cyclePosition),
        timeframe: this.estimateCycleDuration(cyclePosition)
      },
      trends: {
        shortTerm: this.analyzeTrend(trendAnalysis[0], marketData, 'short'),
        mediumTerm: this.analyzeTrend(trendAnalysis[1], marketData, 'medium'),
        longTerm: this.analyzeTrend(trendAnalysis[2], marketData, 'long')
      },
      marketConditions: {
        sentiment: this.analyzeSentiment(marketData.marketSentiment),
        liquidity: this.assessLiquidity(marketData.volumeMetrics),
        volatility: this.calculateVolatility(marketData.priceHistory)
      },
      riskFactors: this.identifyRiskFactors(marketData)
    };
  }

  determineCyclePosition(position) {
    const cycles = ['Recovery', 'Growth', 'Peak', 'Correction'];
    const index = Math.floor(position * cycles.length);
    return cycles[Math.min(index, cycles.length - 1)];
  }

  calculateConfidence(position) {
    const variance = Math.abs(position - Math.round(position));
    return (1 - variance) * 100;
  }

  estimateCycleDuration(position) {
    const baseMonths = 6;
    const cycleProgress = position % 1;
    return Math.round(baseMonths * (1 + cycleProgress));
  }

  analyzeTrend(trend, marketData, timeframe) {
    const periods = {
      short: 3,
      medium: 6,
      long: 12
    };

    return {
      direction: trend > 0.5 ? 'Positive' : 'Negative',
      strength: this.calculateTrendStrength(trend),
      duration: periods[timeframe],
      confidence: this.calculateConfidence(trend),
      supportingFactors: this.identifySupportingFactors(marketData, timeframe)
    };
  }

  calculateTrendStrength(trend) {
    const strength = Math.abs(trend - 0.5) * 2;
    if (strength > 0.8) return 'Strong';
    if (strength > 0.5) return 'Moderate';
    return 'Weak';
  }

  analyzeSentiment(sentiment) {
    const score = Object.values(sentiment).reduce((sum, value) => sum + value, 0) / 
                 Object.values(sentiment).length;
    
    return {
      score,
      level: score > 0.7 ? 'Positive' : score > 0.4 ? 'Neutral' : 'Negative',
      confidence: this.calculateConfidence(score)
    };
  }

  assessLiquidity(volumeMetrics) {
    const {
      averageDaysOnMarket,
      clearanceRate,
      listingVolume
    } = volumeMetrics;

    const liquidityScore = (
      (1 - averageDaysOnMarket/100) * 0.4 +
      (clearanceRate/100) * 0.4 +
      (listingVolume/100) * 0.2
    );

    return {
      score: liquidityScore,
      level: liquidityScore > 0.7 ? 'High' : liquidityScore > 0.4 ? 'Medium' : 'Low',
      metrics: {
        daysOnMarket: averageDaysOnMarket,
        clearanceRate,
        listingVolume
      }
    };
  }

  calculateVolatility(priceHistory) {
    const returns = [];
    for (let i = 1; i < priceHistory.length; i++) {
      returns.push((priceHistory[i] - priceHistory[i-1]) / priceHistory[i-1]);
    }

    const volatility = Math.sqrt(
      returns.reduce((sum, ret) => sum + Math.pow(ret, 2), 0) / returns.length
    );

    return {
      score: volatility,
      level: volatility > 0.15 ? 'High' : volatility > 0.08 ? 'Medium' : 'Low',
      trend: this.analyzeVolatilityTrend(returns)
    };
  }

  analyzeVolatilityTrend(returns) {
    const recentVolatility = returns.slice(-3).reduce((sum, ret) => sum + Math.abs(ret), 0) / 3;
    const historicalVolatility = returns.slice(0, -3).reduce((sum, ret) => sum + Math.abs(ret), 0) / 
                                (returns.length - 3);
    
    return recentVolatility > historicalVolatility * 1.2 ? 'Increasing' :
           recentVolatility < historicalVolatility * 0.8 ? 'Decreasing' : 'Stable';
  }

  identifyRiskFactors(marketData) {
    const factors = [];

    if (marketData.volumeMetrics.clearanceRate < 50) {
      factors.push('Low clearance rates');
    }

    if (marketData.volumeMetrics.averageDaysOnMarket > 60) {
      factors.push('Extended days on market');
    }

    if (this.calculateVolatility(marketData.priceHistory).level === 'High') {
      factors.push('High price volatility');
    }

    return factors;
  }

  identifySupportingFactors(marketData, timeframe) {
    const factors = [];
    const { economicIndicators, marketSentiment } = marketData;

    if (timeframe === 'short') {
      if (marketSentiment.buyerDemand > 0.7) factors.push('Strong buyer demand');
      if (marketSentiment.sellerConfidence > 0.7) factors.push('High seller confidence');
    }

    if (timeframe === 'medium') {
      if (economicIndicators.employmentGrowth > 0) factors.push('Employment growth');
      if (economicIndicators.wageGrowth > 0) factors.push('Wage growth');
    }

    if (timeframe === 'long') {
      if (economicIndicators.populationGrowth > 0) factors.push('Population growth');
      if (economicIndicators.infrastructureInvestment > 0) factors.push('Infrastructure investment');
    }

    return factors;
  }

  interpretCorrelations(correlations, zoneData) {
    return {
      zoneCorrelations: this.analyzeZoneCorrelations(correlations[0]),
      economicCorrelations: this.analyzeEconomicCorrelations(correlations[1]),
      marketCorrelations: this.analyzeMarketCorrelations(correlations[2]),
      insights: this.generateCorrelationInsights(correlations, zoneData)
    };
  }

  analyzeZoneCorrelations(correlation) {
    return {
      greenToYellow: correlation[0],
      yellowToRed: correlation[1],
      greenToRed: correlation[2],
      significance: this.assessCorrelationSignificance(correlation)
    };
  }

  analyzeEconomicCorrelations(correlation) {
    return {
      gdpImpact: correlation[0],
      employmentImpact: correlation[1],
      interestRateImpact: correlation[2],
      significance: this.assessCorrelationSignificance(correlation)
    };
  }

  analyzeMarketCorrelations(correlation) {
    return {
      priceToVolume: correlation[0],
      supplyToDemand: correlation[1],
      sentimentToPrice: correlation[2],
      significance: this.assessCorrelationSignificance(correlation)
    };
  }

  assessCorrelationSignificance(correlation) {
    const averageCorrelation = correlation.reduce((sum, c) => sum + Math.abs(c), 0) / correlation.length;
    return averageCorrelation > 0.7 ? 'Strong' : averageCorrelation > 0.4 ? 'Moderate' : 'Weak';
  }

  generateCorrelationInsights(correlations, zoneData) {
    const insights = [];

    // Zone correlations insights
    if (correlations[0][0] > 0.7) {
      insights.push('Strong spillover effects between green and yellow zones');
    }

    // Economic correlations insights
    if (correlations[1][2] > 0.7) {
      insights.push('High sensitivity to interest rate changes');
    }

    // Market correlations insights
    if (correlations[2][1] > 0.7) {
      insights.push('Strong supply-demand dynamics');
    }

    return insights;
  }
}

module.exports = new MarketAnalysisModel(); 
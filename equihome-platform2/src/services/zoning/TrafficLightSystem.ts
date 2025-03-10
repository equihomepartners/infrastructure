import { Property } from '../../types/property';
import { ZoneClassification, MarketMetrics, Demographics, AdvancedMLMetrics } from '../../types/zoning';
import { ZoningDatabase } from './ZoningDatabase';

interface ZoneFactors {
  marketStrength: number;
  growthPotential: number;
  riskLevel: number;
  infrastructureScore: number;
}

export class TrafficLightSystem {
  private static instance: TrafficLightSystem;
  private database: ZoningDatabase;

  private constructor() {
    this.database = ZoningDatabase.getInstance();
  }

  public static getInstance(): TrafficLightSystem {
    if (!TrafficLightSystem.instance) {
      TrafficLightSystem.instance = new TrafficLightSystem();
    }
    return TrafficLightSystem.instance;
  }

  public async classifyZone(
    suburb: string,
    marketMetrics: MarketMetrics,
    demographics: Demographics,
    mlMetrics: AdvancedMLMetrics
  ): Promise<ZoneClassification> {
    const factors = await this.calculateZoneFactors(marketMetrics, demographics, mlMetrics);
    const zone = this.determineZone(factors);
    const confidence = this.calculateConfidence(mlMetrics);
    const predictions = await this.generatePredictions(suburb, factors, mlMetrics);

    const classification: ZoneClassification = {
      suburb,
      zone,
      confidence,
      lastUpdated: new Date(),
      factors,
      predictions
    };

    return classification;
  }

  private async calculateZoneFactors(
    marketMetrics: MarketMetrics,
    demographics: Demographics,
    mlMetrics: AdvancedMLMetrics
  ): Promise<ZoneFactors> {
    // Market Strength (30% weight)
    const marketStrength = this.calculateMarketStrength(marketMetrics, mlMetrics);

    // Growth Potential (30% weight)
    const growthPotential = this.calculateGrowthPotential(marketMetrics, demographics, mlMetrics);

    // Risk Level (20% weight)
    const riskLevel = this.calculateRiskLevel(mlMetrics.riskAssessment);

    // Infrastructure Score (20% weight)
    const infrastructureScore = this.calculateInfrastructureScore(mlMetrics);

    return {
      marketStrength,
      growthPotential,
      riskLevel,
      infrastructureScore
    };
  }

  private calculateMarketStrength(
    marketMetrics: MarketMetrics,
    mlMetrics: AdvancedMLMetrics
  ): number {
    const weights = {
      priceGrowth: 0.3,
      daysOnMarket: 0.2,
      clearanceRate: 0.2,
      supplyDemand: 0.3
    };

    const normalizedPriceGrowth = Math.min(Math.max(marketMetrics.priceGrowth / 10, 0), 1);
    const normalizedDaysOnMarket = 1 - Math.min(marketMetrics.daysOnMarket / 90, 1);
    const normalizedClearanceRate = marketMetrics.clearanceRate / 100;
    const normalizedSupplyDemand = mlMetrics.propertyMarket.supplyDemand.ratio / 2;

    return (
      weights.priceGrowth * normalizedPriceGrowth +
      weights.daysOnMarket * normalizedDaysOnMarket +
      weights.clearanceRate * normalizedClearanceRate +
      weights.supplyDemand * normalizedSupplyDemand
    );
  }

  private calculateGrowthPotential(
    marketMetrics: MarketMetrics,
    demographics: Demographics,
    mlMetrics: AdvancedMLMetrics
  ): number {
    const weights = {
      priceGrowth: 0.25,
      employmentRate: 0.25,
      infrastructure: 0.25,
      marketCycle: 0.25
    };

    const normalizedPriceGrowth = Math.min(Math.max(marketMetrics.priceGrowth / 10, 0), 1);
    const normalizedEmployment = demographics.employmentRate / 100;
    
    // Infrastructure score based on planned improvements
    const plannedImprovements = Object.values(mlMetrics.infrastructureAnalysis.plannedImprovements);
    const infrastructureScore = plannedImprovements.length > 0 
      ? plannedImprovements.reduce((a, b) => a + b, 0) / plannedImprovements.length / 100
      : 0;

    // Market cycle score (higher for growth and bottom phases)
    const marketCycleScores = {
      growth: 1,
      peak: 0.5,
      decline: 0.2,
      bottom: 0.8
    };
    const marketCycleScore = marketCycleScores[mlMetrics.propertyMarket.marketCycle.phase];

    return (
      weights.priceGrowth * normalizedPriceGrowth +
      weights.employmentRate * normalizedEmployment +
      weights.infrastructure * infrastructureScore +
      weights.marketCycle * marketCycleScore
    );
  }

  private calculateRiskLevel(riskAssessment: AdvancedMLMetrics['riskAssessment']): number {
    const weights = {
      market: 0.3,
      development: 0.2,
      environmental: 0.2,
      regulatory: 0.3
    };

    // Convert risks to safety scores (1 - risk)
    const marketSafety = 1 - (riskAssessment.marketRisk / 100);
    const developmentSafety = 1 - (riskAssessment.developmentRisk / 100);
    const environmentalSafety = 1 - (riskAssessment.environmentalRisk / 100);
    const regulatorySafety = 1 - (riskAssessment.regulatoryRisk / 100);

    return (
      weights.market * marketSafety +
      weights.development * developmentSafety +
      weights.environmental * environmentalSafety +
      weights.regulatory * regulatorySafety
    );
  }

  private calculateInfrastructureScore(mlMetrics: AdvancedMLMetrics): number {
    // Calculate current infrastructure score
    const plannedImprovements = Object.values(mlMetrics.infrastructureAnalysis.plannedImprovements);
    const plannedScore = plannedImprovements.length > 0 
      ? plannedImprovements.reduce((a, b) => a + b, 0) / plannedImprovements.length / 100
      : 0;

    // Weight current vs planned infrastructure
    return plannedScore;
  }

  private determineZone(factors: ZoneFactors): 'green' | 'amber' | 'red' {
    // Calculate weighted score
    const weights = {
      marketStrength: 0.3,
      growthPotential: 0.3,
      riskLevel: 0.2,
      infrastructureScore: 0.2
    };

    const score = 
      weights.marketStrength * factors.marketStrength +
      weights.growthPotential * factors.growthPotential +
      weights.riskLevel * factors.riskLevel +
      weights.infrastructureScore * factors.infrastructureScore;

    // Determine zone based on score
    if (score >= 0.7) return 'green';
    if (score >= 0.4) return 'amber';
    return 'red';
  }

  private calculateConfidence(mlMetrics: AdvancedMLMetrics): number {
    const weights = {
      dataQuality: 0.3,
      predictionAccuracy: 0.3,
      modelReliability: 0.4
    };

    return (
      weights.dataQuality * (mlMetrics.mlConfidence.dataQuality / 100) +
      weights.predictionAccuracy * (mlMetrics.mlConfidence.predictionAccuracy / 100) +
      weights.modelReliability * (mlMetrics.mlConfidence.modelReliability / 100)
    ) * 100;
  }

  private async generatePredictions(
    suburb: string,
    currentFactors: ZoneFactors,
    mlMetrics: AdvancedMLMetrics
  ): Promise<ZoneClassification['predictions']> {
    // Adjust factors based on market cycle predictions
    const shortTermFactors = this.adjustFactorsForTimePeriod(currentFactors, 'short', mlMetrics);
    const mediumTermFactors = this.adjustFactorsForTimePeriod(currentFactors, 'medium', mlMetrics);
    const longTermFactors = this.adjustFactorsForTimePeriod(currentFactors, 'long', mlMetrics);

    return {
      shortTerm: {
        zone: this.determineZone(shortTermFactors),
        confidence: this.calculateConfidence(mlMetrics) * 0.9 // Slightly lower confidence for future predictions
      },
      mediumTerm: {
        zone: this.determineZone(mediumTermFactors),
        confidence: this.calculateConfidence(mlMetrics) * 0.8
      },
      longTerm: {
        zone: this.determineZone(longTermFactors),
        confidence: this.calculateConfidence(mlMetrics) * 0.7
      }
    };
  }

  private adjustFactorsForTimePeriod(
    factors: ZoneFactors,
    period: 'short' | 'medium' | 'long',
    mlMetrics: AdvancedMLMetrics
  ): ZoneFactors {
    const marketCycle = mlMetrics.propertyMarket.marketCycle;
    const cycleAdjustment = this.calculateCycleAdjustment(marketCycle.phase, period);

    return {
      marketStrength: factors.marketStrength * cycleAdjustment,
      growthPotential: factors.growthPotential * cycleAdjustment,
      riskLevel: factors.riskLevel * (2 - cycleAdjustment), // Inverse adjustment for risk
      infrastructureScore: factors.infrastructureScore * 
        (1 + Object.keys(mlMetrics.infrastructureAnalysis.plannedImprovements).length * 0.1)
    };
  }

  private calculateCycleAdjustment(
    currentPhase: 'growth' | 'peak' | 'decline' | 'bottom',
    period: 'short' | 'medium' | 'long'
  ): number {
    const cyclePhases = ['bottom', 'growth', 'peak', 'decline'];
    const currentIndex = cyclePhases.indexOf(currentPhase);
    
    const phaseAdjustments = {
      short: {
        bottom: 1.2,
        growth: 1.1,
        peak: 0.9,
        decline: 0.8
      },
      medium: {
        bottom: 1.3,
        growth: 1.0,
        peak: 0.8,
        decline: 0.9
      },
      long: {
        bottom: 1.4,
        growth: 0.9,
        peak: 0.7,
        decline: 1.0
      }
    };

    return phaseAdjustments[period][currentPhase];
  }
} 
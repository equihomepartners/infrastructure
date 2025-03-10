import axios from 'axios';
import { SuburbData, ZoneClassification } from '../../types/ml';

interface MLServiceStatus {
  initialized: boolean;
  status: string;
  modelConnections: {
    xgboost: boolean;
    equivision: boolean;
    grok: boolean;
    hybrid: boolean;
  };
}

class XGBoostService {
  private static instance: XGBoostService;
  private readonly apiUrl = 'http://localhost:3008';
  private initialized = false;

  private constructor() {}

  public static getInstance(): XGBoostService {
    if (!XGBoostService.instance) {
      XGBoostService.instance = new XGBoostService();
    }
    return XGBoostService.instance;
  }

  public async initialize(): Promise<void> {
    try {
      // Using mock initialization for now
      console.log('Using mock XGBoost service initialization');
      this.initialized = true;
      return;

      // Real implementation (commented out for now)
      /*
      const response = await axios.get<MLServiceStatus>(`${this.apiUrl}/status`);
      if (response.data.status === 'healthy' && response.data.modelConnections.xgboost) {
        this.initialized = true;
      } else {
        throw new Error('ML service not healthy or XGBoost not connected');
      }
      */
    } catch (error) {
      console.error('Failed to initialize XGBoost service:', error);
      throw error;
    }
  }

  private evaluateZone(metrics: SuburbData['metrics']): ZoneClassification {
    // Define thresholds based on your criteria
    const greenZoneThresholds = {
      growthRate: 5,
      crimeRate: 25,
      schoolRanking: 75,
      infrastructureScore: 0.7,
      newsSentiment: 0.7,
      interestRateImpact: 4.5,
      comparablesGrowth: 5,
      trendScore: 80,
      spatialRiskScore: 0.3,
      gdpGrowth: 2,
      unemployment: 4.5
    };

    const yellowZoneThresholds = {
      growthRate: 2,
      crimeRate: 50,
      schoolRanking: 50,
      infrastructureScore: 0.5,
      newsSentiment: 0.3,
      interestRateImpact: 5,
      comparablesGrowth: 2,
      trendScore: 50,
      spatialRiskScore: 0.6,
      gdpGrowth: 1,
      unemployment: 5.5
    };

    // Calculate factor scores
    const factors = {
      growthRate: metrics.growthRate >= greenZoneThresholds.growthRate,
      crimeRate: metrics.crimeRate <= greenZoneThresholds.crimeRate,
      schoolRanking: metrics.schoolRanking >= greenZoneThresholds.schoolRanking,
      infrastructure: metrics.infrastructureScore >= greenZoneThresholds.infrastructureScore,
      newsSentiment: metrics.newsSentiment >= greenZoneThresholds.newsSentiment,
      interestRateImpact: metrics.interestRateImpact <= greenZoneThresholds.interestRateImpact,
      comparablesGrowth: metrics.comparablesGrowth >= greenZoneThresholds.comparablesGrowth,
      trends: metrics.trendScore >= greenZoneThresholds.trendScore,
      spatialFactors: metrics.spatialRiskScore <= greenZoneThresholds.spatialRiskScore,
      rbaMacro: metrics.rbaMetrics.gdpGrowth >= greenZoneThresholds.gdpGrowth && 
                metrics.rbaMetrics.unemployment <= greenZoneThresholds.unemployment
    };

    // Calculate overall scores
    const growthScore = (
      metrics.growthRate / greenZoneThresholds.growthRate +
      metrics.comparablesGrowth / greenZoneThresholds.comparablesGrowth +
      metrics.trendScore / greenZoneThresholds.trendScore
    ) / 3 * 100;

    const riskScore = (
      (1 - metrics.crimeRate / 100) +
      (1 - metrics.spatialRiskScore) +
      (1 - metrics.interestRateImpact / 10)
    ) / 3 * 100;

    const qualityScore = (
      metrics.schoolRanking +
      metrics.infrastructureScore * 100 +
      metrics.newsSentiment * 100
    ) / 3;

    const overallScore = (growthScore + riskScore + qualityScore) / 3;

    // Determine zone
    let zone: 'green' | 'yellow' | 'red';
    if (overallScore >= 80 && Object.values(factors).filter(Boolean).length >= 8) {
      zone = 'green';
    } else if (overallScore >= 60 && Object.values(factors).filter(Boolean).length >= 5) {
      zone = 'yellow';
    } else {
      zone = 'red';
    }

    // Calculate confidence based on data quality and consistency
    const confidence = Math.min(
      overallScore / 100,
      Object.values(factors).filter(Boolean).length / Object.values(factors).length
    );

    return {
      zone,
      confidence,
      factors,
      scores: {
        growthScore,
        riskScore,
        qualityScore,
        overallScore
      },
      lastUpdated: new Date()
    };
  }

  public async classifyZone(suburbData: SuburbData): Promise<ZoneClassification> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // In production, this would call the ML service
      // For now, we'll use our evaluation logic
      return this.evaluateZone(suburbData.metrics);
    } catch (error) {
      console.error('Failed to classify zone:', error);
      throw error;
    }
  }
}

export { XGBoostService };
export default XGBoostService; 
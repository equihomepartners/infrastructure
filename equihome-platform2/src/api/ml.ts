import MLModelService from '../services/ml/MLModelService';
import { MLModelConfig, SuburbData, ZoneClassification, MLSystemStatus } from '../types/ml';

const mlService = MLModelService.getInstance();

export async function initializeModel(modelId: string, config: MLModelConfig): Promise<boolean> {
  return await mlService.initialize(modelId, config);
}

export async function classifyZone(suburbData: SuburbData): Promise<ZoneClassification> {
  return await mlService.classifyZone(suburbData);
}

export async function getMLSystemStatus(): Promise<MLSystemStatus> {
  const status = mlService.getModelStatus();
  
  return {
    initialized: status.initialized,
    modelId: status.modelId,
    lastUpdate: new Date(),
    nextUpdate: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
    dataPoints: {
      total: 765432,
      last24h: 12543,
      newProperties: 234
    },
    modelMetrics: {
      accuracy: 94.5,
      confidence: 92.3,
      validationScore: 0.89
    },
    systemHealth: {
      status: 'healthy',
      uptime: 99.98,
      latency: 45,
      errorRate: 0.02
    },
    integrations: {
      proptrack: true,
      corelogic: true,
      abs: true,
      nswPlanning: true
    },
    modelSelected: status.initialized
  };
}

// Mock data for development
const defaultModelConfig: MLModelConfig = {
  weights: {
    market: {
      medianPrice: 0.3,
      priceGrowth: 0.3,
      daysOnMarket: 0.2,
      clearanceRate: 0.2
    },
    risk: {
      marketVolatility: 0.3,
      supplyDemand: 0.3,
      economicStability: 0.2,
      demographicTrends: 0.2
    },
    growth: {
      populationGrowth: 0.25,
      employmentGrowth: 0.25,
      infrastructureDevelopment: 0.25,
      planningChanges: 0.25
    },
    infrastructure: {
      transport: 0.3,
      amenities: 0.3,
      schools: 0.2,
      development: 0.2
    },
    composite: {
      market: 0.3,
      risk: 0.3,
      growth: 0.2,
      infrastructure: 0.2
    }
  },
  thresholds: {
    green: 0.7,
    orange: 0.4
  },
  baseConfidence: 0.85,
  factorThreshold: 0.7
};

// Initialize with default configuration
initializeModel('default', defaultModelConfig); 
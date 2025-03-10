export interface ModelOption {
  id: string;
  name: string;
  description: string;
  type: 'production' | 'testing' | 'post-production';
  performance: {
    accuracy: number;
    f1Score: number;
    precision: number;
    recall: number;
  };
  features: string[];
  strengths: string[];
  limitations: string[];
  useCases: string[];
  modelDetails: {
    architecture: string;
    trainingData: string;
    dataProcessing: {
      microFactors: string[];
      locationFactors: string[];
      macroFactors: string[];
      marketDynamics: string[];
    };
    validationMethod: string;
    errorAnalysis: string;
    computationalNeeds: string;
    updateFrequency: string;
    confidenceInterval: string;
    zoningLogic: {
      greenZone: {
        criteria: string[];
        weight: number;
        confidenceScoring: string;
      };
      amberZone: {
        criteria: string[];
        weight: number;
        confidenceScoring: string;
      };
      redZone: {
        criteria: string[];
        weight: number;
        confidenceScoring: string;
      };
    };
  };
  trafficLightLogic: {
    adaptation: string;
    implementation: string;
    example: string;
  };
}

export interface MLModelConfig {
  id: string;
  name: string;
  version: string;
  parameters: Record<string, any>;
}

export interface ZoneClassification {
  zone: 'green' | 'yellow' | 'red';
  confidence: number;
  scores: Record<string, number>;
  timestamp: string;
  modelId: string;
  metadata: Record<string, any>;
}

export interface SuburbData {
  id: string;
  name: string;
  postcode: string;
  state: string;
  marketMetrics?: {
    medianPrice: number;
    priceGrowth: number;
    daysOnMarket: number;
    clearanceRate: number;
    listingVolume: number;
    buyerDemand: number;
  };
  economicIndicators?: {
    employment: number;
    income: number;
    businessGrowth: number;
  };
  infrastructure?: {
    planned: number;
    existing: number;
  };
  development?: {
    plannedProjects: number;
    investmentValue: number;
  };
  population?: {
    growth: number;
    density: number;
  };
}

export interface MLSystemStatus {
  initialized: boolean;
  modelId: string | null;
  lastUpdate: Date;
  nextUpdate: Date;
  dataPoints: {
    total: number;
    last24h: number;
    newProperties: number;
  };
  modelMetrics: {
    accuracy: number;
    confidence: number;
    validationScore: number;
  };
  systemHealth: {
    status: 'healthy' | 'degraded' | 'error';
    uptime: number;
    latency: number;
    errorRate: number;
  };
  integrations: {
    [key: string]: boolean;
  };
  modelSelected: boolean;
  modelConnected: boolean;
} 
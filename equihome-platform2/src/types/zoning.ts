export interface HistoricalTrend {
  date: string;
  value: number;
  growth: number;
  growthRate: number;
  medianPrice: number;
}

export interface MarketMetrics {
  medianPrice: number;
  priceGrowth: number;
  rentalYield: number;
  daysOnMarket: number;
  clearanceRate: number;
}

export interface Demographics {
  population: number;
  medianAge: number;
  employmentRate: number;
}

export interface MLConfidenceMetrics {
  dataQuality: number;
  predictionAccuracy: number;
  modelConfidence: number;
  dataPoints: number;
}

export interface MarketSentiment {
  buyerConfidence: number;
  marketMomentum: number;
  priceExpectations: string;
}

export interface FutureProjections {
  priceGrowth: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
}

export interface SuburbMetrics {
  growth: number;
  risk: number;
  infrastructure: number;
  development: 'High' | 'Medium' | 'Low';
  transport: number;
  schools: number;
  marketMetrics: MarketMetrics;
  demographics: Demographics;
}

export interface SuburbAnalysis {
  name: string;
  coordinates: [number, number];
  zone: 'green' | 'orange' | 'red';
  confidence: number;
  metrics: SuburbMetrics;
  predictions: {
    shortTerm: {
      prediction: string;
      confidence: number;
      factors: string[];
    };
    mediumTerm: {
      prediction: string;
      confidence: number;
      factors: string[];
    };
    longTerm: {
      prediction: string;
      confidence: number;
      factors: string[];
    };
  };
  historicalTrends: HistoricalTrend[];
  riskFactors: string[];
  opportunities: string[];
}

export interface MLAnalysisResult {
  confidence: number;
  decision: string;
  factors: string[];
  riskScore: number;
  growthPotential: number;
  recommendations: string[];
  marketSentiment: MarketSentiment;
  futureProjections: FutureProjections;
  mlConfidenceMetrics: MLConfidenceMetrics;
}

export interface AdvancedMLMetrics {
  propertyMarket: {
    priceMovement: {
      value: number;
      trend: 'up' | 'down' | 'stable';
      confidence: number;
    };
    supplyDemand: {
      ratio: number;
      trend: string;
      forecast: string;
    };
    marketCycle: {
      phase: 'growth' | 'peak' | 'decline' | 'bottom';
      duration: number;
      nextPhase: string;
    };
  };
  riskAssessment: {
    marketRisk: number;
    developmentRisk: number;
    environmentalRisk: number;
    regulatoryRisk: number;
  };
  socialFactors: {
    demographicTrends: {
      youngProfessionals: number;
      families: number;
      retirees: number;
    };
  };
  mlConfidence: {
    dataQuality: number;
    predictionAccuracy: number;
    modelReliability: number;
    updateFrequency: string;
  };
  infrastructureAnalysis: {
    plannedImprovements: Record<string, number>;
  };
} 
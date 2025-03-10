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

export interface ZoneClassification {
  suburb: string;
  zone: 'green' | 'amber' | 'red';
  confidence: number;
  lastUpdated: Date;
  factors: {
    marketStrength: number;
    growthPotential: number;
    riskLevel: number;
    infrastructureScore: number;
  };
  predictions: {
    shortTerm: {
      zone: 'green' | 'amber' | 'red';
      confidence: number;
    };
    mediumTerm: {
      zone: 'green' | 'amber' | 'red';
      confidence: number;
    };
    longTerm: {
      zone: 'green' | 'amber' | 'red';
      confidence: number;
    };
  };
}

export interface ZoneMetrics {
  zone: 'green' | 'amber' | 'red';
  properties: {
    total: number;
    newLast24h: number;
    averageValue: number;
    medianValue: number;
  };
  performance: {
    averageGrowth: number;
    medianGrowth: number;
    rentalYield: number;
    vacancyRate: number;
  };
  risk: {
    overall: number;
    market: number;
    economic: number;
    environmental: number;
  };
  trends: Array<{
    date: Date;
    propertyCount: number;
    averageValue: number;
    growthRate: number;
  }>;
}

export interface MarketAnalysis {
  suburb: string;
  timestamp: Date;
  overview: {
    medianPrice: number;
    priceGrowth: number;
    daysOnMarket: number;
    totalProperties: number;
    activeListings: number;
  };
  demographics: {
    population: number;
    populationGrowth: number;
    medianAge: number;
    householdIncome: number;
    ownerOccupied: number;
  };
  marketIndicators: {
    supplyDemand: number;
    clearanceRate: number;
    investorActivity: number;
    marketCycle: 'growth' | 'peak' | 'decline' | 'bottom';
  };
  infrastructure: {
    current: {
      transport: number;
      education: number;
      healthcare: number;
      retail: number;
    };
    planned: {
      projects: Array<{
        type: string;
        value: number;
        completion: Date;
        impact: number;
      }>;
    };
  };
  riskAssessment: {
    overall: number;
    factors: {
      market: number;
      economic: number;
      environmental: number;
      regulatory: number;
    };
  };
} 
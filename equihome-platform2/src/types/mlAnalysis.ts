// Define comprehensive types for ML analysis
export interface MarketSentiment {
  buyerConfidence: number;
  marketMomentum: number;
  priceExpectations: string;
}

export interface MLConfidenceMetrics {
  dataQuality: number;
  predictionAccuracy: number;
  modelConfidence: number;
  dataPoints: number;
}

export interface FutureProjections {
  priceGrowth: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
}

export interface DetailedMetrics {
  marketCycle: {
    phase: string;
    position: string;
    duration: number;
  };
  riskFactors: {
    market: number;
    economic: number;
    regulatory: number;
  };
  opportunities: string[];
}

export interface SuburbAnalysis {
  confidence: number;
  marketSentiment: MarketSentiment;
  mlConfidenceMetrics: MLConfidenceMetrics;
  futureProjections: FutureProjections;
  detailedMetrics: DetailedMetrics;
  metrics: {
    growth: number;
    risk: number;
    infrastructure: number;
    development: 'High' | 'Medium' | 'Low';
    transport: number;
    schools: number;
    marketMetrics: {
      medianPrice: number;
      priceGrowth: number;
      rentalYield: number;
      daysOnMarket: number;
      clearanceRate: number;
    };
  };
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
  historicalTrends: Array<{
    date: string;
    value: number;
    growth: number;
    growthRate: number;
    medianPrice: number;
  }>;
} 
export interface MarketMetrics {
  medianPrice: number;
  priceGrowth: number;
  daysOnMarket: number;
  clearanceRate: number;
  listingVolume: number;
  buyerDemand: number;
}

export interface EconomicIndicators {
  employment: number;
  income: number;
  businessGrowth: number;
}

export interface Infrastructure {
  planned: number;
  existing: number;
}

export interface Development {
  plannedProjects: number;
  investmentValue: number;
}

export interface Population {
  growth: number;
  density: number;
}

export interface SuburbData {
  suburb: string;
  postcode: string;
  state: string;
  metrics: {
    growthRate: number;
    crimeRate: number;
    schoolRanking: number;
    infrastructureScore: number;
    newsSentiment: number;
    interestRateImpact: number;
    comparablesGrowth: number;
    trendScore: number;
    spatialRiskScore: number;
    rbaMetrics: {
      gdpGrowth: number;
      unemployment: number;
    };
  };
}

export interface TimePeriodPrediction {
  growth: number;
  risk: number;
}

export interface ZoneClassification {
  zone: 'green' | 'yellow' | 'red';
  confidence: number;
  factors: {
    growthRate: boolean;
    crimeRate: boolean;
    schoolRanking: boolean;
    infrastructure: boolean;
    newsSentiment: boolean;
    interestRateImpact: boolean;
    comparablesGrowth: boolean;
    trends: boolean;
    spatialFactors: boolean;
    rbaMacro: boolean;
  };
  scores: {
    growthScore: number;
    riskScore: number;
    qualityScore: number;
    overallScore: number;
  };
  lastUpdated: Date;
}

export interface MLSystemMetrics {
  accuracy: number;
  confidence: number;
  dataPoints: number;
  lastUpdate: Date;
  nextUpdate: Date;
}

export interface DataSourceStatus {
  name: string;
  isActive: boolean;
  lastUpdate: Date;
  nextUpdate: Date;
  dataPoints: number;
  reliability: number;
} 
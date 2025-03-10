import axios from 'axios';

export interface SuburbMetrics {
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

export interface ClassificationResult {
  zone: 'green' | 'orange' | 'red';
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
  lastUpdated: string;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3007';

export const classifySuburb = async (metrics: SuburbMetrics): Promise<ClassificationResult> => {
  try {
    const response = await axios.post(`${API_URL}/api/ml/classify`, metrics);
    return response.data;
  } catch (error) {
    console.error('Error classifying suburb:', error);
    throw error;
  }
};

export const classifySuburbsBulk = async (suburbsMetrics: SuburbMetrics[]): Promise<Record<string, ClassificationResult>> => {
  try {
    const response = await axios.post(`${API_URL}/api/ml/classify-bulk`, { suburbs: suburbsMetrics });
    return response.data;
  } catch (error) {
    console.error('Error classifying suburbs in bulk:', error);
    throw error;
  }
}; 
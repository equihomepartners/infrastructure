import { trafficLightZones } from '../data/zoneData.js';
import { SuburbData } from '../types/ml';
import { getMLSystemStatus as getMLStatus, classifyZone } from '../api/ml';

interface SuburbAnalysis {
  confidence: number;
  zone: 'green' | 'orange' | 'red';
  metrics: {
    growth: number;
    risk: number;
    infrastructure: number;
    development: string;
    transport: number;
    schools: number;
    marketMetrics: {
      medianPrice: number;
      priceGrowth: number;
      rentalYield: number;
    };
    historicalGrowth: number[];
    forecastGrowth: number[];
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
  lastUpdated: Date;
  iteration: number;
  dataPoints: number;
  modelVersion: string;
  updateMetrics: {
    confidence: number;
    dataQuality: number;
    predictionAccuracy: number;
  };
  insights: string[];
  growthAnalysis: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }>;
  };
}

interface SydneyAverages {
  growth: number;
  risk: number;
  infrastructure: number;
  transport: number;
  schools: number;
  medianPrice: number;
  priceGrowth: number;
  rentalYield: number;
  lastUpdated: Date;
  dataPoints: number;
  modelConfidence: number;
}

interface ZoneAverages {
  [key: string]: {
    currentGrowth: number;
    risk: number;
    infrastructure: number;
    transport: number;
    schools: number;
    medianPrice: number;
    historicalGrowth: number[];
    forecastGrowth: number[];
  };
}

interface MLSystemStatus {
  modelSelected: boolean;
  modelConnected: boolean;
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
    latency: number;
    errorRate: number;
    uptime: number;
  };
  integrations: {
    propTrack: boolean;
    coreLogic: boolean;
    abs: boolean;
    nswPlanning: boolean;
  };
}

export interface SuburbBoundaries {
  type: 'FeatureCollection';
  features: Array<{
    type: 'Feature';
    properties: {
      name: string;
      state: string;
      postcode: string;
      sa2_code: string;
      zone: 'green' | 'orange' | 'red';
      confidence: number;
    };
    geometry: {
      type: 'Polygon' | 'MultiPolygon';
      coordinates: number[][][];
    };
  }>;
}

export const getSuburbAnalysis = async (suburb: string): Promise<SuburbAnalysis | null> => {
  try {
    // First, check if ML system is available
    const mlStatus = await getMLSystemStatus();
    if (!mlStatus.modelConnected) {
      console.warn('ML system not connected, using fallback data');
      return generateFallbackAnalysis(suburb);
    }

    // Try to get real ML analysis
    const response = await fetch(`http://localhost:3008/classify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: suburb,
        name: suburb,
        postcode: '2000',
        state: 'NSW'
      })
    });
    
    if (!response.ok) {
      console.warn('ML service returned error, using fallback data');
      return generateFallbackAnalysis(suburb);
    }

    const data = await response.json();
    return transformMLResponse(data, suburb);

  } catch (error) {
    console.error('Error fetching suburb analysis:', error);
    return generateFallbackAnalysis(suburb);
  }
};

const transformMLResponse = (data: any, suburb: string): SuburbAnalysis => {
  // Transform the raw ML API response into our SuburbAnalysis format
  return {
    confidence: data.confidence || 0,
    zone: determineZone(suburb),
    metrics: {
      growth: data.metrics?.growth || 0,
      risk: data.metrics?.risk || 0,
      infrastructure: data.metrics?.infrastructure || 0,
      development: data.metrics?.development || 'No Data',
      transport: data.metrics?.transport || 0,
      schools: data.metrics?.schools || 0,
      marketMetrics: {
        medianPrice: data.metrics?.marketMetrics?.medianPrice || 0,
        priceGrowth: data.metrics?.marketMetrics?.priceGrowth || 0,
        rentalYield: data.metrics?.marketMetrics?.rentalYield || 0,
      },
      historicalGrowth: data.metrics?.historicalGrowth || [],
      forecastGrowth: data.metrics?.forecastGrowth || [],
    },
    predictions: {
      shortTerm: {
        prediction: data.predictions?.shortTerm?.prediction || 'No prediction',
        confidence: data.predictions?.shortTerm?.confidence || 0,
        factors: data.predictions?.shortTerm?.factors || [],
      },
      mediumTerm: {
        prediction: data.predictions?.mediumTerm?.prediction || 'No prediction',
        confidence: data.predictions?.mediumTerm?.confidence || 0,
        factors: data.predictions?.mediumTerm?.factors || [],
      },
      longTerm: {
        prediction: data.predictions?.longTerm?.prediction || 'No prediction',
        confidence: data.predictions?.longTerm?.confidence || 0,
        factors: data.predictions?.longTerm?.factors || [],
      },
    },
    lastUpdated: new Date(data.lastUpdated || Date.now()),
    iteration: data.iteration || 0,
    dataPoints: data.dataPoints || 0,
    modelVersion: data.modelVersion || '1.0.0',
    updateMetrics: {
      confidence: data.updateMetrics?.confidence || 0,
      dataQuality: data.updateMetrics?.dataQuality || 0,
      predictionAccuracy: data.updateMetrics?.predictionAccuracy || 0,
    },
    insights: data.insights || [],
    growthAnalysis: {
      labels: ['Growth', 'Risk', 'Infrastructure', 'Transport', 'Schools'],
      datasets: [{
        label: 'Metrics',
        data: [
          data.metrics?.growth || 0,
          data.metrics?.risk || 0,
          data.metrics?.infrastructure || 0,
          data.metrics?.transport || 0,
          data.metrics?.schools || 0,
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }]
    }
  };
};

const generateFallbackAnalysis = (suburb: string): SuburbAnalysis => {
  // Generate placeholder data when ML service is unavailable
  const zone = determineZone(suburb);
  const baseConfidence = zone === 'green' ? 0.8 : zone === 'orange' ? 0.6 : 0.4;
  
  return {
    confidence: baseConfidence,
    zone,
    metrics: {
      growth: Math.random() * 100,
      risk: Math.random() * 100,
      infrastructure: Math.random() * 100,
      development: 'Placeholder',
      transport: Math.random() * 100,
      schools: Math.random() * 100,
      marketMetrics: {
        medianPrice: 1000000 + Math.random() * 1000000,
        priceGrowth: Math.random() * 10,
        rentalYield: 3 + Math.random() * 2,
      },
      historicalGrowth: Array(12).fill(0).map(() => Math.random() * 10),
      forecastGrowth: Array(12).fill(0).map(() => Math.random() * 10),
    },
    predictions: {
      shortTerm: {
        prediction: 'Placeholder prediction',
        confidence: baseConfidence,
        factors: ['Factor 1', 'Factor 2', 'Factor 3'],
      },
      mediumTerm: {
        prediction: 'Placeholder prediction',
        confidence: baseConfidence * 0.9,
        factors: ['Factor 1', 'Factor 2', 'Factor 3'],
      },
      longTerm: {
        prediction: 'Placeholder prediction',
        confidence: baseConfidence * 0.8,
        factors: ['Factor 1', 'Factor 2', 'Factor 3'],
      },
    },
    lastUpdated: new Date(),
    iteration: 0,
    dataPoints: 1000,
    modelVersion: '1.0.0-fallback',
    updateMetrics: {
      confidence: baseConfidence,
      dataQuality: baseConfidence,
      predictionAccuracy: baseConfidence,
    },
    insights: [
      'This is placeholder data as the ML service is currently unavailable',
      'The zone classification is based on pre-defined mappings',
      'All metrics are randomly generated'
    ],
    growthAnalysis: {
      labels: ['Growth', 'Risk', 'Infrastructure', 'Transport', 'Schools'],
      datasets: [{
        label: 'Metrics',
        data: Array(5).fill(0).map(() => Math.random() * 100),
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }]
    }
  };
};

const determineZone = (suburb: string): 'green' | 'orange' | 'red' => {
  if (trafficLightZones.green.includes(suburb)) return 'green';
  if (trafficLightZones.orange.includes(suburb)) return 'orange';
  return 'red';
};

export const getMLSystemStatus = async (): Promise<MLSystemStatus> => {
  try {
    const response = await fetch(`${process.env.VITE_ML_API_URL || 'http://localhost:3007'}/api/ml/status`);
    if (!response.ok) {
      throw new Error('ML system status API error');
    }
    const data = await response.json();
    return {
      ...data,
      lastUpdate: new Date(data.lastUpdate),
      nextUpdate: new Date(data.nextUpdate)
    };
  } catch (error) {
    console.error('Error fetching ML system status:', error);
    // Return offline status
    return {
      modelSelected: false,
      modelConnected: false,
      lastUpdate: new Date(),
      nextUpdate: new Date(Date.now() + 5 * 60000), // 5 minutes
      dataPoints: {
        total: 0,
        last24h: 0,
        newProperties: 0
      },
      modelMetrics: {
        accuracy: 0,
        confidence: 0,
        validationScore: 0
      },
      systemHealth: {
        status: 'error',
        latency: 0,
        errorRate: 0,
        uptime: 0
      },
      integrations: {
        propTrack: false,
        coreLogic: false,
        abs: false,
        nswPlanning: false
      }
    };
  }
};

export const getDetailedMLAnalysis = async (suburb: string) => {
  try {
    const response = await fetch(`http://localhost:3001/api/ml/detailed/${encodeURIComponent(suburb)}`);
    if (!response.ok) {
      throw new Error('Detailed ML analysis API error');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching detailed ML analysis:', error);
    return null;
  }
};

export const getSydneyAverages = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/ml/sydney-averages');
    if (!response.ok) {
      throw new Error('Sydney averages API error');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Sydney averages:', error);
    return {
      growth: 0,
      risk: 0,
      infrastructure: 0,
      transport: 0,
      schools: 0,
      medianPrice: 0
    };
  }
};

export const getUnderwritingIntegration = async (suburb: string) => {
  try {
    const response = await fetch(`http://localhost:3001/api/ml/underwriting/${encodeURIComponent(suburb)}`);
    if (!response.ok) {
      throw new Error('Underwriting integration API error');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching underwriting integration:', error);
    return null;
  }
};

export const getZoneAverages = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/ml/zone-averages');
    if (!response.ok) {
      throw new Error('Zone averages API error');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching zone averages:', error);
    return {
      green: { currentGrowth: 0, risk: 0, infrastructure: 0, transport: 0, schools: 0 },
      orange: { currentGrowth: 0, risk: 0, infrastructure: 0, transport: 0, schools: 0 },
      red: { currentGrowth: 0, risk: 0, infrastructure: 0, transport: 0, schools: 0 }
    };
  }
};

export const getSuburbBoundaries = async (): Promise<SuburbBoundaries> => {
  try {
    const response = await fetch(`${process.env.VITE_ML_API_URL || 'http://localhost:3007'}/api/ml/suburbs/boundaries`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch suburb boundaries');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching suburb boundaries:', error);
    throw error;
  }
};
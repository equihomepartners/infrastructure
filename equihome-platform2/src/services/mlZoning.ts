import { trafficLightZones } from '../data/trafficLightZones';

export interface MLPrediction {
  suburb: string;
  currentZone: 'green' | 'orange' | 'red';
  confidence: number;
  trends: {
    historical: Array<{
      date: string;
      confidence: number;
    }>;
  };
  riskFactors: string[];
  opportunities: string[];
  marketMetrics: {
    medianPrice: number;
    priceGrowth: number;
    rentalYield: number;
  };
  socioeconomic: {
    employmentRate: number;
    incomeGrowth: number;
    educationScore: number;
  };
  infrastructure: {
    transportScore: number;
    developmentActivity: string;
    amenitiesScore: number;
  };
}

export const getMLPrediction = (suburb: string): MLPrediction => {
  const isGreen = trafficLightZones.green.includes(suburb);
  const isOrange = trafficLightZones.orange.includes(suburb);
  
  return {
    suburb,
    currentZone: isGreen ? 'green' : isOrange ? 'orange' : 'red',
    confidence: 85 + Math.random() * 10,
    trends: {
      historical: Array.from({ length: 10 }, () => ({
        date: new Date().toISOString(),
        confidence: 85 + Math.random() * 10
      }))
    },
    riskFactors: [],
    opportunities: [],
    marketMetrics: {
      medianPrice: 1500000 + Math.random() * 1000000,
      priceGrowth: 5 + Math.random() * 5,
      rentalYield: 3 + Math.random() * 2
    },
    socioeconomic: {
      employmentRate: 94 + Math.random() * 4,
      incomeGrowth: 2 + Math.random() * 3,
      educationScore: 75 + Math.random() * 20
    },
    infrastructure: {
      transportScore: 70 + Math.random() * 25,
      developmentActivity: Math.random() > 0.6 ? 'High' : Math.random() > 0.3 ? 'Medium' : 'Low',
      amenitiesScore: 70 + Math.random() * 25
    }
  };
}; 
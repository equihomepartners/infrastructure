import { trafficLightZones } from '../data/zoneData.js';

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

export const getSuburbAnalysis = (suburb: string): SuburbAnalysis => {
  // Determine zone
  const zone = trafficLightZones.green.includes(suburb) ? 'green' :
               trafficLightZones.orange.includes(suburb) ? 'orange' : 'red';

  // Base metrics adjusted by zone
  const baseConfidence = zone === 'green' ? 85 : zone === 'orange' ? 75 : 65;
  const baseGrowth = zone === 'green' ? 8 : zone === 'orange' ? 5 : 3;
  const baseRisk = zone === 'green' ? 25 : zone === 'orange' ? 45 : 75;
  const basePrice = zone === 'green' ? 2500000 : zone === 'orange' ? 1500000 : 800000;

  // Add some randomization for realistic variation
  const randomize = (base: number, variance: number) => 
    base + (Math.random() * variance * 2 - variance);

  // Add dynamic timestamp and iteration info
  const currentIteration = Math.floor(Date.now() / (24 * 60 * 60 * 1000)); // Daily iterations

  // Add some daily variation based on the iteration
  const dailyVariation = Math.sin(currentIteration) * 2;

  return {
    confidence: randomize(baseConfidence, 5),
    zone,
    metrics: {
      growth: randomize(baseGrowth, 2),
      risk: randomize(baseRisk, 10),
      infrastructure: randomize(zone === 'green' ? 85 : zone === 'orange' ? 70 : 55, 10),
      development: zone === 'green' ? 'High' : zone === 'orange' ? 'Medium' : 'Low',
      transport: randomize(zone === 'green' ? 90 : zone === 'orange' ? 75 : 60, 10),
      schools: randomize(zone === 'green' ? 88 : zone === 'orange' ? 78 : 65, 10),
      marketMetrics: {
        medianPrice: basePrice + (Math.random() * 500000),
        priceGrowth: randomize(baseGrowth, 1.5),
        rentalYield: randomize(zone === 'green' ? 3.5 : zone === 'orange' ? 4.2 : 5, 0.5)
      },
      historicalGrowth: Array(5).fill(0).map(() => randomize(baseGrowth, 1)),
      forecastGrowth: Array(4).fill(0).map(() => randomize(baseGrowth * 1.1, 1))
    },
    predictions: {
      shortTerm: {
        prediction: zone === 'green' ? 'Strong Growth' : zone === 'orange' ? 'Moderate Growth' : 'Stable',
        confidence: randomize(75, 5),
        factors: [
          'Current market momentum',
          'Recent comparable sales',
          'Buyer demand levels',
          zone === 'green' ? 'Premium location appeal' : 
          zone === 'orange' ? 'Improving infrastructure' : 
          'Affordability advantage'
        ]
      },
      mediumTerm: {
        prediction: zone === 'green' ? 'Sustained Growth' : zone === 'orange' ? 'Gradual Appreciation' : 'Potential Upside',
        confidence: randomize(65, 5),
        factors: [
          'Infrastructure development',
          'Population growth trends',
          'Employment opportunities',
          zone === 'green' ? 'Limited supply' :
          zone === 'orange' ? 'Gentrification potential' :
          'Development plans'
        ]
      },
      longTerm: {
        prediction: zone === 'green' ? 'Premium Growth' : zone === 'orange' ? 'Steady Growth' : 'Value Growth',
        confidence: randomize(55, 5),
        factors: [
          'Demographic shifts',
          'Economic indicators',
          'Urban planning',
          zone === 'green' ? 'Established prestige' :
          zone === 'orange' ? 'Area transformation' :
          'Infrastructure investment'
        ]
      }
    },
    lastUpdated: new Date(),
    iteration: currentIteration,
    dataPoints: 15234 + Math.floor(Math.random() * 1000),
    modelVersion: '3.2.1',
    updateMetrics: {
      confidence: baseConfidence + dailyVariation,
      dataQuality: 96.3,
      predictionAccuracy: 94.2
    }
  };
};

// Add the getDetailedMLAnalysis function
export const getDetailedMLAnalysis = (suburb: string): SuburbAnalysis => {
  return getSuburbAnalysis(suburb);
};

// Combined Sydney averages function with historical and forecast data
export const getSydneyAverages = (): SydneyAverages & {
  historicalGrowth: number[];
  currentGrowth: number;
  forecastGrowth: number[];
} => {
  return {
    growth: 4.2,
    risk: 45,
    infrastructure: 72,
    transport: 68,
    schools: 75,
    medianPrice: 1250000,
    priceGrowth: 3.8,
    rentalYield: 3.2,
    lastUpdated: new Date(),
    dataPoints: 1243567,
    modelConfidence: 94.3,
    // Additional historical and forecast data
    historicalGrowth: [5.8, 5.5, 5.2, 4.8, 4.2],
    currentGrowth: 4.2,
    forecastGrowth: [4.3, 4.5, 4.7, 4.9]
  };
};

// Add ML system update tracking
export const getMLSystemStatus = () => {
  return {
    lastUpdate: new Date(),
    nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Next day
    dataPoints: {
      total: 1243567,
      last24h: 15234,
      newProperties: 342
    },
    modelMetrics: {
      accuracy: 94.3,
      confidence: 92.7,
      validationScore: 0.89
    },
    systemHealth: {
      status: 'operational',
      uptime: 99.98,
      latency: 145 // ms
    },
    integrations: {
      propTrack: 'connected',
      coreLogic: 'connected',
      domainGroup: 'connected'
    }
  };
};

// Update the underwriting integration status
export const getUnderwritingIntegration = () => {
  return {
    status: 'active',
    totalAssessments: 67, // Keep pipeline number
    last24h: 1, // Reduced from 3 to 1-2 approvals per day
    averageProcessingTime: 2.3, // minutes
    automationRate: 78, // percentage
    riskAssessments: {
      approved: 12, // Reduced from 42 (about 1-2 per week)
      flaggedForReview: 42, // Increased proportion of flagged
      rejected: 13 // Slightly increased proportion of rejected
    },
    confidenceMetrics: {
      overall: 94.3,
      pricing: 96.2,
      risk: 92.8,
      ltv: 95.4,
      serviceability: 93.7,
      security: 97.1
    },
    zoneImpact: {
      green: {
        approvalRate: 92,
        avgProcessingTime: 1.8,
        automationRate: 85
      },
      orange: {
        approvalRate: 76,
        avgProcessingTime: 2.4,
        automationRate: 70
      },
      red: {
        approvalRate: 45,
        avgProcessingTime: 3.2,
        automationRate: 55
      }
    },
    recentDeals: [
      {
        suburb: 'Mosman',
        propertyValue: 2850000,
        loanAmount: 1850000,
        ltv: 65,
        status: 'approved',
        processingTime: 1.7,
        zoneImpact: 'high',
        timestamp: new Date() // Today
      },
      {
        suburb: 'Marrickville',
        propertyValue: 1650000,
        loanAmount: 1150000,
        ltv: 70,
        status: 'flagged',
        processingTime: 2.4,
        zoneImpact: 'medium',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // Yesterday
      }
    ],
    recentUpdates: [
      {
        timestamp: new Date(),
        type: 'model_update',
        description: 'Enhanced risk assessment algorithm',
        impact: 'Improved accuracy for high-value properties'
      },
      {
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        type: 'data_refresh',
        description: 'Updated market comparables',
        impact: 'Refined valuation models in premium suburbs'
      }
    ],
    keyMetrics: {
      avgLoanSize: 1450000,
      avgLtv: 67.5,
      avgPropertyValue: 2150000,
      zoneDistribution: {
        green: 65,
        orange: 28,
        red: 7
      }
    },
    riskFactors: {
      highestImpact: [
        'Location quality',
        'Market liquidity',
        'Price stability'
      ],
      moderateImpact: [
        'Infrastructure development',
        'Employment stability',
        'Local market trends'
      ]
    },
    monthlyTrends: {
      approvals: [1, 2, 1, 2, 1, 2], // Last 6 months
      pipeline: [65, 58, 72, 63, 67, 67] // Assessment volumes
    }
  };
};

// Helper functions with more realistic patterns...

export const getZoneAverages = (): ZoneAverages => {
  return {
    green: {
      currentGrowth: 7.5,
      risk: 25,
      infrastructure: 85,
      transport: 88,
      schools: 90,
      medianPrice: 2250000,
      historicalGrowth: [8.2, 7.8, 7.6, 7.4, 7.5],
      forecastGrowth: [7.6, 7.8, 7.9, 8.1]
    },
    orange: {
      currentGrowth: 5.2,
      risk: 45,
      infrastructure: 70,
      transport: 75,
      schools: 78,
      medianPrice: 1450000,
      historicalGrowth: [5.8, 5.5, 5.3, 5.2, 5.2],
      forecastGrowth: [5.3, 5.4, 5.6, 5.8]
    },
    red: {
      currentGrowth: 3.5,
      risk: 65,
      infrastructure: 55,
      transport: 60,
      schools: 65,
      medianPrice: 850000,
      historicalGrowth: [3.8, 3.7, 3.6, 3.5, 3.5],
      forecastGrowth: [3.6, 3.7, 3.8, 3.9]
    }
  };
};
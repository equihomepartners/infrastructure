class DataTransformService {
  constructor() {
    this.transformers = {
      property: this.transformPropertyData.bind(this),
      market: this.transformMarketData.bind(this),
      infrastructure: this.transformInfrastructureData.bind(this)
    };
  }

  processData(data) {
    const transformer = this.transformers[data.type];
    if (!transformer) {
      throw new Error(`No transformer found for data type: ${data.type}`);
    }
    return transformer(data);
  }

  transformPropertyData(data) {
    return {
      type: 'property',
      timestamp: new Date().toISOString(),
      data: {
        id: data.propertyId,
        location: {
          suburb: data.location.suburb,
          postcode: data.location.postcode,
          coordinates: {
            lat: data.location.coordinates.lat,
            lng: data.location.coordinates.lng
          }
        },
        metrics: {
          price: this.formatCurrency(data.metrics.price),
          equity: this.formatPercentage(data.metrics.equity),
          clearanceRate: this.formatPercentage(data.metrics.clearanceRate),
          growthRate: this.formatPercentage(data.metrics.growthRate)
        },
        zoneClassification: {
          zone: data.zoneClassification.currentZone,
          confidence: this.formatPercentage(data.zoneClassification.confidence),
          lastUpdated: data.zoneClassification.lastUpdated
        }
      }
    };
  }

  transformMarketData(data) {
    return {
      type: 'market',
      timestamp: new Date().toISOString(),
      data: {
        marketId: data.id,
        indicators: {
          medianPrice: this.formatCurrency(data.medianPrice),
          salesVolume: data.salesVolume,
          daysOnMarket: data.daysOnMarket,
          clearanceRate: this.formatPercentage(data.clearanceRate)
        },
        trends: {
          priceGrowth: this.formatPercentage(data.trends.priceGrowth),
          volumeGrowth: this.formatPercentage(data.trends.volumeGrowth),
          demandIndex: data.trends.demandIndex
        }
      }
    };
  }

  transformInfrastructureData(data) {
    return {
      type: 'infrastructure',
      timestamp: new Date().toISOString(),
      data: {
        projectId: data.id,
        details: {
          name: data.name,
          type: data.type,
          status: data.status,
          completion: this.formatPercentage(data.completion)
        },
        impact: {
          radius: data.impact.radius,
          estimatedValue: this.formatCurrency(data.impact.estimatedValue),
          confidence: this.formatPercentage(data.impact.confidence)
        }
      }
    };
  }

  // Utility functions
  formatCurrency(value) {
    return typeof value === 'number' ? 
      new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(value) : 
      value;
  }

  formatPercentage(value) {
    return typeof value === 'number' ? 
      `${value.toFixed(2)}%` : 
      value;
  }
}

async function setupTransforms() {
  return new DataTransformService();
}

module.exports = {
  setupTransforms
}; 
const { storageService } = require('../services/storage');

class ETLPipeline {
  constructor() {
    this.transformationRules = {
      equity: (price, mortgage) => ((price - mortgage) / price) * 100,
      growthRate: (currentPrice, historicalPrice, timeSpan) => 
        ((currentPrice - historicalPrice) / historicalPrice) * (12 / timeSpan),
      zoneScore: (equity, clearanceRate, growthRate) => {
        let score = 0;
        if (equity > 40) score += 0.4;
        if (clearanceRate > 65) score += 0.3;
        if (growthRate > 5) score += 0.3;
        return score;
      }
    };
  }

  async transformPropertyData(rawData) {
    try {
      const transformedData = {
        propertyId: rawData.id,
        location: {
          suburb: rawData.suburb,
          postcode: rawData.postcode,
          coordinates: {
            lat: rawData.latitude,
            lng: rawData.longitude
          }
        },
        metrics: {
          price: rawData.price,
          equity: this.transformationRules.equity(rawData.price, rawData.mortgage),
          clearanceRate: rawData.clearanceRate,
          growthRate: this.transformationRules.growthRate(
            rawData.price,
            rawData.historicalPrice,
            rawData.monthsSinceHistorical
          )
        }
      };

      // Calculate zone classification
      const zoneScore = this.transformationRules.zoneScore(
        transformedData.metrics.equity,
        transformedData.metrics.clearanceRate,
        transformedData.metrics.growthRate
      );

      transformedData.zoneClassification = {
        currentZone: zoneScore >= 0.7 ? 'green' : zoneScore >= 0.4 ? 'yellow' : 'red',
        confidence: zoneScore * 100,
        lastUpdated: new Date()
      };

      return transformedData;
    } catch (error) {
      console.error('Error transforming property data:', error);
      throw error;
    }
  }

  async processData(rawData) {
    try {
      const transformedData = await this.transformPropertyData(rawData);
      await storageService.storePropertyData(transformedData);
      return transformedData;
    } catch (error) {
      console.error('Error processing data:', error);
      throw error;
    }
  }
}

const etlPipeline = new ETLPipeline();

async function setupETLPipeline() {
  console.log('ETL pipeline initialized');
}

module.exports = {
  setupETLPipeline,
  etlPipeline
}; 
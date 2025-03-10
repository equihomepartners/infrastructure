const Bull = require('bull');

class DataFeedsService {
  constructor(redis) {
    this.redis = redis;
    
    // Initialize queues for different data types
    this.queues = {
      property: new Bull('property-data', {
        redis: {
          host: process.env.REDIS_HOST || 'localhost',
          port: process.env.REDIS_PORT || 6379
        }
      }),
      market: new Bull('market-data'),
      infrastructure: new Bull('infrastructure-data')
    };

    // Set up queue processors
    this.setupQueueProcessors();
  }

  setupQueueProcessors() {
    // Process property data
    this.queues.property.process(async (job) => {
      try {
        // Generate test property data
        const data = {
          type: 'property',
          propertyId: `PROP${Math.floor(Math.random() * 1000)}`,
          location: {
            suburb: 'Sydney CBD',
            postcode: '2000',
            coordinates: {
              lat: -33.8688 + (Math.random() * 0.1),
              lng: 151.2093 + (Math.random() * 0.1)
            }
          },
          metrics: {
            price: Math.floor(Math.random() * 5000000) + 500000,
            equity: Math.floor(Math.random() * 60) + 20,
            clearanceRate: Math.floor(Math.random() * 30) + 60,
            growthRate: Math.floor(Math.random() * 15) + 1
          },
          zoneClassification: {
            currentZone: Math.random() > 0.5 ? 'green' : 'yellow',
            confidence: Math.floor(Math.random() * 20) + 80,
            lastUpdated: new Date().toISOString()
          }
        };
        await this.redis.publish('property-updates', JSON.stringify(data));
        return data;
      } catch (error) {
        console.error('Error processing property data:', error);
        throw error;
      }
    });

    // Process market data
    this.queues.market.process(async (job) => {
      try {
        // Generate test market data
        const data = {
          type: 'market',
          id: `MKT${Math.floor(Math.random() * 1000)}`,
          medianPrice: Math.floor(Math.random() * 2000000) + 800000,
          salesVolume: Math.floor(Math.random() * 500) + 100,
          daysOnMarket: Math.floor(Math.random() * 30) + 15,
          clearanceRate: Math.floor(Math.random() * 30) + 60,
          trends: {
            priceGrowth: Math.floor(Math.random() * 10) + 1,
            volumeGrowth: Math.floor(Math.random() * 20) - 10,
            demandIndex: Math.floor(Math.random() * 50) + 50
          }
        };
        await this.redis.publish('market-updates', JSON.stringify(data));
        return data;
      } catch (error) {
        console.error('Error processing market data:', error);
        throw error;
      }
    });

    // Process infrastructure data
    this.queues.infrastructure.process(async (job) => {
      try {
        // Generate test infrastructure data
        const data = {
          type: 'infrastructure',
          id: `INF${Math.floor(Math.random() * 1000)}`,
          name: 'Metro Line Extension',
          type: 'Transport',
          status: 'In Progress',
          completion: Math.floor(Math.random() * 100),
          impact: {
            radius: Math.floor(Math.random() * 5) + 1,
            estimatedValue: Math.floor(Math.random() * 1000000000),
            confidence: Math.floor(Math.random() * 20) + 80
          }
        };
        await this.redis.publish('infrastructure-updates', JSON.stringify(data));
        return data;
      } catch (error) {
        console.error('Error processing infrastructure data:', error);
        throw error;
      }
    });
  }

  async startDataCollection() {
    // Schedule property data updates (every 5 minutes)
    await this.queues.property.add({}, {
      repeat: {
        every: 5 * 60 * 1000 // 5 minutes
      }
    });

    // Schedule market data updates (every hour)
    await this.queues.market.add({}, {
      repeat: {
        every: 60 * 60 * 1000 // 1 hour
      }
    });

    // Schedule infrastructure data updates (daily)
    await this.queues.infrastructure.add({}, {
      repeat: {
        every: 24 * 60 * 60 * 1000 // 24 hours
      }
    });
  }

  // Handle failed jobs
  setupErrorHandling() {
    Object.values(this.queues).forEach(queue => {
      queue.on('failed', (job, err) => {
        console.error(`Job failed: ${queue.name}`, err);
        // Implement retry logic or alerting here
      });
    });
  }
}

async function setupDataFeeds(redis) {
  const dataFeeds = new DataFeedsService(redis);
  await dataFeeds.startDataCollection();
  dataFeeds.setupErrorHandling();
  return dataFeeds;
}

module.exports = {
  setupDataFeeds
}; 
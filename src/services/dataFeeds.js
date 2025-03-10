const Bull = require('bull');
const axios = require('axios');

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
        const response = await axios.get(process.env.DATA_INFRASTRUCTURE_URL + '/property-data');
        await this.redis.publish('property-updates', JSON.stringify(response.data));
        return response.data;
      } catch (error) {
        console.error('Error processing property data:', error);
        throw error;
      }
    });

    // Process market data
    this.queues.market.process(async (job) => {
      try {
        const response = await axios.get(process.env.DATA_INFRASTRUCTURE_URL + '/market-data');
        await this.redis.publish('market-updates', JSON.stringify(response.data));
        return response.data;
      } catch (error) {
        console.error('Error processing market data:', error);
        throw error;
      }
    });

    // Process infrastructure data
    this.queues.infrastructure.process(async (job) => {
      try {
        const response = await axios.get(process.env.DATA_INFRASTRUCTURE_URL + '/infrastructure-data');
        await this.redis.publish('infrastructure-updates', JSON.stringify(response.data));
        return response.data;
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
const mongoose = require('mongoose');
const Redis = require('redis');

class StorageService {
  constructor() {
    this.redisClient = Redis.createClient({
      url: process.env.REDIS_URI || 'redis://localhost:6379'
    });
    
    // Define MongoDB schemas
    this.PropertySchema = new mongoose.Schema({
      propertyId: String,
      location: {
        suburb: String,
        postcode: String,
        coordinates: {
          lat: Number,
          lng: Number
        }
      },
      metrics: {
        price: Number,
        equity: Number,
        clearanceRate: Number,
        growthRate: Number
      },
      zoneClassification: {
        currentZone: String, // 'green', 'yellow', 'red'
        confidence: Number,
        lastUpdated: Date
      },
      timestamp: { type: Date, default: Date.now }
    });

    this.Property = mongoose.model('Property', this.PropertySchema);
  }

  async storePropertyData(data) {
    try {
      // Store in MongoDB for historical analysis
      await this.Property.create(data);
      
      // Cache in Redis for real-time access
      await this.redisClient.set(
        `property:${data.propertyId}`,
        JSON.stringify(data),
        {
          EX: 3600 // 1 hour expiration
        }
      );
    } catch (error) {
      console.error('Error storing property data:', error);
      throw error;
    }
  }

  async getPropertyData(propertyId) {
    try {
      // Try Redis cache first
      const cachedData = await this.redisClient.get(`property:${propertyId}`);
      if (cachedData) return JSON.parse(cachedData);
      
      // Fallback to MongoDB
      const property = await this.Property.findOne({ propertyId });
      if (property) {
        // Update cache
        await this.redisClient.set(
          `property:${propertyId}`,
          JSON.stringify(property),
          {
            EX: 3600
          }
        );
      }
      return property;
    } catch (error) {
      console.error('Error retrieving property data:', error);
      throw error;
    }
  }
}

const storageService = new StorageService();

async function setupStorageService() {
  await storageService.redisClient.connect();
  console.log('Storage service initialized');
}

module.exports = {
  setupStorageService,
  storageService
}; 
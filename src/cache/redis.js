class CacheService {
  constructor(redis) {
    this.redis = redis;
    this.defaultTTL = 3600; // 1 hour in seconds
  }

  async set(key, value, ttl = this.defaultTTL) {
    try {
      await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
    } catch (error) {
      console.error('Cache set error:', error);
      throw error;
    }
  }

  async get(key) {
    try {
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      throw error;
    }
  }

  async setPropertyData(propertyId, data) {
    const key = `property:${propertyId}`;
    await this.set(key, data);
  }

  async getPropertyData(propertyId) {
    const key = `property:${propertyId}`;
    return await this.get(key);
  }

  async setMarketData(marketId, data) {
    const key = `market:${marketId}`;
    await this.set(key, data);
  }

  async getMarketData(marketId) {
    const key = `market:${marketId}`;
    return await this.get(key);
  }

  async setInfrastructureData(projectId, data) {
    const key = `infrastructure:${projectId}`;
    await this.set(key, data);
  }

  async getInfrastructureData(projectId) {
    const key = `infrastructure:${projectId}`;
    return await this.get(key);
  }

  // Batch operations
  async mset(keyValuePairs, ttl = this.defaultTTL) {
    try {
      const pipeline = this.redis.pipeline();
      
      Object.entries(keyValuePairs).forEach(([key, value]) => {
        pipeline.set(key, JSON.stringify(value), 'EX', ttl);
      });

      await pipeline.exec();
    } catch (error) {
      console.error('Cache mset error:', error);
      throw error;
    }
  }

  async mget(keys) {
    try {
      const values = await this.redis.mget(keys);
      return values.map(value => value ? JSON.parse(value) : null);
    } catch (error) {
      console.error('Cache mget error:', error);
      throw error;
    }
  }

  // Cache invalidation
  async invalidate(key) {
    try {
      await this.redis.del(key);
    } catch (error) {
      console.error('Cache invalidation error:', error);
      throw error;
    }
  }

  async invalidatePattern(pattern) {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(keys);
      }
    } catch (error) {
      console.error('Cache pattern invalidation error:', error);
      throw error;
    }
  }
}

async function setupCacheLayer(redis) {
  const cache = new CacheService(redis);
  return cache;
}

module.exports = {
  setupCacheLayer
}; 
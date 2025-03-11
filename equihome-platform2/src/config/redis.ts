import Redis from 'ioredis';

const createRedisClient = (): Redis | null => {
  // Check if Redis is disabled via environment variable
  const isRedisDisabled = import.meta.env.VITE_DISABLE_REDIS === 'true';
  
  if (isRedisDisabled) {
    console.log('Redis is disabled via environment variable');
    return null;
  }

  // Create Redis client only if not disabled
  try {
    const client = new Redis({
      host: '127.0.0.1',
      port: 6379,
      maxRetriesPerRequest: 0, // Disable retries when Redis is not available
      retryStrategy: () => null // Disable retry strategy completely
    });

    // Handle connection errors without flooding the console
    client.on('error', (err) => {
      console.warn('Redis connection error:', err.message);
    });

    return client;
  } catch (error) {
    console.warn('Redis initialization failed:', error);
    return null;
  }
};

export const redisClient = createRedisClient(); 
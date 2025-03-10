require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const Redis = require('ioredis');
const { setupWebSocket } = require('./websocket/server');
const { setupDataFeeds } = require('./services/dataFeeds');
const { setupCacheLayer } = require('./cache/redis');
const { setupTransforms } = require('./transforms/propertyData');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 3006;

// Redis for pub/sub and caching
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

// Initialize services
async function initializeServices() {
  try {
    // Setup WebSocket server
    setupWebSocket(wss);
    
    // Setup data feeds
    const dataFeeds = await setupDataFeeds(redis);
    
    // Setup caching layer
    const cache = await setupCacheLayer(redis);
    
    // Setup data transformations
    const transforms = await setupTransforms();

    // Subscribe to data infrastructure updates
    redis.subscribe('property-updates', 'market-updates', 'infrastructure-updates', (err, count) => {
      if (err) {
        console.error('Failed to subscribe:', err);
        return;
      }
      console.log(`Subscribed to ${count} channels`);
    });

    // Handle incoming messages
    redis.on('message', (channel, message) => {
      const data = JSON.parse(message);
      const transformedData = transforms.processData(data);
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(transformedData));
        }
      });
    });

    console.log('All services initialized successfully');
  } catch (error) {
    console.error('Failed to initialize services:', error);
    process.exit(1);
  }
}

// Start server
server.listen(PORT, async () => {
  try {
    await initializeServices();
    console.log(`Property Feed Service running on port ${PORT}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}); 
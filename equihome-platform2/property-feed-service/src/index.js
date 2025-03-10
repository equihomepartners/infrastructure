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

// Redis for pub/sub (subscriber)
const redisSub = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

// Redis for publishing and caching
const redisPub = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

// Generate test data
function generateTestData() {
  const types = ['property', 'market', 'infrastructure'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  const baseData = {
    timestamp: new Date().toISOString(),
  };

  switch (type) {
    case 'property':
      return {
        ...baseData,
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
    case 'market':
      return {
        ...baseData,
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
    case 'infrastructure':
      return {
        ...baseData,
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
  }
}

// Initialize services
async function initializeServices() {
  try {
    // Setup WebSocket server
    setupWebSocket(wss);
    
    // Setup data feeds with publishing Redis instance
    const dataFeeds = await setupDataFeeds(redisPub);
    
    // Setup caching layer with publishing Redis instance
    const cache = await setupCacheLayer(redisPub);
    
    // Setup data transformations
    const transforms = await setupTransforms();

    // Subscribe to data infrastructure updates using subscriber Redis instance
    redisSub.subscribe('property-updates', 'market-updates', 'infrastructure-updates', (err, count) => {
      if (err) {
        console.error('Failed to subscribe:', err);
        return;
      }
      console.log(`Subscribed to ${count} channels`);
    });

    // Handle incoming messages on subscriber Redis instance
    redisSub.on('message', (channel, message) => {
      const data = JSON.parse(message);
      const transformedData = transforms.processData(data);
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(transformedData));
        }
      });
    });

    // Start sending test data using publishing Redis instance
    setInterval(() => {
      const testData = generateTestData();
      redisPub.publish(`${testData.type}-updates`, JSON.stringify(testData));
    }, 5000); // Send new data every 5 seconds

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
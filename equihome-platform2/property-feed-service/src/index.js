require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 3006;

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

// Initialize WebSocket server
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send initial data
  const initialData = generateTestData();
  ws.send(JSON.stringify(initialData));
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start sending test data to all connected clients
setInterval(() => {
  const testData = generateTestData();
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(testData));
    }
  });
}, 5000); // Send new data every 5 seconds

// Start server
server.listen(PORT, () => {
  console.log(`Property Feed Service running on port ${PORT}`);
}); 
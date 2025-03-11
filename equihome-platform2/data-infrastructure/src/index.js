const express = require('express');
const cors = require('cors');
const { generateMockData } = require('./services/mockData');

const app = express();
const PORT = process.env.PORT || 3007;

app.use(cors());
app.use(express.json());

// In-memory cache
const cache = new Map();

// Cache middleware
const cacheMiddleware = (key) => (req, res, next) => {
  if (cache.has(key)) {
    return res.json(cache.get(key));
  }
  next();
};

// Routes
app.get('/api/data/market', cacheMiddleware('market'), (req, res) => {
  const marketData = generateMockData('market');
  cache.set('market', marketData);
  res.json(marketData);
});

app.get('/api/data/property', cacheMiddleware('property'), (req, res) => {
  const propertyData = generateMockData('property');
  cache.set('property', propertyData);
  res.json(propertyData);
});

app.get('/api/data/infrastructure', cacheMiddleware('infrastructure'), (req, res) => {
  const infrastructureData = generateMockData('infrastructure');
  cache.set('infrastructure', infrastructureData);
  res.json(infrastructureData);
});

// Clear cache every hour
setInterval(() => {
  cache.clear();
}, 3600000);

app.listen(PORT, () => {
  console.log(`Data Infrastructure Service running on port ${PORT}`);
}); 
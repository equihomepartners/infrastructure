require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Redis = require('redis');
const { setupDataIngestion } = require('./services/dataIngestion');
const { setupStorageService } = require('./services/storage');
const { setupETLPipeline } = require('./pipelines/etl');
const { setupValidation } = require('./validation/dataValidation');

const app = express();
const PORT = process.env.PORT || 3005;

// Initialize services
async function initializeServices() {
  // MongoDB connection
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/equihome-data');
  
  // Redis connection
  const redisClient = Redis.createClient({
    url: process.env.REDIS_URI || 'redis://localhost:6379'
  });
  await redisClient.connect();

  // Initialize data services
  await setupDataIngestion();
  await setupStorageService();
  await setupETLPipeline();
  await setupValidation();
}

// Start server
app.listen(PORT, async () => {
  try {
    await initializeServices();
    console.log(`Data infrastructure server running on port ${PORT}`);
  } catch (error) {
    console.error('Failed to initialize services:', error);
    process.exit(1);
  }
}); 
const axios = require('axios');
const { validatePropertyData } = require('../validation/dataValidation');

class DataIngestionService {
  constructor() {
    this.sources = {
      propertyData: process.env.PROPERTY_API_URL,
      economicIndicators: process.env.ECONOMIC_API_URL,
      censusData: process.env.CENSUS_API_URL,
      infrastructureProjects: process.env.INFRASTRUCTURE_API_URL
    };
    
    this.updateIntervals = {
      propertyData: 5 * 60 * 1000, // 5 minutes
      economicIndicators: 24 * 60 * 60 * 1000, // daily
      censusData: 90 * 24 * 60 * 60 * 1000, // quarterly
      infrastructureProjects: 7 * 24 * 60 * 60 * 1000 // weekly
    };
  }

  async fetchPropertyData() {
    try {
      const response = await axios.get(this.sources.propertyData);
      const validData = await validatePropertyData(response.data);
      return validData;
    } catch (error) {
      console.error('Error fetching property data:', error);
      throw error;
    }
  }

  async startDataCollection() {
    // Start property data collection
    setInterval(async () => {
      await this.fetchPropertyData();
    }, this.updateIntervals.propertyData);

    // Additional data collection intervals will be implemented here
  }
}

const dataIngestionService = new DataIngestionService();

async function setupDataIngestion() {
  await dataIngestionService.startDataCollection();
  console.log('Data ingestion service initialized');
}

module.exports = {
  setupDataIngestion,
  dataIngestionService
}; 
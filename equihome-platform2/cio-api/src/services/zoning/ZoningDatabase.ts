import mongoose, { Schema, Document } from 'mongoose';

// Demographic Data Schema
const DemographicDataSchema = new Schema({
  timestamp: Date,
  metrics: {
    sydneyHousePriceIndex: Number,
    period: String,
    yearOverYearChange: Number
  },
  metadata: {
    source: String,
    dataflow: String,
    region: String,
    propertyType: String,
    lastUpdated: Date
  }
});

// Create model
const DemographicDataModel = mongoose.model('DemographicData', DemographicDataSchema);

export class ZoningDatabase {
  private static instance: ZoningDatabase;

  private constructor() {
    this.connect();
  }

  public static getInstance(): ZoningDatabase {
    if (!ZoningDatabase.instance) {
      ZoningDatabase.instance = new ZoningDatabase();
    }
    return ZoningDatabase.instance;
  }

  private async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/equihome');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }

  public async updateDemographicData(demographicData: any): Promise<void> {
    try {
      await DemographicDataModel.findOneAndUpdate(
        { timestamp: demographicData.timestamp },
        demographicData,
        { upsert: true }
      );
      console.log('Demographic data updated successfully');
    } catch (error) {
      console.error('Failed to update demographic data:', error);
      throw error;
    }
  }

  public async getLatestDemographicData(): Promise<any> {
    try {
      return await DemographicDataModel.findOne().sort({ timestamp: -1 });
    } catch (error) {
      console.error('Failed to get latest demographic data:', error);
      throw error;
    }
  }
} 
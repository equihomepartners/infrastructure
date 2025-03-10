import mongoose, { Schema, Document } from 'mongoose';
import { Property } from '../../types/property';
import { ZoneClassification, ZoneMetrics, MarketAnalysis } from '../../types/zoning';

// Property Schema
const PropertySchema = new Schema({
  id: String,
  address: {
    street: String,
    suburb: String,
    state: String,
    postcode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  details: {
    propertyType: String,
    bedrooms: Number,
    bathrooms: Number,
    parking: Number,
    landSize: Number,
    floorArea: Number
  },
  valuation: {
    currentValue: Number,
    lastUpdated: Date,
    confidence: Number,
    historicalValues: [{
      date: Date,
      value: Number
    }]
  },
  metrics: {
    daysOnMarket: Number,
    lastSalePrice: Number,
    lastSaleDate: Date,
    rentalYield: Number,
    vacancyRate: Number
  },
  zoning: {
    currentZone: {
      type: String,
      enum: ['green', 'amber', 'red']
    },
    confidence: Number,
    lastUpdated: Date,
    history: [{
      date: Date,
      zone: {
        type: String,
        enum: ['green', 'amber', 'red']
      },
      confidence: Number
    }]
  },
  risk: {
    overall: Number,
    factors: {
      market: Number,
      location: Number,
      property: Number,
      financial: Number
    }
  }
});

// Zone Metrics Schema
const ZoneMetricsSchema = new Schema({
  zone: {
    type: String,
    enum: ['green', 'amber', 'red'],
    required: true
  },
  properties: {
    total: Number,
    newLast24h: Number,
    averageValue: Number,
    medianValue: Number
  },
  performance: {
    averageGrowth: Number,
    medianGrowth: Number,
    rentalYield: Number,
    vacancyRate: Number
  },
  risk: {
    overall: Number,
    market: Number,
    economic: Number,
    environmental: Number
  },
  trends: [{
    date: Date,
    propertyCount: Number,
    averageValue: Number,
    growthRate: Number
  }],
  lastUpdated: { type: Date, default: Date.now }
});

// Market Analysis Schema
const MarketAnalysisSchema = new Schema({
  suburb: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  overview: {
    medianPrice: Number,
    priceGrowth: Number,
    daysOnMarket: Number,
    totalProperties: Number,
    activeListings: Number
  },
  demographics: {
    population: Number,
    populationGrowth: Number,
    medianAge: Number,
    householdIncome: Number,
    ownerOccupied: Number
  },
  marketIndicators: {
    supplyDemand: Number,
    clearanceRate: Number,
    investorActivity: Number,
    marketCycle: {
      type: String,
      enum: ['growth', 'peak', 'decline', 'bottom']
    }
  },
  infrastructure: {
    current: {
      transport: Number,
      education: Number,
      healthcare: Number,
      retail: Number
    },
    planned: {
      projects: [{
        type: String,
        value: Number,
        completion: Date,
        impact: Number
      }]
    }
  },
  riskAssessment: {
    overall: Number,
    factors: {
      market: Number,
      economic: Number,
      environmental: Number,
      regulatory: Number
    }
  }
});

// School Data Schema
const SchoolDataSchema = new Schema({
  suburb: String,
  schools: [{
    name: String,
    type: String,
    naplanScore: Number,
    ranking: Number,
    studentCount: Number
  }],
  averageScore: Number,
  topSchoolCount: Number,
  lastUpdated: { type: Date, default: Date.now }
});

// News Data Schema
const NewsDataSchema = new Schema({
  suburb: String,
  articles: [{
    title: String,
    source: String,
    date: Date,
    sentiment: Number,
    relevance: Number
  }],
  overallSentiment: Number,
  trendingTopics: [String],
  lastUpdated: { type: Date, default: Date.now }
});

// Economic Data Schema
const EconomicDataSchema = new Schema({
  timestamp: Date,
  indicators: {
    gdpGrowth: Number,
    unemployment: Number,
    cashRate: Number,
    inflation: Number
  },
  forecasts: Schema.Types.Mixed,
  marketConditions: Schema.Types.Mixed,
  lastUpdated: { type: Date, default: Date.now }
});

// Safety Data Schema
const SafetyDataSchema = new Schema({
  suburb: String,
  crimeRate: Number,
  incidentTypes: Schema.Types.Mixed,
  safetyScore: Number,
  trends: Schema.Types.Mixed,
  lastUpdated: { type: Date, default: Date.now }
});

// Demographic Data Schema
const DemographicDataSchema = new Schema({
  timestamp: Date,
  metrics: {
    cpi: Number,
    period: String,
    measure: String,
    adjustment: String,
    region: String
  },
  metadata: {
    source: String,
    dataflow: String,
    lastUpdated: Date
  }
});

// Create models
const PropertyModel = mongoose.model<Property & Document>('Property', PropertySchema);
const ZoneMetricsModel = mongoose.model<ZoneMetrics & Document>('ZoneMetrics', ZoneMetricsSchema);
const MarketAnalysisModel = mongoose.model<MarketAnalysis & Document>('MarketAnalysis', MarketAnalysisSchema);
const SchoolDataModel = mongoose.model('SchoolData', SchoolDataSchema);
const NewsDataModel = mongoose.model('NewsData', NewsDataSchema);
const EconomicDataModel = mongoose.model('EconomicData', EconomicDataSchema);
const SafetyDataModel = mongoose.model('SafetyData', SafetyDataSchema);
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

  // Property operations
  public async saveProperty(property: Property): Promise<void> {
    try {
      await PropertyModel.findOneAndUpdate(
        { id: property.id },
        property,
        { upsert: true }
      );
    } catch (error) {
      console.error('Failed to save property:', error);
      throw error;
    }
  }

  public async getProperty(id: string): Promise<Property | null> {
    try {
      return await PropertyModel.findOne({ id });
    } catch (error) {
      console.error('Failed to get property:', error);
      throw error;
    }
  }

  // Zone metrics operations
  public async updateZoneMetrics(metrics: ZoneMetrics): Promise<void> {
    try {
      await ZoneMetricsModel.findOneAndUpdate(
        { zone: metrics.zone },
        metrics,
        { upsert: true }
      );
    } catch (error) {
      console.error('Failed to update zone metrics:', error);
      throw error;
    }
  }

  public async getZoneMetrics(zone: 'green' | 'amber' | 'red'): Promise<ZoneMetrics | null> {
    try {
      return await ZoneMetricsModel.findOne({ zone });
    } catch (error) {
      console.error('Failed to get zone metrics:', error);
      throw error;
    }
  }

  // Market analysis operations
  public async saveMarketAnalysis(analysis: MarketAnalysis): Promise<void> {
    try {
      await MarketAnalysisModel.findOneAndUpdate(
        { suburb: analysis.suburb },
        analysis,
        { upsert: true }
      );
    } catch (error) {
      console.error('Failed to save market analysis:', error);
      throw error;
    }
  }

  public async getMarketAnalysis(suburb: string): Promise<MarketAnalysis | null> {
    try {
      return await MarketAnalysisModel.findOne({ suburb });
    } catch (error) {
      console.error('Failed to get market analysis:', error);
      throw error;
    }
  }

  // Batch operations
  public async batchSaveProperties(properties: Property[]): Promise<void> {
    try {
      const operations = properties.map(property => ({
        updateOne: {
          filter: { id: property.id },
          update: property,
          upsert: true
        }
      }));
      await PropertyModel.bulkWrite(operations);
    } catch (error) {
      console.error('Failed to batch save properties:', error);
      throw error;
    }
  }

  public async getPropertiesByZone(zone: 'green' | 'amber' | 'red'): Promise<Property[]> {
    try {
      return await PropertyModel.find({ 'zoning.currentZone': zone });
    } catch (error) {
      console.error('Failed to get properties by zone:', error);
      throw error;
    }
  }

  public async updateSuburbEducation(schoolData: any): Promise<void> {
    try {
      await SchoolDataModel.findOneAndUpdate(
        { suburb: schoolData.suburb },
        schoolData,
        { upsert: true }
      );
    } catch (error) {
      console.error('Failed to update school data:', error);
      throw error;
    }
  }

  public async updateSuburbNews(newsData: any): Promise<void> {
    try {
      await NewsDataModel.findOneAndUpdate(
        { suburb: newsData.suburb },
        newsData,
        { upsert: true }
      );
    } catch (error) {
      console.error('Failed to update news data:', error);
      throw error;
    }
  }

  public async updateEconomicData(economicData: any): Promise<void> {
    try {
      await EconomicDataModel.findOneAndUpdate(
        { timestamp: economicData.timestamp },
        economicData,
        { upsert: true }
      );
    } catch (error) {
      console.error('Failed to update economic data:', error);
      throw error;
    }
  }

  public async updateSuburbSafety(safetyData: any): Promise<void> {
    try {
      await SafetyDataModel.findOneAndUpdate(
        { suburb: safetyData.suburb },
        safetyData,
        { upsert: true }
      );
    } catch (error) {
      console.error('Failed to update safety data:', error);
      throw error;
    }
  }

  public async updateDemographicData(demographicData: any): Promise<void> {
    try {
      await DemographicDataModel.findOneAndUpdate(
        { timestamp: demographicData.timestamp },
        demographicData,
        { upsert: true }
      );
    } catch (error) {
      console.error('Failed to update demographic data:', error);
      throw error;
    }
  }
} 
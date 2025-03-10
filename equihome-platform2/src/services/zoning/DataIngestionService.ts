import { MarketMetrics, Demographics, AdvancedMLMetrics } from '../../types/zoning';
import { ZoningDatabase } from './ZoningDatabase';

interface DataSource {
  name: string;
  type: 'property' | 'market' | 'demographic' | 'infrastructure' | 'education' | 'news' | 'economic' | 'safety';
  endpoint: string;
  updateInterval: number; // in milliseconds
  lastUpdate?: Date;
}

export class DataIngestionService {
  private static instance: DataIngestionService;
  private database: ZoningDatabase;
  private dataSources: DataSource[];
  private updateIntervals: NodeJS.Timeout[];

  private constructor() {
    this.database = ZoningDatabase.getInstance();
    this.dataSources = [
      {
        name: 'PropTrack',
        type: 'property',
        endpoint: process.env.PROPTRACK_API_ENDPOINT || '',
        updateInterval: 15 * 60 * 1000 // 15 minutes
      },
      {
        name: 'CoreLogic',
        type: 'market',
        endpoint: process.env.CORELOGIC_API_ENDPOINT || '',
        updateInterval: 30 * 60 * 1000 // 30 minutes
      },
      {
        name: 'ABS',
        type: 'demographic',
        endpoint: process.env.ABS_API_ENDPOINT || '',
        updateInterval: 24 * 60 * 60 * 1000 // 24 hours
      },
      {
        name: 'NSW Planning',
        type: 'infrastructure',
        endpoint: process.env.NSW_PLANNING_API_ENDPOINT || '',
        updateInterval: 12 * 60 * 60 * 1000 // 12 hours
      },
      {
        name: 'MySchool',
        type: 'education',
        endpoint: process.env.MYSCHOOL_API_ENDPOINT || '',
        updateInterval: 24 * 60 * 60 * 1000 // 24 hours
      },
      {
        name: 'NewsAPI',
        type: 'news',
        endpoint: process.env.NEWS_API_ENDPOINT || '',
        updateInterval: 60 * 60 * 1000 // 1 hour
      },
      {
        name: 'RBA',
        type: 'economic',
        endpoint: process.env.RBA_API_ENDPOINT || '',
        updateInterval: 24 * 60 * 60 * 1000 // 24 hours
      },
      {
        name: 'Crime Stats',
        type: 'safety',
        endpoint: process.env.CRIME_STATS_API_ENDPOINT || '',
        updateInterval: 24 * 60 * 60 * 1000 // 24 hours
      }
    ];
    this.updateIntervals = [];
  }

  public static getInstance(): DataIngestionService {
    if (!DataIngestionService.instance) {
      DataIngestionService.instance = new DataIngestionService();
    }
    return DataIngestionService.instance;
  }

  public async start(): Promise<void> {
    try {
      // Initial data load
      await this.loadInitialData();

      // Set up update intervals
      this.setupUpdateIntervals();

      console.log('Data ingestion service started successfully');
    } catch (error) {
      console.error('Failed to start data ingestion service:', error);
      throw error;
    }
  }

  public stop(): void {
    this.updateIntervals.forEach(interval => clearInterval(interval));
    this.updateIntervals = [];
    console.log('Data ingestion service stopped');
  }

  private async loadInitialData(): Promise<void> {
    try {
      await Promise.all(
        this.dataSources.map(source => this.fetchDataFromSource(source))
      );
    } catch (error) {
      console.error('Failed to load initial data:', error);
      throw error;
    }
  }

  private setupUpdateIntervals(): void {
    this.dataSources.forEach(source => {
      const interval = setInterval(
        () => this.fetchDataFromSource(source),
        source.updateInterval
      );
      this.updateIntervals.push(interval);
    });
  }

  public getDataSource(name: string): DataSource | undefined {
    return this.dataSources.find(source => source.name === name);
  }

  public async fetchDataFromSource(source: DataSource): Promise<void> {
    try {
      console.log(`Fetching data from ${source.name}...`);
      
      let data;
      if (source.name === 'ABS') {
        data = await this.fetchABSData(source);
      } else {
        const response = await fetch(source.endpoint, {
          headers: this.getSourceHeaders(source)
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${source.name}`);
        }

        data = await response.json();
      }
      
      // Process and store the data based on source type
      await this.processSourceData(source, data);
      
      // Update last update timestamp
      source.lastUpdate = new Date();
      
      console.log(`Successfully updated data from ${source.name}`);
    } catch (error) {
      console.error(`Failed to fetch data from ${source.name}:`, error);
      throw error;
    }
  }

  private getSourceHeaders(source: DataSource): HeadersInit {
    switch (source.name) {
      case 'PropTrack':
        return {
          'Authorization': `Bearer ${process.env.PROPTRACK_API_KEY}`,
          'Content-Type': 'application/json'
        };
      case 'CoreLogic':
        return {
          'X-Api-Key': process.env.CORELOGIC_API_KEY || '',
          'Content-Type': 'application/json'
        };
      case 'ABS':
        return {
          'Accept': 'application/vnd.sdmx.data+json',
          'Content-Type': 'application/json'
        };
      case 'NSW Planning':
        return {
          'X-API-Key': process.env.NSW_PLANNING_API_KEY || '',
          'Content-Type': 'application/json'
        };
      default:
        return {
          'Content-Type': 'application/json'
        };
    }
  }

  private async fetchABSData(source: DataSource): Promise<any> {
    // Step 1: Set up the parameters
    const params = {
      // Property Price Index for Sydney
      dataflowId: 'ABS.RPPI.1.0.0',  // Residential Property Price Index
      dataKey: '1.1.2.Q',            // 1=Index, 1=Sydney, 2=Established houses, Q=Quarterly
      startPeriod: '2023-Q1',        // Last year's data
      endPeriod: '2024-Q1',          // Current data
      format: 'csvwithlabels'        // Easier to read CSV format
    };

    // Step 2: Build the URL
    const baseUrl = 'https://api.data.abs.gov.au';
    const url = `${baseUrl}/data/${params.dataflowId}/${params.dataKey}`;
    
    // Step 3: Add the query parameters
    const fullUrl = `${url}?startPeriod=${params.startPeriod}&endPeriod=${params.endPeriod}&format=${params.format}`;

    console.log('Fetching ABS data from:', fullUrl);

    // Step 4: Make the request
    const response = await fetch(fullUrl, {
      headers: {
        'Accept': 'text/csv'  // Request CSV format
      }
    });

    if (!response.ok) {
      throw new Error(`ABS API error: ${response.statusText}`);
    }

    // Step 5: Get the data
    const data = await response.text();
    console.log('ABS Data received:', data.substring(0, 200) + '...');  // Log first 200 chars

    return data;
  }

  private async processSourceData(source: DataSource, data: any): Promise<void> {
    switch (source.type) {
      case 'property':
        await this.processPropertyData(data);
        break;
      case 'market':
        await this.processMarketData(data);
        break;
      case 'demographic':
        await this.processDemographicData(data);
        break;
      case 'infrastructure':
        await this.processInfrastructureData(data);
        break;
      case 'education':
        await this.processEducationData(data);
        break;
      case 'news':
        await this.processNewsData(data);
        break;
      case 'economic':
        await this.processEconomicData(data);
        break;
      case 'safety':
        await this.processSafetyData(data);
        break;
    }
  }

  private async processPropertyData(data: any): Promise<void> {
    // Process property-level data from PropTrack
    const properties = data.properties.map((prop: any) => ({
      id: prop.id,
      address: {
        street: prop.address,
        suburb: prop.suburb,
        state: prop.state,
        postcode: prop.postcode,
        coordinates: {
          lat: prop.latitude,
          lng: prop.longitude
        }
      },
      details: {
        propertyType: prop.type,
        bedrooms: prop.bedrooms,
        bathrooms: prop.bathrooms,
        parking: prop.parking,
        landSize: prop.landSize,
        floorArea: prop.floorArea
      },
      valuation: {
        currentValue: prop.estimatedValue,
        lastUpdated: new Date(prop.valuationDate),
        confidence: prop.valuationConfidence,
        historicalValues: prop.historicalValues
      },
      metrics: {
        daysOnMarket: prop.daysOnMarket,
        lastSalePrice: prop.lastSalePrice,
        lastSaleDate: new Date(prop.lastSaleDate),
        rentalYield: prop.rentalYield,
        vacancyRate: prop.vacancyRate
      }
    }));

    await this.database.batchSaveProperties(properties);
  }

  private async processMarketData(data: any): Promise<void> {
    // Process market-level data from CoreLogic
    const marketMetrics: MarketMetrics = {
      medianPrice: data.medianPrice,
      priceGrowth: data.annualGrowth,
      rentalYield: data.rentalYield,
      daysOnMarket: data.averageDaysOnMarket,
      clearanceRate: data.auctionClearanceRate
    };

    // Store market metrics in the database
    // Implementation depends on your database schema
  }

  private async processDemographicData(data: string): Promise<void> {
    try {
      // Step 1: Parse CSV data
      const lines = data.split('\n');
      const headers = lines[0].split(',');
      const values = lines[1].split(',');  // Get the most recent data point

      // Step 2: Create a simple object from the CSV data
      const propertyData = {
        timestamp: new Date(),
        metrics: {
          sydneyHousePriceIndex: parseFloat(values[1]) || 0,
          period: values[0] || '',
          yearOverYearChange: 0  // We'll calculate this
        },
        metadata: {
          source: 'ABS',
          dataflow: 'Residential Property Price Index',
          region: 'Sydney',
          propertyType: 'Established Houses',
          lastUpdated: new Date()
        }
      };

      // Step 3: Calculate year-over-year change if we have enough data
      if (lines.length > 5) {  // Assuming quarterly data, 4 quarters + header
        const yearAgoValues = lines[4].split(',');
        const currentValue = parseFloat(values[1]);
        const yearAgoValue = parseFloat(yearAgoValues[1]);
        if (!isNaN(currentValue) && !isNaN(yearAgoValue) && yearAgoValue !== 0) {
          propertyData.metrics.yearOverYearChange = 
            ((currentValue - yearAgoValue) / yearAgoValue) * 100;
        }
      }

      console.log('Processed property data:', propertyData);

      // Step 4: Save to database
      await this.database.updateDemographicData(propertyData);

    } catch (error) {
      console.error('Failed to process ABS data:', error);
      throw error;
    }
  }

  private async processInfrastructureData(data: any): Promise<void> {
    // Process infrastructure data from NSW Planning
    const infrastructureData = {
      current: {
        transport: data.transportScore,
        education: data.educationScore,
        healthcare: data.healthcareScore,
        retail: data.retailScore
      },
      planned: {
        projects: data.plannedProjects.map((project: any) => ({
          type: project.type,
          value: project.estimatedValue,
          completion: new Date(project.completionDate),
          impact: project.impactScore
        }))
      }
    };

    // Store infrastructure data in the database
    // Implementation depends on your database schema
  }

  private async processEducationData(data: any): Promise<void> {
    const schoolData = {
      suburb: data.suburb,
      schools: data.schools.map((school: any) => ({
        name: school.name,
        type: school.type,
        naplanScore: school.naplanScore,
        ranking: school.ranking,
        studentCount: school.studentCount
      })),
      averageScore: data.averageScore,
      topSchoolCount: data.topSchoolCount
    };

    await this.database.updateSuburbEducation(schoolData);
  }

  private async processNewsData(data: any): Promise<void> {
    const newsData = {
      suburb: data.suburb,
      articles: data.articles.map((article: any) => ({
        title: article.title,
        source: article.source,
        date: new Date(article.date),
        sentiment: article.sentiment,
        relevance: article.relevance
      })),
      overallSentiment: data.overallSentiment,
      trendingTopics: data.trendingTopics
    };

    await this.database.updateSuburbNews(newsData);
  }

  private async processEconomicData(data: any): Promise<void> {
    const economicData = {
      timestamp: new Date(),
      indicators: {
        gdpGrowth: data.gdpGrowth,
        unemployment: data.unemployment,
        cashRate: data.cashRate,
        inflation: data.inflation
      },
      forecasts: data.forecasts,
      marketConditions: data.marketConditions
    };

    await this.database.updateEconomicData(economicData);
  }

  private async processSafetyData(data: any): Promise<void> {
    const safetyData = {
      suburb: data.suburb,
      crimeRate: data.crimeRate,
      incidentTypes: data.incidentTypes,
      safetyScore: data.safetyScore,
      trends: data.trends
    };

    await this.database.updateSuburbSafety(safetyData);
  }
} 
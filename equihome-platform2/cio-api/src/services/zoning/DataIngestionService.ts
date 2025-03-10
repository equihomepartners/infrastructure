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
        name: 'ABS',
        type: 'demographic',
        endpoint: process.env.ABS_API_ENDPOINT || 'https://api.data.abs.gov.au',
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
      case 'ABS':
        return {
          'Accept': 'application/vnd.sdmx.data+csv;labels=both',
          'Content-Type': 'application/json'
        };
      default:
        return {
          'Content-Type': 'application/json'
        };
    }
  }

  private async fetchABSData(source: DataSource): Promise<any> {
    try {
      // Using mock data for now since ABS API is not accessible
      console.log('Using mock RPPI data for Sydney');
      
      const mockData = {
        timestamp: new Date(),
        data: [
          {
            period: '2024-Q1',
            value: 185.2,
            yearOverYearChange: 7.2
          },
          {
            period: '2023-Q4',
            value: 182.1,
            yearOverYearChange: 6.8
          },
          {
            period: '2023-Q3',
            value: 178.9,
            yearOverYearChange: 5.9
          },
          {
            period: '2023-Q2',
            value: 176.4,
            yearOverYearChange: 4.2
          },
          {
            period: '2023-Q1',
            value: 172.8,
            yearOverYearChange: 3.1
          }
        ],
        metadata: {
          source: 'Mock ABS Data',
          dataflow: 'Residential Property Price Index',
          region: 'Sydney',
          propertyType: 'Established Houses',
          lastUpdated: new Date()
        }
      };

      return mockData;
    } catch (error) {
      console.error('Error with mock ABS data:', error);
      throw error;
    }
  }

  private async processSourceData(source: DataSource, data: any): Promise<void> {
    switch (source.type) {
      case 'demographic':
        await this.processDemographicData(data);
        break;
    }
  }

  private async processDemographicData(data: any): Promise<void> {
    try {
      // Process the mock data
      const propertyData = {
        timestamp: data.timestamp,
        metrics: {
          sydneyHousePriceIndex: data.data[0].value,
          period: data.data[0].period,
          yearOverYearChange: data.data[0].yearOverYearChange
        },
        metadata: data.metadata
      };

      console.log('Processed property data:', propertyData);

      // Save to database
      await this.database.updateDemographicData(propertyData);

    } catch (error) {
      console.error('Failed to process demographic data:', error);
      throw error;
    }
  }
} 
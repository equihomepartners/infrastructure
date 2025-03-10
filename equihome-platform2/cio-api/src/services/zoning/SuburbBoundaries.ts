import axios from 'axios';
import fs from 'fs';
import path from 'path';

interface SuburbBoundary {
  type: 'Feature';
  properties: {
    name: string;
    state: string;
    postcode: string;
    sa2_code: string;
  };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][];
  };
}

interface GeoJSONCollection {
  type: 'FeatureCollection';
  features: SuburbBoundary[];
}

class SuburbBoundariesService {
  private static instance: SuburbBoundariesService;
  private boundaries: GeoJSONCollection | null = null;
  private readonly cacheFile = path.join(__dirname, '../../../data/suburbBoundaries.json');

  private constructor() {}

  public static getInstance(): SuburbBoundariesService {
    if (!SuburbBoundariesService.instance) {
      SuburbBoundariesService.instance = new SuburbBoundariesService();
    }
    return SuburbBoundariesService.instance;
  }

  public async initialize(): Promise<void> {
    try {
      // Try to load from cache first
      if (await this.loadFromCache()) {
        console.log('Loaded suburb boundaries from cache');
        return;
      }

      // If cache doesn't exist or is invalid, fetch from ABS
      await this.fetchFromABS();
    } catch (error) {
      console.error('Error initializing suburb boundaries:', error);
      throw error;
    }
  }

  private async loadFromCache(): Promise<boolean> {
    try {
      if (fs.existsSync(this.cacheFile)) {
        const data = await fs.promises.readFile(this.cacheFile, 'utf8');
        this.boundaries = JSON.parse(data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error loading from cache:', error);
      return false;
    }
  }

  private async fetchFromABS(): Promise<void> {
    try {
      // This is a simplified example - you would need to use the actual ABS API endpoint
      const response = await axios.get('https://api.data.abs.gov.au/data/SA2/2021');
      const features = response.data.features.map((feature: any) => ({
        type: 'Feature',
        properties: {
          name: feature.properties.SA2_NAME21,
          state: feature.properties.STE_NAME21,
          postcode: feature.properties.POA_CODE21,
          sa2_code: feature.properties.SA2_CODE21
        },
        geometry: feature.geometry
      }));

      this.boundaries = {
        type: 'FeatureCollection',
        features
      };

      // Cache the data
      await this.saveToCache();
    } catch (error) {
      console.error('Error fetching from ABS:', error);
      throw error;
    }
  }

  private async saveToCache(): Promise<void> {
    try {
      await fs.promises.writeFile(
        this.cacheFile,
        JSON.stringify(this.boundaries, null, 2)
      );
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }

  public getBoundaries(): GeoJSONCollection {
    if (!this.boundaries) {
      throw new Error('Suburb boundaries not initialized');
    }
    return this.boundaries;
  }

  public getSuburbBoundary(suburb: string): SuburbBoundary | null {
    if (!this.boundaries) {
      throw new Error('Suburb boundaries not initialized');
    }

    return this.boundaries.features.find(
      feature => feature.properties.name.toLowerCase() === suburb.toLowerCase()
    ) || null;
  }
}

export default SuburbBoundariesService; 
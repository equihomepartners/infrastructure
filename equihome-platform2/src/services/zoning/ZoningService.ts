import { Property } from '../../types/property';
import { ZoneClassification, ZoneMetrics, MarketAnalysis } from '../../types/zoning';
import { getMLSystemStatus } from '../mlAnalytics';

export class ZoningService {
  private static instance: ZoningService;
  private dataUpdateInterval: number = 5 * 60 * 1000; // 5 minutes

  private constructor() {
    this.startDataUpdateLoop();
  }

  public static getInstance(): ZoningService {
    if (!ZoningService.instance) {
      ZoningService.instance = new ZoningService();
    }
    return ZoningService.instance;
  }

  private startDataUpdateLoop() {
    setInterval(async () => {
      await this.updateZoneData();
    }, this.dataUpdateInterval);
  }

  private async updateZoneData() {
    try {
      const mlStatus = await getMLSystemStatus();
      // Update zone classifications based on latest data
      await this.processNewData(mlStatus.dataPoints.newProperties);
    } catch (error) {
      console.error('Failed to update zone data:', error);
    }
  }

  private async processNewData(newProperties: number) {
    // Process new property data and update classifications
    // This will be implemented with real ML model integration
  }

  public async classifyZone(suburb: string): Promise<ZoneClassification> {
    try {
      const response = await fetch(`/api/zoning/classify/${suburb}`);
      if (!response.ok) throw new Error('Failed to classify zone');
      return await response.json();
    } catch (error) {
      console.error('Zone classification failed:', error);
      throw error;
    }
  }

  public async getMarketAnalysis(suburb: string): Promise<MarketAnalysis> {
    try {
      const response = await fetch(`/api/zoning/market-analysis/${suburb}`);
      if (!response.ok) throw new Error('Failed to get market analysis');
      return await response.json();
    } catch (error) {
      console.error('Market analysis failed:', error);
      throw error;
    }
  }

  public async getZoneMetrics(zone: 'green' | 'amber' | 'red'): Promise<ZoneMetrics> {
    try {
      const response = await fetch(`/api/zoning/metrics/${zone}`);
      if (!response.ok) throw new Error('Failed to get zone metrics');
      return await response.json();
    } catch (error) {
      console.error('Failed to get zone metrics:', error);
      throw error;
    }
  }

  public async updatePropertyData(property: Property): Promise<void> {
    try {
      const response = await fetch('/api/zoning/property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
      });
      if (!response.ok) throw new Error('Failed to update property data');
    } catch (error) {
      console.error('Property update failed:', error);
      throw error;
    }
  }
} 
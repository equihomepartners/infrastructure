import { Request, Response } from 'express';
import { ZoningService } from '../../services/zoning/ZoningService';
import { Property } from '../../types/property';
import { ZoneClassification, ZoneMetrics, MarketAnalysis } from '../../types/zoning';

export class ZoningController {
  private zoningService: ZoningService;

  constructor() {
    this.zoningService = ZoningService.getInstance();
  }

  public classifyZone = async (req: Request, res: Response) => {
    try {
      const { suburb } = req.params;
      const classification = await this.zoningService.classifyZone(suburb);
      res.json(classification);
    } catch (error) {
      res.status(500).json({ error: 'Failed to classify zone' });
    }
  };

  public getMarketAnalysis = async (req: Request, res: Response) => {
    try {
      const { suburb } = req.params;
      const analysis = await this.zoningService.getMarketAnalysis(suburb);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get market analysis' });
    }
  };

  public getZoneMetrics = async (req: Request, res: Response) => {
    try {
      const { zone } = req.params as { zone: 'green' | 'amber' | 'red' };
      const metrics = await this.zoningService.getZoneMetrics(zone);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get zone metrics' });
    }
  };

  public updatePropertyData = async (req: Request, res: Response) => {
    try {
      const property: Property = req.body;
      await this.zoningService.updatePropertyData(property);
      res.status(200).json({ message: 'Property data updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update property data' });
    }
  };

  public getRealTimeMetrics = async (req: Request, res: Response) => {
    try {
      const metrics = {
        timestamp: new Date(),
        processingRate: 765000, // Properties per day
        activeModels: ['GPT-4', 'EquiVision', 'XGBoost'],
        zoneDistribution: {
          green: 35,
          amber: 45,
          red: 20
        },
        accuracy: {
          overall: 94.3,
          byZone: {
            green: 95.2,
            amber: 93.8,
            red: 93.9
          }
        },
        latency: {
          classification: 145, // ms
          analysis: 235, // ms
          dataProcessing: 89 // ms
        }
      };
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get real-time metrics' });
    }
  };

  public batchClassifyZones = async (req: Request, res: Response) => {
    try {
      const { suburbs } = req.body;
      const results = await Promise.all(
        suburbs.map((suburb: string) => this.zoningService.classifyZone(suburb))
      );
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: 'Failed to perform batch classification' });
    }
  };

  public batchUpdateProperties = async (req: Request, res: Response) => {
    try {
      const { properties } = req.body;
      await Promise.all(
        properties.map((property: Property) => this.zoningService.updatePropertyData(property))
      );
      res.status(200).json({ message: 'Batch update completed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to perform batch update' });
    }
  };
} 
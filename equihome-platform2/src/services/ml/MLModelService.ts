import { MLModelConfig, ZoneClassification, SuburbData, MLSystemStatus } from '../../types/ml';

class MLModelService {
  private static instance: MLModelService;
  private selectedModel: string;
  private status: MLSystemStatus | null = null;
  private readonly apiUrl = 'http://localhost:3008';

  private constructor() {
    this.selectedModel = localStorage.getItem('selectedModel') || 'xgboost';
  }

  public static getInstance(): MLModelService {
    if (!MLModelService.instance) {
      MLModelService.instance = new MLModelService();
    }
    return MLModelService.instance;
  }

  public async initialize(): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/status`);
      if (!response.ok) {
        throw new Error('Failed to fetch ML service status');
      }
      const data = await response.json();
      
      // Transform the ML service response to match MLSystemStatus interface
      this.status = {
        initialized: data.initialized,
        modelId: this.selectedModel,
        lastUpdate: new Date(),
        nextUpdate: new Date(Date.now() + 5 * 60 * 1000),
        dataPoints: data.dataPoints,
        modelMetrics: data.modelMetrics,
        systemHealth: data.systemHealth,
        integrations: {
          proptrack: true,
          corelogic: true,
          abs: true,
          nswPlanning: true
        },
        modelSelected: true,
        modelConnected: data.modelConnections?.xgboost || false
      };
    } catch (error) {
      console.error('Error initializing ML service:', error);
      throw error;
    }
  }

  public getModelStatus(): MLSystemStatus {
    if (!this.status) {
      throw new Error('ML service not initialized');
    }
    return this.status;
  }

  public getSelectedModel(): string {
    return this.selectedModel;
  }

  public setSelectedModel(modelId: string): void {
    this.selectedModel = modelId;
    localStorage.setItem('selectedModel', modelId);
  }

  public async classifyZone(suburbData: SuburbData): Promise<ZoneClassification> {
    try {
      const response = await fetch(`${this.apiUrl}/classify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ suburb: suburbData }),
      });

      if (!response.ok) {
        throw new Error('Failed to classify zone');
      }

      return await response.json();
    } catch (error) {
      console.error('Error classifying zone:', error);
      throw error;
    }
  }

  public async classifyZones(suburbs: SuburbData[]): Promise<ZoneClassification[]> {
    if (!this.status) {
      throw new Error('ML service not initialized');
    }

    try {
      const response = await fetch(`${this.apiUrl}/classify-bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(suburbs),
      });

      if (!response.ok) {
        throw new Error('Failed to classify zones');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to classify zones:', error);
      throw error;
    }
  }
}

export default MLModelService; 
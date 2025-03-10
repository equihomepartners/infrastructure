import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, LineChart, AlertTriangle, Info, Settings, CheckCircle, X, Loader2, Building2, Zap } from 'lucide-react';
import { useFundParameters } from '@/store/fundParameters';
import { getMLSystemStatus } from '@/services/mlAnalytics';
import MLModelService from '@/services/ml/MLModelService';
import { ModelOption } from '../../types/ml';

interface CIODashboardSettings {
  targetIRR: {
    min: number;
    max: number;
  };
  fundSize: {
    min: number;
    max: number;
  };
  zoneAllocation: {
    green: number;
    amber: number;
    red: number;
  };
  riskTolerance: 'low' | 'moderate' | 'optimal';
  assetAllocation: {
    singleFamily: number;
    // Add other asset types
  };
  loanParameters: {
    maxLTV: number;
    maxLTI: number;
    minDSCR: number;
  };
  investmentStrategy: string;
}

const defaultDataProcessing = {
  microFactors: [
    'Property-specific metrics',
    'Historical sale prices',
    'Current valuations',
    'Property condition'
  ],
  locationFactors: [
    'School zones',
    'Crime statistics',
    'Amenities',
    'Transport'
  ],
  macroFactors: [
    'Interest rates',
    'Employment',
    'Population growth',
    'Infrastructure'
  ],
  marketDynamics: [
    'Sales trends',
    'Days on market',
    'Price ratios',
    'Demand indicators'
  ]
};

const defaultZoningLogic = {
  greenZone: {
    criteria: ['Strong growth', 'Low risk', 'Good infrastructure'],
    weight: 0.4,
    confidenceScoring: 'Weighted average of factors'
  },
  amberZone: {
    criteria: ['Moderate growth', 'Medium risk', 'Mixed infrastructure'],
    weight: 0.35,
    confidenceScoring: 'Balanced scoring'
  },
  redZone: {
    criteria: ['Low growth', 'High risk', 'Poor infrastructure'],
    weight: 0.25,
    confidenceScoring: 'Risk-weighted scoring'
  }
};

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: 'xgboost',
    name: 'XGBoost',
    description: 'Gradient boosting model for zone classification',
    type: 'production',
    performance: {
      accuracy: 0.90,
      f1Score: 0.898,
      precision: 0.895,
      recall: 0.902
    },
    features: [
      'Historical trend analysis',
      'Zone transition prediction',
      'Growth pattern detection',
      'Risk assessment'
    ],
    strengths: [
      'Fast predictions',
      'Excellent with time-series',
      'Clear decision paths',
      'Low latency'
    ],
    limitations: [
      'Limited context analysis',
      'Requires structured data',
      'Regular retraining'
    ],
    useCases: [
      'Zone classification',
      'Growth prediction',
      'Risk scoring',
      'Trend analysis'
    ],
    modelDetails: {
      architecture: 'Gradient boosting trees',
      trainingData: 'Historical property data',
      dataProcessing: defaultDataProcessing,
      validationMethod: 'Cross-validation',
      errorAnalysis: 'Feature importance',
      computationalNeeds: 'Moderate CPU',
      updateFrequency: 'Daily',
      confidenceInterval: '±4%',
      zoningLogic: defaultZoningLogic
    },
    trafficLightLogic: {
      adaptation: 'Feature-based',
      implementation: 'Direct mapping',
      example: 'Sydney suburbs'
    }
  },
  {
    id: 'equivision',
    name: 'EquiVision™',
    description: 'Advanced AI for Sydney property analysis',
    type: 'post-production',
    performance: {
      accuracy: 0.95,
      f1Score: 0.948,
      precision: 0.945,
      recall: 0.952
    },
    features: [
      'Real-time classification',
      'Growth assessment',
      'Infrastructure analysis',
      'Market insights'
    ],
    strengths: [
      'High accuracy',
      'Real-time processing',
      'Multi-factor analysis',
      'Sydney focus'
    ],
    limitations: [
      'Complex setup',
      'High resources',
      'Regular updates'
    ],
    useCases: [
      'Zone classification',
      'Growth prediction',
      'Risk assessment',
      'Market analysis'
    ],
    modelDetails: {
      architecture: 'Advanced neural network',
      trainingData: 'Sydney property data',
      dataProcessing: defaultDataProcessing,
      validationMethod: 'Continuous validation',
      errorAnalysis: 'Real-time monitoring',
      computationalNeeds: 'High GPU',
      updateFrequency: 'Real-time',
      confidenceInterval: '±2%',
      zoningLogic: defaultZoningLogic
    },
    trafficLightLogic: {
      adaptation: 'Real-time',
      implementation: 'Dynamic',
      example: 'Sydney CBD'
    }
  },
  {
    id: 'grok',
    name: 'Grok-3',
    description: 'Next-gen AI for zoning analysis',
    type: 'testing',
    performance: {
      accuracy: 0.88,
      f1Score: 0.878,
      precision: 0.875,
      recall: 0.882
    },
    features: [
      'Real-time monitoring',
      'Dynamic assessment',
      'Zone prediction',
      'Risk analysis'
    ],
    strengths: [
      'Fast processing',
      'Adaptability',
      'Pattern recognition',
      'Comprehensive'
    ],
    limitations: [
      'Early stage',
      'Limited testing',
      'Resource heavy'
    ],
    useCases: [
      'Zone monitoring',
      'Growth tracking',
      'Risk assessment',
      'Trend analysis'
    ],
    modelDetails: {
      architecture: 'Neural network',
      trainingData: 'Real-time data',
      dataProcessing: defaultDataProcessing,
      validationMethod: 'Continuous',
      errorAnalysis: 'Real-time',
      computationalNeeds: 'High GPU',
      updateFrequency: 'Real-time',
      confidenceInterval: '±5%',
      zoningLogic: defaultZoningLogic
    },
    trafficLightLogic: {
      adaptation: 'Dynamic',
      implementation: 'Real-time',
      example: 'Live updates'
    }
  },
  {
    id: 'hybrid',
    name: 'Hybrid Model',
    description: 'Multi-model ensemble for zone analysis',
    type: 'production',
    performance: {
      accuracy: 0.92,
      f1Score: 0.918,
      precision: 0.915,
      recall: 0.922
    },
    features: [
      'Combined insights',
      'Balanced analysis',
      'Risk assessment',
      'Growth prediction'
    ],
    strengths: [
      'Comprehensive',
      'Balanced approach',
      'Multiple sources',
      'Robust results'
    ],
    limitations: [
      'Complex setup',
      'Resource intensive',
      'Regular calibration'
    ],
    useCases: [
      'Zone analysis',
      'Growth assessment',
      'Risk evaluation',
      'Trend prediction'
    ],
    modelDetails: {
      architecture: 'Model ensemble',
      trainingData: 'Multiple sources',
      dataProcessing: defaultDataProcessing,
      validationMethod: 'Multi-stage',
      errorAnalysis: 'Comprehensive',
      computationalNeeds: 'High',
      updateFrequency: 'Daily',
      confidenceInterval: '±3%',
      zoningLogic: defaultZoningLogic
    },
    trafficLightLogic: {
      adaptation: 'Combined',
      implementation: 'Multi-source',
      example: 'Sydney metro'
    }
  }
];

interface MLModelSettingsProps {
  onModelSelect: (model: ModelOption) => void;
}

// Add Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean, error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-red-200 bg-red-50 rounded">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <h2>Something went wrong.</h2>
          </div>
          <p className="mt-2 text-red-600">{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const MLModelSettings: React.FC<MLModelSettingsProps> = ({ onModelSelect }) => {
  const fundParameters = useFundParameters();
  const [selectedModel, setSelectedModel] = useState<ModelOption | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'zoning' | 'portfolio'>('zoning');
  const [showExplanation, setShowExplanation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelStatus, setModelStatus] = useState<{
    initialized: boolean;
    modelConnections: { [key: string]: boolean };
    metrics: {
      accuracy: number;
      confidence: number;
      validationScore: number;
    };
    health: {
      status: string;
      uptime: number;
      latency: number;
      errorRate: number;
    };
  } | null>(null);

  useEffect(() => {
    const mlService = MLModelService.getInstance();
    const checkStatus = async () => {
      try {
        await mlService.initialize();
        const status = mlService.getModelStatus();
        setModelStatus({
          initialized: status.initialized,
          modelConnections: {
            xgboost: status.modelConnected,
            equivision: false,
            grok: false,
            hybrid: false
          },
          metrics: {
            accuracy: status.modelMetrics.accuracy,
            confidence: status.modelMetrics.confidence,
            validationScore: status.modelMetrics.validationScore
          },
          health: {
            status: status.systemHealth.status,
            uptime: status.systemHealth.uptime,
            latency: status.systemHealth.latency,
            errorRate: status.systemHealth.errorRate
          }
        });
        
        const persistedModelId = mlService.getSelectedModel();
        if (persistedModelId) {
          const model = MODEL_OPTIONS.find(m => m.id === persistedModelId);
          if (model) {
            setSelectedModel(model);
            onModelSelect(model);
          }
        }
      } catch (error) {
        console.error('Failed to get model status:', error);
        setError('Failed to connect to ML service');
      }
    };
    
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, [onModelSelect]);

  const getConnectionStatus = (modelId: string): boolean => {
    return modelStatus?.modelConnections?.[modelId] || false;
  };

  const handleModelSelect = (model: ModelOption) => {
    if (!getConnectionStatus(model.id)) return;
    setSelectedModel(model);
    onModelSelect(model);
    const mlService = MLModelService.getInstance();
    mlService.setSelectedModel(model.id);
  };

  // Convert fund parameters to CIO settings format
  const cioSettings: CIODashboardSettings = {
    targetIRR: {
      min: fundParameters.targetIRR - 2,
      max: fundParameters.targetIRR + 2
    },
    fundSize: {
      min: fundParameters.maxLoanSize,
      max: fundParameters.maxPropertyValue
    },
    zoneAllocation: {
      green: fundParameters.zoneAllocation.green,
      amber: fundParameters.zoneAllocation.orange,
      red: fundParameters.zoneAllocation.red
    },
    riskTolerance: 'optimal',
    assetAllocation: {
      singleFamily: 100
    },
    loanParameters: {
      maxLTV: fundParameters.maxLTV,
      maxLTI: 4.5,
      minDSCR: 1.25
    },
    investmentStrategy: 'Conservative Growth'
  };

  const getModelContent = (model: ModelOption | null, category: 'zoning' | 'portfolio') => {
    if (!model) return {
      description: '',
      features: [],
      strengths: [],
      limitations: []
    };

    const content = {
      zoning: {
        equivision: {
          description: 'Advanced AI model specialized in Sydney property zoning analysis',
          features: [
            'Real-time zone classification',
            'Growth potential assessment',
            'Infrastructure impact analysis',
            'Demographic trend integration'
          ],
          strengths: [
            'Highest accuracy in zone prediction',
            'Real-time data processing',
            'Multi-factor analysis',
            'Sydney-specific training'
          ],
          limitations: [
            'Complex infrastructure requirements',
            'High computational demands',
            'Requires regular data updates'
          ]
        },
        xgboost: {
          description: 'Gradient boosting model optimized for zone classification',
          features: [
            'Historical trend analysis',
            'Zone transition prediction',
            'Growth pattern detection',
            'Risk factor assessment'
          ],
          strengths: [
            'Fast zone predictions',
            'Excellent with time-series data',
            'Clear decision paths',
            'Low latency responses'
          ],
          limitations: [
            'Limited contextual analysis',
            'Requires structured data',
            'Regular retraining needed'
          ]
        },
        'random-forest': {
          description: 'Ensemble model for comprehensive zoning analysis',
          features: [
            'Multi-factor zone analysis',
            'Growth pattern recognition',
            'Infrastructure impact assessment',
            'Market trend analysis'
          ],
          strengths: [
            'Robust zone predictions',
            'Balanced analysis approach',
            'Handles missing data well',
            'Clear feature importance'
          ],
          limitations: [
            'Higher memory usage',
            'Slower updates',
            'Complex configuration'
          ]
        },
        gpt4: {
          description: 'Advanced language model for zoning pattern analysis',
          features: [
            'Complex zoning pattern recognition',
            'Policy impact analysis',
            'Development trend assessment',
            'Contextual zone evaluation'
          ],
          strengths: [
            'Deep context understanding',
            'Policy interpretation',
            'Flexible adaptation',
            'Natural language insights'
          ],
          limitations: [
            'Higher latency',
            'Resource intensive',
            'Complex deployment'
          ]
        },
        grok: {
          description: 'Next-gen AI for real-time zoning analysis',
          features: [
            'Real-time zone monitoring',
            'Dynamic zone assessment',
            'Rapid pattern detection',
            'Instant updates'
          ],
          strengths: [
            'Fast processing',
            'Real-time adaptation',
            'Advanced pattern recognition',
            'Quick zone updates'
          ],
          limitations: [
            'Early development',
            'Limited validation',
            'Resource intensive'
          ]
        },
        hybrid: {
          description: 'Multi-model ensemble for precise zone classification',
          features: [
            'Combined model insights',
            'Multi-factor analysis',
            'Comprehensive zone assessment',
            'Balanced predictions'
          ],
          strengths: [
            'High accuracy',
            'Robust predictions',
            'Multiple data sources',
            'Balanced approach'
          ],
          limitations: [
            'Complex setup',
            'Resource intensive',
            'Regular calibration'
          ]
        }
      },
      portfolio: {
        equivision: {
          description: 'AI-powered portfolio optimization using zoning analysis data',
          features: [
            'Real-time portfolio optimization',
            'Zone-based allocation',
            'Risk-adjusted returns',
            'Fund performance tracking'
          ],
          strengths: [
            'Real-time processing',
            'Zone-weighted optimization',
            'Traffic light integration',
            'Dynamic rebalancing'
          ],
          limitations: [
            'Complex calculations',
            'High infrastructure needs',
            'Regular updates required'
          ]
        },
        xgboost: {
          description: 'Gradient boosting for portfolio management',
          features: [
            'Return prediction',
            'Risk assessment',
            'Allocation optimization',
            'Performance tracking'
          ],
          strengths: [
            'Fast calculations',
            'Clear decision logic',
            'Efficient processing',
            'Regular updates'
          ],
          limitations: [
            'Limited unstructured data',
            'Needs clean data',
            'Regular retraining'
          ]
        },
        'random-forest': {
          description: 'Ensemble learning for portfolio optimization',
          features: [
            'Multi-factor analysis',
            'Risk modeling',
            'Return prediction',
            'Allocation strategy'
          ],
          strengths: [
            'Robust predictions',
            'Feature importance',
            'Handles complexity',
            'Stable results'
          ],
          limitations: [
            'Memory intensive',
            'Update frequency',
            'Configuration needs'
          ]
        },
        gpt4: {
          description: 'LLM for strategic portfolio management',
          features: [
            'Strategy development',
            'Market analysis',
            'Risk assessment',
            'Opportunity detection'
          ],
          strengths: [
            'Strategic insights',
            'Market understanding',
            'Flexible analysis',
            'Pattern recognition'
          ],
          limitations: [
            'Processing time',
            'Resource usage',
            'Complex setup'
          ]
        },
        grok: {
          description: 'Real-time portfolio optimization AI',
          features: [
            'Instant analysis',
            'Dynamic allocation',
            'Real-time tracking',
            'Quick adjustments'
          ],
          strengths: [
            'Speed',
            'Adaptability',
            'Pattern detection',
            'Real-time updates'
          ],
          limitations: [
            'New technology',
            'Validation needed',
            'Resource heavy'
          ]
        },
        hybrid: {
          description: 'Advanced ensemble for portfolio management',
          features: [
            'Multi-model optimization',
            'Comprehensive analysis',
            'Risk management',
            'Return optimization'
          ],
          strengths: [
            'High accuracy',
            'Multiple perspectives',
            'Robust decisions',
            'Balanced approach'
          ],
          limitations: [
            'Setup complexity',
            'Resource demands',
            'Regular calibration'
          ]
        }
      }
    };

    return content[category][model.id as keyof typeof content[typeof category]] || {
      description: model.description,
      features: model.features,
      strengths: model.strengths,
      limitations: model.limitations
    };
  };

  const renderPerformanceMetric = (label: string, value: number, model: ModelOption) => (
    <div className="bg-white border border-gray-200 p-6 relative">
      {model.id === 'equivision' ? (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-gray-900 animate-spin" />
        </div>
      ) : null}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-900">
          {label}
          {model.id !== 'equivision' && model.id !== 'gpt4' && (
            <span className="ml-2 text-xs text-gray-500">(Predicted)</span>
          )}
        </h3>
        <LineChart className="h-5 w-5 text-gray-600" />
      </div>
      <div className={`text-3xl font-bold mb-2 ${
        model.id !== 'equivision' && model.id !== 'gpt4' ? 'text-gray-400' : 'text-gray-900'
      }`}>
        {(value * 100).toFixed(1)}%
      </div>
      <div className="w-full bg-gray-100 h-1.5">
        <div 
          className={`h-1.5 transition-all duration-500 ${
            model.id === 'equivision' ? 'bg-gray-900' : 
            model.id === 'gpt4' ? 'bg-blue-600' :
            'bg-gray-400'
          }`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
      {model.id === 'equivision' && (
        <div className="mt-2 text-xs text-gray-500">
          Target performance based on market-specific training
        </div>
      )}
    </div>
  );

  // Error display component
  const ErrorDisplay = ({ message }: { message: string }) => (
    <div className="border border-red-200 bg-red-50 p-4 rounded-sm">
      <div className="flex items-center gap-2 text-red-600">
        <AlertTriangle className="h-5 w-5" />
        <p>{message}</p>
      </div>
    </div>
  );

  // Filter models based on category
  const getFilteredModels = () => {
    const models = MODEL_OPTIONS.filter(model => 
      ['gpt4', 'equivision', 'xgboost', 'random-forest', 'grok', 'hybrid'].includes(model.id)
    );
    
    // Reorder to put GPT-4 first
    return models.sort((a, b) => {
      if (a.id === 'gpt4') return -1;
      if (b.id === 'gpt4') return 1;
      return 0;
    });
  };

  // Update DataFlowVisual to use real data
  const DataFlowVisual = () => {
    const [dataFlows, setDataFlows] = useState({
      proptrack: { count: 0, loading: true },
      financial: { count: 0, loading: true },
      market: { count: 0, loading: true }
    });

    useEffect(() => {
      const fetchDataFlows = async () => {
        try {
          // Get ML system status for real data
          const mlStatus = await getMLSystemStatus();
          const pipelineData = await fetch('/api/pipeline/metrics').then(res => res.json());
          
          setDataFlows({
            proptrack: { 
              count: mlStatus.dataPoints.last24h, 
              loading: false 
            },
            financial: { 
              count: pipelineData.totalPipelineVolume || 0, 
              loading: false 
            },
            market: { 
              count: mlStatus.dataPoints.newProperties, 
              loading: false 
            }
          });
        } catch (error) {
          console.error('Failed to fetch data flows:', error);
        }
      };

      fetchDataFlows();
      const interval = setInterval(fetchDataFlows, 300000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="bg-white border border-gray-200 p-6 rounded-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Real-time Data Flow</h4>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Updating every 5 minutes</span>
            <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
          </div>
        </div>
        <div className="space-y-4">
          {Object.entries(dataFlows).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {key.charAt(0).toUpperCase() + key.slice(1)} Data
              </span>
              <div className="w-2/3 bg-gray-100 h-2">
                {value.loading ? (
                  <div className="animate-pulse bg-gray-200 h-2 w-full" />
                ) : (
                  <div 
                    className={`h-2 ${
                      key === 'proptrack' ? 'bg-green-500' :
                      key === 'financial' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} 
                    style={{ 
                      width: `${(value.count / (key === 'proptrack' ? 500000 : key === 'financial' ? 200000 : 65000)) * 100}%` 
                    }} 
                  />
                )}
              </div>
              <span className="text-sm text-gray-600">
                {value.loading ? '...' : `${(value.count / 1000).toFixed(0)}K/day`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Update ProcessingMetrics to use real data
  const ProcessingMetrics = () => {
    const [metrics, setMetrics] = useState({
      dailyRecords: 0,
      latency: 0,
      errorRate: 0,
      uptime: 0,
      loading: true
    });

    useEffect(() => {
      const fetchMetrics = async () => {
        try {
          // Get real metrics from ML system status
          const mlStatus = await getMLSystemStatus();
          const pipelineData = await fetch('/api/pipeline/metrics').then(res => res.json());
          
          setMetrics({
            dailyRecords: mlStatus.dataPoints.total,
            latency: mlStatus.systemHealth.latency,
            errorRate: 100 - mlStatus.modelMetrics.accuracy,
            uptime: mlStatus.systemHealth.uptime,
            loading: false
          });
        } catch (error) {
          console.error('Failed to fetch processing metrics:', error);
        }
      };

      fetchMetrics();
      const interval = setInterval(fetchMetrics, 300000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="bg-white border border-gray-200 p-6 rounded-sm">
        <h4 className="font-semibold text-gray-900 mb-4">Processing Metrics</h4>
        <div className="grid grid-cols-2 gap-4">
          {metrics.loading ? (
            Array(4).fill(null).map((_, i) => (
              <div key={i} className="p-4 border border-gray-100">
                <div className="animate-pulse bg-gray-200 h-8 w-24 mb-2" />
                <div className="animate-pulse bg-gray-200 h-4 w-16" />
              </div>
            ))
          ) : (
            <>
              <div className="p-4 border border-gray-100">
                <div className="text-2xl font-bold text-gray-900">
                  {(metrics.dailyRecords / 1000).toFixed(0)}K
                </div>
                <div className="text-sm text-gray-600">Daily Records</div>
              </div>
              <div className="p-4 border border-gray-100">
                <div className="text-2xl font-bold text-gray-900">
                  {metrics.latency < 100 ? '<100ms' : `${metrics.latency}ms`}
                </div>
                <div className="text-sm text-gray-600">Latency</div>
              </div>
              <div className="p-4 border border-gray-100">
                <div className="text-2xl font-bold text-gray-900">
                  {metrics.errorRate < 1 ? '<1%' : `${metrics.errorRate}%`}
                </div>
                <div className="text-sm text-gray-600">Error Rate</div>
              </div>
              <div className="p-4 border border-gray-100">
                <div className="text-2xl font-bold text-gray-900">
                  {metrics.uptime.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // Update the model details section to be category-specific
  const getModelDetails = (model: ModelOption | null, category: 'zoning' | 'portfolio') => {
    if (!model) return {
      architecture: '',
      trainingData: '',
      validationMethod: '',
      errorAnalysis: '',
      computationalNeeds: '',
      updateFrequency: '',
      confidenceInterval: '',
      zoningLogic: null,
      trafficLightLogic: null
    };

    const baseDetails = {
      architecture: model.modelDetails.architecture,
      trainingData: model.modelDetails.trainingData,
      computationalNeeds: model.modelDetails.computationalNeeds,
      updateFrequency: model.modelDetails.updateFrequency,
      confidenceInterval: model.modelDetails.confidenceInterval
    };

    if (category === 'zoning') {
      return {
        ...baseDetails,
        validationMethod: 'Zone classification validation with historical data',
        errorAnalysis: 'Zone prediction error analysis and correction',
        zoningLogic: model.modelDetails.zoningLogic,
        trafficLightLogic: model.trafficLightLogic
      };
    } else {
      return {
        ...baseDetails,
        validationMethod: 'Portfolio performance validation with backtesting',
        errorAnalysis: 'Return prediction error analysis',
        portfolioMetrics: {
          returnPrediction: 'Risk-adjusted return forecasting',
          allocationStrategy: 'Dynamic portfolio rebalancing',
          riskManagement: 'Multi-factor risk assessment'
        }
      };
    }
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6 p-6 max-w-7xl mx-auto">
        {error && <ErrorDisplay message={error} />}

        {/* Category Selection */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setSelectedCategory('zoning')}
              className={`pb-4 relative ${
                selectedCategory === 'zoning'
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sydney Traffic Light Zoning
              {selectedCategory === 'zoning' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
            <button
              onClick={() => setSelectedCategory('portfolio')}
              className={`pb-4 relative ${
                selectedCategory === 'portfolio'
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Portfolio & Fund Management
              {selectedCategory === 'portfolio' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          </div>
        </div>

        {/* Current CIO Settings Summary */}
        <div className="bg-gray-50 border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Active CIO Settings</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Target IRR</p>
              <p className="font-medium">{cioSettings.targetIRR.min}% - {cioSettings.targetIRR.max}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fund Size</p>
              <p className="font-medium">${(cioSettings.fundSize.min / 1000000).toFixed(1)}M - ${(cioSettings.fundSize.max / 1000000).toFixed(1)}M</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Investment Strategy</p>
              <p className="font-medium">{cioSettings.investmentStrategy}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Risk Tolerance</p>
              <p className="font-medium capitalize">{cioSettings.riskTolerance}</p>
            </div>
          </div>
        </div>

        {/* Data Processing Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataFlowVisual />
          <ProcessingMetrics />
        </div>

        {/* Category Description */}
        <div className="bg-gray-50 border border-gray-200 p-4">
          <p className="text-gray-600">
            {selectedCategory === 'zoning' 
              ? 'Models specialized in analyzing and classifying Sydney suburbs into growth zones based on multiple data points and market indicators. Processes 765K records daily with sub-100ms latency.'
              : 'Models focused on optimizing portfolio performance and fund allocation based on target IRR (8-14.7%), fund size ($5M-$50M), and risk tolerance. Real-time processing of financial data streams.'}
          </p>
        </div>

        {/* Model Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {getFilteredModels().map((model) => {
            const categoryContent = getModelContent(model, selectedCategory);
            const isGPT4 = model.id === 'gpt4';
            const modelConnected = getConnectionStatus(model.id);
            
            return (
              <button
                key={`${model.id}-${selectedCategory}`}
                onClick={() => handleModelSelect(model)}
                disabled={!modelConnected}
                className={`p-6 transition-all relative ${
                  selectedModel?.id === model.id
                    ? 'bg-gray-900 text-white border-0'
                    : 'bg-white border border-gray-200 hover:border-gray-300'
                }`}
              >
                {modelStatus && modelStatus.modelConnections[model.id] === false && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs uppercase tracking-wider ${
                    selectedModel?.id === model.id
                      ? 'text-gray-300'
                      : model.type === 'production'
                      ? 'text-gray-700'
                      : 'text-gray-500'
                  }`}>
                    {model.type}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${
                      modelConnected ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <span className="text-xs text-gray-500">
                      {modelConnected ? 'Connected' : 'Not Connected'}
                    </span>
                  </div>
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  selectedModel?.id === model.id ? 'text-white' : 'text-gray-900'
                }`}>
                  {model.name}
                </h3>
                <p className={`text-sm line-clamp-2 ${
                  selectedModel?.id === model.id ? 'text-gray-300' : 'text-gray-600'
                } ${!isGPT4 ? 'opacity-50' : ''}`}>
                  {categoryContent.description}
                </p>
                <div className="mt-4 space-y-2">
                  {categoryContent.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className={`h-4 w-4 ${
                        selectedModel?.id === model.id ? 'text-gray-300' : 'text-gray-500'
                      }`} />
                      <span className={`${
                        selectedModel?.id === model.id ? 'text-gray-300' : 'text-gray-600'
                      } ${!isGPT4 ? 'opacity-50' : ''}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Model Details - Only show if a model is selected */}
        {selectedModel && (
          <div className="bg-white border border-gray-200">
            <div className="p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedModel.name}</h2>
                    <span className={`text-sm uppercase tracking-wider px-2 py-1 ${
                      selectedModel.type === 'post-production'
                        ? 'bg-gray-900 text-white'
                        : selectedModel.type === 'production'
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-yellow-50 text-yellow-800'
                    }`}>
                      {selectedModel.type}
                    </span>
                  </div>
                  <p className="text-base text-gray-600">
                    {getModelContent(selectedModel, selectedCategory).description}
                  </p>
                </div>
                <button
                  onClick={() => setShowExplanation(true)}
                  className="p-2 hover:bg-gray-50 rounded-full"
                >
                  <Info className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Metrics</h3>
                <p className="text-sm text-gray-600 mb-6">
                  {selectedCategory === 'zoning'
                    ? 'Accuracy in predicting growth zones and market movements'
                    : 'Performance in portfolio optimization and fund management'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(selectedModel.performance).map(([key, value]) => (
                    <div key={key} className={`bg-white border border-gray-200 p-6 relative ${
                      selectedModel.id !== 'gpt4' ? 'opacity-50' : ''
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-semibold text-gray-900">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </h3>
                        <LineChart className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="text-3xl font-bold mb-2 text-gray-900">
                        {(value * 100).toFixed(1)}%
                      </div>
                      <div className="w-full bg-gray-100 h-1.5">
                        <div 
                          className="h-1.5 bg-gray-900"
                          style={{ width: `${value * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features and Capabilities */}
              <div className={selectedModel.id !== 'gpt4' ? 'opacity-50' : ''}>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Features & Capabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Key Features</h4>
                    <ul className="space-y-3">
                      {getModelContent(selectedModel, selectedCategory).features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-gray-900 shrink-0 mt-0.5" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Strengths</h4>
                    <ul className="space-y-3">
                      {getModelContent(selectedModel, selectedCategory).strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <TrendingUp className="h-5 w-5 text-gray-900 shrink-0 mt-0.5" />
                          <span className="text-gray-600">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Limitations</h4>
                    <ul className="space-y-3">
                      {getModelContent(selectedModel, selectedCategory).limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-gray-900 shrink-0 mt-0.5" />
                          <span className="text-gray-600">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Model Details */}
              <div className={selectedModel.id !== 'gpt4' ? 'opacity-50' : ''}>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  {selectedCategory === 'zoning' ? 'Zoning Analysis Details' : 'Portfolio Management Details'}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Architecture</h4>
                      <p className="text-gray-600">{getModelDetails(selectedModel, selectedCategory).architecture}</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Training Data</h4>
                      <p className="text-gray-600">{getModelDetails(selectedModel, selectedCategory).trainingData}</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Validation Method</h4>
                      <p className="text-gray-600">{getModelDetails(selectedModel, selectedCategory).validationMethod}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {selectedCategory === 'zoning' ? 'Zone Classification' : 'Portfolio Optimization'}
                      </h4>
                      <p className="text-gray-600">
                        {selectedCategory === 'zoning' 
                          ? 'Traffic light system implementation with real-time updates'
                          : 'Risk-adjusted portfolio allocation with zone weighting'}
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Update Frequency</h4>
                      <p className="text-gray-600">{getModelDetails(selectedModel, selectedCategory).updateFrequency}</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Confidence Interval</h4>
                      <p className="text-gray-600">{getModelDetails(selectedModel, selectedCategory).confidenceInterval}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Traffic Light System Logic */}
              <div className={selectedModel.id !== 'gpt4' ? 'opacity-50' : ''}>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Sydney Traffic Light System Logic</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Adaptation</h4>
                    <p className="text-gray-600">{selectedModel.trafficLightLogic.adaptation}</p>
                  </div>
                  <div className="bg-white border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Implementation</h4>
                    <p className="text-gray-600">{selectedModel.trafficLightLogic.implementation}</p>
                  </div>
                  <div className="bg-white border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Example</h4>
                    <p className="text-gray-600">{selectedModel.trafficLightLogic.example}</p>
                  </div>
                </div>
              </div>

              {/* Data Processing Information */}
              <div className={selectedModel.id !== 'gpt4' ? 'opacity-50' : ''}>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Data Processing Factors</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-white border border-gray-200 p-6 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Micro Factors</h4>
                      <ul className="space-y-2">
                        {selectedModel.modelDetails.dataProcessing.microFactors.map((factor, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="mt-1.5">
                              <div className="h-1.5 w-1.5 bg-gray-900 rounded-full"></div>
                            </div>
                            <span className="text-gray-600">{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white border border-gray-200 p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Location Factors</h4>
                      <ul className="space-y-2">
                        {selectedModel.modelDetails.dataProcessing.locationFactors.map((factor, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="mt-1.5">
                              <div className="h-1.5 w-1.5 bg-gray-900 rounded-full"></div>
                            </div>
                            <span className="text-gray-600">{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="bg-white border border-gray-200 p-6 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Macro Factors</h4>
                      <ul className="space-y-2">
                        {selectedModel.modelDetails.dataProcessing.macroFactors.map((factor, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="mt-1.5">
                              <div className="h-1.5 w-1.5 bg-gray-900 rounded-full"></div>
                            </div>
                            <span className="text-gray-600">{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white border border-gray-200 p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Market Dynamics</h4>
                      <ul className="space-y-2">
                        {selectedModel.modelDetails.dataProcessing.marketDynamics.map((factor, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="mt-1.5">
                              <div className="h-1.5 w-1.5 bg-gray-900 rounded-full"></div>
                            </div>
                            <span className="text-gray-600">{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Model Explanation Modal - Only show if a model is selected */}
        {showExplanation && selectedModel && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-gray-200 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">How {selectedModel.name} Makes Decisions</h2>
                  <button 
                    onClick={() => setShowExplanation(false)}
                    className="p-2 hover:bg-gray-50"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {selectedModel.id === 'equivision' && (
                  <>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Predictive Analytics Architecture</h3>
                      <p className="text-gray-600">
                        EquiVision is being developed as a specialized AI model for the Australian real estate market:
                      </p>
                      <div className="mt-4 space-y-6">
                        <div className="border border-gray-200 p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <Building2 className="h-5 w-5 text-gray-900" />
                            <h4 className="font-semibold text-gray-900">Market Specialization</h4>
                          </div>
                          <p className="text-gray-600">Training focuses on Australian property market dynamics, local economic indicators, and regional growth patterns</p>
                        </div>
                        <div className="border border-gray-200 p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <Zap className="h-5 w-5 text-gray-900" />
                            <h4 className="font-semibold text-gray-900">Continuous Learning</h4>
                          </div>
                          <p className="text-gray-600">Adaptive learning system that improves with each market cycle and transaction</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Development Roadmap</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="h-2 w-2 bg-gray-900 rounded-full"></div>
                          <p className="text-gray-600">Phase 1: Initial training with historical Australian market data</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="h-2 w-2 bg-gray-900 rounded-full"></div>
                          <p className="text-gray-600">Phase 2: Integration with existing model insights</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="h-2 w-2 bg-gray-900 rounded-full"></div>
                          <p className="text-gray-600">Phase 3: Market-specific fine-tuning and optimization</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="h-2 w-2 bg-gray-900 rounded-full"></div>
                          <p className="text-gray-600">Phase 4: Real-time adaptation and performance monitoring</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedModel.id === 'claude' && (
                  <>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced Analysis Capabilities</h3>
                      <p className="text-gray-600">
                        Claude-3.5 Sonnet provides sophisticated market analysis through:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-600">
                        <li>Natural language understanding of market reports and trends</li>
                        <li>Complex pattern recognition in market data</li>
                        <li>Integration of multiple data sources for comprehensive analysis</li>
                        <li>Contextual understanding of market dynamics</li>
                      </ul>
                    </div>
                  </>
                )}

                {selectedModel.id === 'grok' && (
                  <>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-Time Market Analysis</h3>
                      <p className="text-gray-600">
                        Grok-3 will provide cutting-edge real-time analysis capabilities:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-600">
                        <li>Instant market trend detection and analysis</li>
                        <li>Real-time property valuation adjustments</li>
                        <li>Dynamic risk assessment and portfolio optimization</li>
                        <li>Automated market opportunity identification</li>
                      </ul>
                    </div>
                  </>
                )}

                {/* ... existing model content ... */}
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default MLModelSettings; 
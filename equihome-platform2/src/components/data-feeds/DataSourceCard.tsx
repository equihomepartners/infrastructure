import React, { useState } from 'react';
import { Database, Rss, Globe, Newspaper, CheckCircle, AlertTriangle, XCircle, Settings, Brain } from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  type: 'api' | 'database' | 'feed' | 'news' | 'ml';
  status: 'active' | 'inactive' | 'error';
  lastUpdate: Date;
  frequency: string;
  dataPoints: number;
  description: string;
  mlAnalysis?: {
    zoneClassification: 'green' | 'yellow' | 'red';
    confidence: number;
    reasoning: string;
    risks: string[];
    opportunities: string[];
    recommendations: string[];
    marketInsights?: {
      pricePosition: 'above' | 'below' | 'at' | 'unknown';
      growthPotential: number;
      investmentGrade: 'A' | 'B' | 'C' | 'D';
      suburbTrend: 'rising' | 'stable' | 'declining';
    };
  };
}

interface ModelOption {
  value: 'gpt4' | 'xgboost' | 'randomforest' | 'hybrid';
  label: string;
  description: string;
  isProduction: boolean;
}

const MODEL_OPTIONS: ModelOption[] = [
  {
    value: 'gpt4',
    label: 'GPT-4',
    description: 'Testing - Natural language analysis',
    isProduction: false
  },
  {
    value: 'xgboost',
    label: 'XGBoost',
    description: 'Production - Gradient Boosting for precise predictions',
    isProduction: true
  },
  {
    value: 'randomforest',
    label: 'Random Forest',
    description: 'Production - Interpretable ensemble model',
    isProduction: true
  },
  {
    value: 'hybrid',
    label: 'Hybrid',
    description: 'Production - Combined model approach',
    isProduction: true
  }
];

interface Props {
  source: DataSource;
  onModelChange?: (model: string) => void;
}

const DataSourceCard: React.FC<Props> = ({ source, onModelChange }) => {
  const [selectedModel, setSelectedModel] = useState<ModelOption>(MODEL_OPTIONS[0]);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);

  const handleModelChange = (model: ModelOption) => {
    setSelectedModel(model);
    setIsModelMenuOpen(false);
    onModelChange?.(model.value);
  };

  const getIcon = () => {
    switch (source.type) {
      case 'api':
        return <Globe className="h-6 w-6 text-blue-600" />;
      case 'database':
        return <Database className="h-6 w-6 text-purple-600" />;
      case 'feed':
        return <Rss className="h-6 w-6 text-orange-600" />;
      case 'news':
        return <Newspaper className="h-6 w-6 text-green-600" />;
      case 'ml':
        return <Brain className="h-6 w-6 text-indigo-600" />;
    }
  };

  const getStatusIcon = () => {
    switch (source.status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-gray-400" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusColor = () => {
    switch (source.status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
    }
  };

  const getZoneColor = (zone: string) => {
    switch (zone) {
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800';
      case 'red':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          {getIcon()}
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-900">{source.name}</h3>
            <p className="text-sm text-gray-600">{source.type.toUpperCase()}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <p className="text-gray-600 mb-4">{source.description}</p>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status</span>
          <div className="flex items-center">
            {getStatusIcon()}
            <span className={`ml-1 text-sm px-2 py-1 rounded-full ${getStatusColor()}`}>
              {source.status}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Update Frequency</span>
          <span className="text-sm font-medium">{source.frequency}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Data Points</span>
          <span className="text-sm font-medium">
            {source.dataPoints.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Last Update</span>
          <span className="text-sm font-medium">
            {source.lastUpdate.toLocaleTimeString()}
          </span>
        </div>

        {source.mlAnalysis && (
          <>
            <div className="border-t pt-3 mt-3">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-900">ML Analysis</h4>
                <div className="relative">
                  <button
                    onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                    className="text-sm border rounded-md px-3 py-1.5 bg-white flex items-center gap-2 hover:bg-gray-50"
                  >
                    <span className={selectedModel.isProduction ? 'text-green-600' : 'text-blue-600'}>
                      {selectedModel.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      {selectedModel.isProduction ? '(Production)' : '(Testing)'}
                    </span>
                  </button>

                  {isModelMenuOpen && (
                    <div className="absolute right-0 mt-1 w-64 bg-white border rounded-md shadow-lg z-10">
                      {MODEL_OPTIONS.map((model) => (
                        <button
                          key={model.value}
                          onClick={() => handleModelChange(model)}
                          className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                            selectedModel.value === model.value ? 'bg-gray-50' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{model.label}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              model.isProduction ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {model.isProduction ? 'Production' : 'Testing'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{model.description}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Zone Classification</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${getZoneColor(source.mlAnalysis.zoneClassification)}`}>
                    {source.mlAnalysis.zoneClassification.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Confidence</span>
                  <span className="text-sm font-medium">
                    {(source.mlAnalysis.confidence * 100).toFixed(1)}%
                  </span>
                </div>

                {source.mlAnalysis.marketInsights && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Investment Grade</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        source.mlAnalysis.marketInsights.investmentGrade === 'A' ? 'bg-green-100 text-green-800' :
                        source.mlAnalysis.marketInsights.investmentGrade === 'B' ? 'bg-blue-100 text-blue-800' :
                        source.mlAnalysis.marketInsights.investmentGrade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        Grade {source.mlAnalysis.marketInsights.investmentGrade}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Market Position</span>
                      <span className="text-sm font-medium">
                        {source.mlAnalysis.marketInsights.pricePosition.charAt(0).toUpperCase() + 
                         source.mlAnalysis.marketInsights.pricePosition.slice(1)} Market
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Growth Potential</span>
                      <span className="text-sm font-medium">
                        {(source.mlAnalysis.marketInsights.growthPotential * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Suburb Trend</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        source.mlAnalysis.marketInsights.suburbTrend === 'rising' ? 'bg-green-100 text-green-800' :
                        source.mlAnalysis.marketInsights.suburbTrend === 'stable' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {source.mlAnalysis.marketInsights.suburbTrend.charAt(0).toUpperCase() + 
                         source.mlAnalysis.marketInsights.suburbTrend.slice(1)}
                      </span>
                    </div>
                  </>
                )}

                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-1">Analysis:</p>
                  <p className="text-gray-700">{source.mlAnalysis.reasoning}</p>
                </div>

                {source.mlAnalysis.risks.length > 0 && (
                  <div className="text-sm">
                    <p className="text-gray-600 font-medium mb-1">Key Risks:</p>
                    <ul className="list-disc list-inside text-red-600 text-sm">
                      {source.mlAnalysis.risks.map((risk, index) => (
                        <li key={index}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {source.mlAnalysis.opportunities.length > 0 && (
                  <div className="text-sm">
                    <p className="text-gray-600 font-medium mb-1">Opportunities:</p>
                    <ul className="list-disc list-inside text-green-600 text-sm">
                      {source.mlAnalysis.opportunities.map((opp, index) => (
                        <li key={index}>{opp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {source.mlAnalysis.recommendations.length > 0 && (
                  <div className="text-sm">
                    <p className="text-gray-600 font-medium mb-1">Recommendations:</p>
                    <ul className="list-disc list-inside text-blue-600 text-sm">
                      {source.mlAnalysis.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DataSourceCard; 
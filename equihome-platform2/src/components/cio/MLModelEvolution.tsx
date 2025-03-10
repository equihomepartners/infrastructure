import React from 'react';
import { Brain, TrendingUp, Database } from 'lucide-react';

interface ModelEvolution {
  version: string;
  date: Date;
  improvements: string[];
  accuracy: number;
  dataPoints: number;
}

interface MLModelEvolutionProps {
  analysis: any | null;
  isLoading?: boolean;
}

const modelHistory: ModelEvolution[] = [
  {
    version: '3.2.1',
    date: new Date('2024-03-15'),
    improvements: [
      'Enhanced suburb clustering algorithm',
      'Improved risk assessment for premium properties',
      'Real-time market sentiment analysis'
    ],
    accuracy: 94.3,
    dataPoints: 1243567
  },
  {
    version: '3.1.0',
    date: new Date('2024-02-01'),
    improvements: [
      'Integration with PropTrack API',
      'Advanced demographic analysis',
      'Infrastructure development tracking'
    ],
    accuracy: 92.8,
    dataPoints: 1150000
  },
  {
    version: '3.0.0',
    date: new Date('2024-01-15'),
    improvements: [
      'Complete model architecture redesign',
      'Multi-factor risk assessment',
      'Historical trend analysis'
    ],
    accuracy: 91.5,
    dataPoints: 980000
  }
];

const MLModelEvolution: React.FC<MLModelEvolutionProps> = ({ analysis, isLoading = false }) => {
  return (
    <div className="bg-white border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">ML Model Evolution</h3>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Brain className="h-4 w-4 text-blue-600" />
            <span className="text-sm">Current Version: {modelHistory[0].version}</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm">Accuracy: {modelHistory[0].accuracy}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {modelHistory.map((version, index) => (
          <div key={version.version} className="relative">
            {index !== modelHistory.length - 1 && (
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200" />
            )}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Brain className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Version {version.version}</span>
                    <span className="text-sm text-gray-500">
                      {version.date.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{version.accuracy}%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Database className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{(version.dataPoints / 1000000).toFixed(1)}M points</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {version.improvements.map((improvement, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span className="text-sm text-gray-600">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MLModelEvolution; 
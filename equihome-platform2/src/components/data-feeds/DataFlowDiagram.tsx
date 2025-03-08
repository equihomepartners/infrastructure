import React from 'react';
import { Database, Brain, LineChart, ArrowRight } from 'lucide-react';

const DataFlowDiagram: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Data Flow Architecture</h2>
      
      <div className="relative">
        {/* Data Flow Steps */}
        <div className="grid grid-cols-4 gap-6">
          {/* Data Sources */}
          <div className="text-center">
            <div className="bg-blue-50 p-4 rounded-lg mb-3">
              <Database className="h-8 w-8 text-blue-600 mx-auto" />
              <h3 className="font-medium text-blue-900 mt-2">Data Sources</h3>
            </div>
            <div className="text-sm text-gray-600">
              Multiple data feeds and APIs
            </div>
          </div>

          {/* Data Processing */}
          <div className="text-center">
            <div className="bg-purple-50 p-4 rounded-lg mb-3">
              <Brain className="h-8 w-8 text-purple-600 mx-auto" />
              <h3 className="font-medium text-purple-900 mt-2">ML Processing</h3>
            </div>
            <div className="text-sm text-gray-600">
              Real-time data analysis
            </div>
          </div>

          {/* Data Storage */}
          <div className="text-center">
            <div className="bg-green-50 p-4 rounded-lg mb-3">
              <Database className="h-8 w-8 text-green-600 mx-auto" />
              <h3 className="font-medium text-green-900 mt-2">Data Lake</h3>
            </div>
            <div className="text-sm text-gray-600">
              Structured storage
            </div>
          </div>

          {/* Analytics */}
          <div className="text-center">
            <div className="bg-orange-50 p-4 rounded-lg mb-3">
              <LineChart className="h-8 w-8 text-orange-600 mx-auto" />
              <h3 className="font-medium text-orange-900 mt-2">Analytics</h3>
            </div>
            <div className="text-sm text-gray-600">
              Insights generation
            </div>
          </div>
        </div>

        {/* Connecting Arrows */}
        <div className="absolute top-1/2 left-0 w-full -mt-2 z-0">
          <div className="flex justify-between items-center">
            <ArrowRight className="h-6 w-6 text-gray-400 transform translate-x-[90px]" />
            <ArrowRight className="h-6 w-6 text-gray-400 transform translate-x-[90px]" />
            <ArrowRight className="h-6 w-6 text-gray-400 transform translate-x-[90px]" />
          </div>
        </div>
      </div>

      {/* Processing Details */}
      <div className="grid grid-cols-4 gap-6 mt-8">
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Input Sources</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• PropTrack API</li>
            <li>• CoreLogic Data</li>
            <li>• ABS Feed</li>
            <li>• News APIs</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">ML Processing</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Data Cleaning</li>
            <li>• Feature Extraction</li>
            <li>• Pattern Recognition</li>
            <li>• Anomaly Detection</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Data Storage</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Raw Data Lake</li>
            <li>• Processed Data</li>
            <li>• ML Models</li>
            <li>• Analytics Cache</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Output</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Market Insights</li>
            <li>• Risk Analysis</li>
            <li>• Growth Forecasts</li>
            <li>• Investment Signals</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DataFlowDiagram; 
import React from 'react';
import { Database, Brain, LineChart, ArrowRight, Cloud, Server, AlertTriangle } from 'lucide-react';

const DataFlowDiagram: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Data Flow Architecture</h2>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Test Mode
          </span>
        </div>
      </div>
      
      <div className="relative">
        {/* Current Architecture */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Current Implementation (Test Mode)</h3>
          <div className="grid grid-cols-3 gap-6">
            {/* Property Feed Service */}
            <div className="text-center">
              <div className="bg-blue-50 p-4 rounded-lg mb-3">
                <Server className="h-8 w-8 text-blue-600 mx-auto" />
                <h3 className="font-medium text-blue-900 mt-2">Property Feed Service</h3>
              </div>
              <div className="text-sm text-gray-600">
                Generating test data
              </div>
            </div>

            {/* Redis */}
            <div className="text-center">
              <div className="bg-red-50 p-4 rounded-lg mb-3">
                <Database className="h-8 w-8 text-red-600 mx-auto" />
                <h3 className="font-medium text-red-900 mt-2">Redis Channels</h3>
              </div>
              <div className="text-sm text-gray-600">
                Message broker (pub/sub)
              </div>
            </div>

            {/* Frontend */}
            <div className="text-center">
              <div className="bg-green-50 p-4 rounded-lg mb-3">
                <LineChart className="h-8 w-8 text-green-600 mx-auto" />
                <h3 className="font-medium text-green-900 mt-2">Frontend</h3>
              </div>
              <div className="text-sm text-gray-600">
                Real-time display
              </div>
            </div>
          </div>

          {/* Connecting Arrows */}
          <div className="absolute top-[25%] left-0 w-full -mt-2 z-0">
            <div className="flex justify-between items-center">
              <ArrowRight className="h-6 w-6 text-gray-400 transform translate-x-[90px]" />
              <ArrowRight className="h-6 w-6 text-gray-400 transform translate-x-[90px]" />
            </div>
          </div>
        </div>

        {/* Planned Architecture */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Planned Architecture</h3>
          <div className="grid grid-cols-5 gap-6">
            {/* External Sources */}
            <div className="text-center">
              <div className="bg-purple-50 p-4 rounded-lg mb-3">
                <Cloud className="h-8 w-8 text-purple-600 mx-auto" />
                <h3 className="font-medium text-purple-900 mt-2">External Sources</h3>
              </div>
              <div className="text-sm text-gray-600">
                Real data providers
              </div>
            </div>

            {/* Data Lake */}
            <div className="text-center">
              <div className="bg-indigo-50 p-4 rounded-lg mb-3">
                <Database className="h-8 w-8 text-indigo-600 mx-auto" />
                <h3 className="font-medium text-indigo-900 mt-2">Data Lake</h3>
              </div>
              <div className="text-sm text-gray-600">
                Permanent storage
              </div>
            </div>

            {/* Property Feed Service */}
            <div className="text-center">
              <div className="bg-blue-50 p-4 rounded-lg mb-3">
                <Server className="h-8 w-8 text-blue-600 mx-auto" />
                <h3 className="font-medium text-blue-900 mt-2">Property Feed</h3>
              </div>
              <div className="text-sm text-gray-600">
                Processing & updates
              </div>
            </div>

            {/* Redis */}
            <div className="text-center">
              <div className="bg-red-50 p-4 rounded-lg mb-3">
                <Database className="h-8 w-8 text-red-600 mx-auto" />
                <h3 className="font-medium text-red-900 mt-2">Redis</h3>
              </div>
              <div className="text-sm text-gray-600">
                Real-time messaging
              </div>
            </div>

            {/* Frontend */}
            <div className="text-center">
              <div className="bg-green-50 p-4 rounded-lg mb-3">
                <LineChart className="h-8 w-8 text-green-600 mx-auto" />
                <h3 className="font-medium text-green-900 mt-2">Frontend</h3>
              </div>
              <div className="text-sm text-gray-600">
                Real-time display
              </div>
            </div>
          </div>

          {/* Connecting Arrows */}
          <div className="absolute top-[75%] left-0 w-full -mt-2 z-0">
            <div className="flex justify-between items-center">
              <ArrowRight className="h-6 w-6 text-gray-400 transform translate-x-[90px]" />
              <ArrowRight className="h-6 w-6 text-gray-400 transform translate-x-[90px]" />
              <ArrowRight className="h-6 w-6 text-gray-400 transform translate-x-[90px]" />
              <ArrowRight className="h-6 w-6 text-gray-400 transform translate-x-[90px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Details */}
      <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t">
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Current Implementation</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Test data generation every 5 minutes</li>
            <li>• Redis pub/sub for message passing</li>
            <li>• WebSocket real-time updates</li>
            <li>• No permanent storage</li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-2">Planned Features</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Integration with real data providers</li>
            <li>• Data Lake for historical data</li>
            <li>• Data validation and cleaning</li>
            <li>• Analytics and ML processing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DataFlowDiagram; 
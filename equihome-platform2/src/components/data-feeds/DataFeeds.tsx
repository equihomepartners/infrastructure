import React, { useState } from 'react';
import { Database, Plus, RefreshCw, AlertTriangle, CheckCircle, Brain, LineChart, Newspaper, Rss } from 'lucide-react';
import DataSourceCard from './DataSourceCard';
import DataFlowDiagram from './DataFlowDiagram';

interface DataSource {
  id: string;
  name: string;
  type: 'api' | 'database' | 'feed' | 'news';
  status: 'active' | 'inactive' | 'error';
  lastUpdate: Date;
  frequency: string;
  dataPoints: number;
  description: string;
}

const DataFeeds: React.FC = () => {
  const [showAddSource, setShowAddSource] = useState(false);
  
  // Sample data sources
  const dataSources: DataSource[] = [
    {
      id: '1',
      name: 'PropTrack API',
      type: 'api',
      status: 'active',
      lastUpdate: new Date(),
      frequency: 'Real-time',
      dataPoints: 1250000,
      description: 'Real-time property data and market analytics'
    },
    {
      id: '2',
      name: 'CoreLogic Database',
      type: 'database',
      status: 'active',
      lastUpdate: new Date(),
      frequency: 'Daily',
      dataPoints: 2500000,
      description: 'Historical property data and market trends'
    },
    {
      id: '3',
      name: 'ABS Economic Feed',
      type: 'feed',
      status: 'active',
      lastUpdate: new Date(),
      frequency: 'Monthly',
      dataPoints: 50000,
      description: 'Economic indicators and demographic data'
    },
    {
      id: '4',
      name: 'Property News Aggregator',
      type: 'news',
      status: 'active',
      lastUpdate: new Date(),
      frequency: 'Hourly',
      dataPoints: 75000,
      description: 'Real estate news and market sentiment analysis'
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Data Feed Management</h1>
            <p className="mt-2 text-lg text-gray-600">
              Monitor and manage AI/ML data sources and integrations
            </p>
          </div>
          <button
            onClick={() => setShowAddSource(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Data Source
          </button>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Active Sources</h3>
            <Database className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {dataSources.filter(s => s.status === 'active').length}
          </div>
          <p className="text-sm text-gray-600">Connected data sources</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Total Data Points</h3>
            <Brain className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            {(dataSources.reduce((sum, source) => sum + source.dataPoints, 0) / 1000000).toFixed(1)}M
          </div>
          <p className="text-sm text-gray-600">Processed daily</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Update Frequency</h3>
            <RefreshCw className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600">Real-time</div>
          <p className="text-sm text-gray-600">Average refresh rate</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">System Health</h3>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">98.9%</div>
          <p className="text-sm text-gray-600">Overall uptime</p>
        </div>
      </div>

      {/* Data Flow Visualization */}
      <div className="mb-8">
        <DataFlowDiagram />
      </div>

      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataSources.map(source => (
          <DataSourceCard key={source.id} source={source} />
        ))}
      </div>
    </div>
  );
};

export default DataFeeds; 
import React, { useState, useEffect } from 'react';
import { Database, Plus, RefreshCw, AlertTriangle, CheckCircle, Brain, LineChart, Newspaper, Rss, X } from 'lucide-react';
import DataSourceCard from './DataSourceCard';
import DataFlowDiagram from './DataFlowDiagram';
import useWebSocket from './hooks/useWebSocket';

interface MLAnalysis {
  zoneClassification: 'green' | 'yellow' | 'red';
  confidence: number;
  reasoning: string;
  risks: string[];
  opportunities: string[];
  recommendations: string[];
}

interface DataSource {
  id: string;
  name: string;
  type: 'api' | 'database' | 'feed' | 'news' | 'ml';
  status: 'active' | 'inactive' | 'error';
  lastUpdate: Date;
  frequency: string;
  dataPoints: number;
  description: string;
  mlAnalysis?: MLAnalysis;
}

const DataFeeds: React.FC = () => {
  const [showAddSource, setShowAddSource] = useState(false);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [systemStatus, setSystemStatus] = useState({
    activeSources: 0,
    totalDataPoints: 0,
    updateFrequency: 'Real-time',
    systemHealth: '98.9%'
  });
  const [newSource, setNewSource] = useState({
    name: '',
    type: 'api' as const,
    frequency: '',
    description: ''
  });

  // Initialize WebSocket connection
  const { lastMessage, connectionStatus } = useWebSocket('ws://localhost:3006');

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (lastMessage) {
      try {
        const data = JSON.parse(lastMessage);
        
        // Update data sources based on message type
        switch (data.type) {
          case 'property':
            updateDataSource('Property Feed Service', data);
            break;
          case 'market':
            updateDataSource('Market Data Service', data);
            break;
          case 'infrastructure':
            updateDataSource('Infrastructure Updates', data);
            break;
          case 'ml-analysis':
            updateMLAnalysis(data);
            break;
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    }
  }, [lastMessage]);

  // Update individual data source
  const updateDataSource = (name: string, data: any) => {
    setDataSources(prev => {
      const index = prev.findIndex(source => source.name === name);
      if (index === -1) return prev;

      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        lastUpdate: new Date(),
        status: 'active',
        dataPoints: updated[index].dataPoints + 1
      };
      return updated;
    });
  };

  // Update ML analysis for a property
  const updateMLAnalysis = (data: any) => {
    setDataSources(prev => {
      const updated = [...prev];
      
      // Find or create ML Analysis source
      let mlSourceIndex = updated.findIndex(source => source.name === 'ML Analysis Service');
      
      if (mlSourceIndex === -1) {
        // Add ML Analysis source if it doesn't exist
        updated.push({
          id: (updated.length + 1).toString(),
          name: 'ML Analysis Service',
          type: 'ml',
          status: 'active',
          lastUpdate: new Date(),
          frequency: 'Real-time',
          dataPoints: 0,
          description: 'GPT-4 powered property analysis and zone classification',
          mlAnalysis: data.analysis
        });
        mlSourceIndex = updated.length - 1;
      } else {
        // Update existing ML Analysis source
        updated[mlSourceIndex] = {
          ...updated[mlSourceIndex],
          status: 'active',
          lastUpdate: new Date(),
          dataPoints: updated[mlSourceIndex].dataPoints + 1,
          mlAnalysis: data.analysis
        };
      }
      
      return updated;
    });
  };

  const handleAddSource = () => {
    const newDataSource: DataSource = {
      id: (dataSources.length + 1).toString(),
      name: newSource.name,
      type: newSource.type,
      status: 'inactive',
      lastUpdate: new Date(),
      frequency: newSource.frequency,
      dataPoints: 0,
      description: newSource.description
    };

    setDataSources(prev => [...prev, newDataSource]);
    setShowAddSource(false);
    setNewSource({ name: '', type: 'api', frequency: '', description: '' });
  };

  // Initialize data sources with real services
  useEffect(() => {
    setDataSources([
      {
        id: '1',
        name: 'Property Feed Service',
        type: 'feed',
        status: connectionStatus === 'connected' ? 'active' : 'error',
        lastUpdate: new Date(),
        frequency: '5 minutes',
        dataPoints: 0,
        description: 'Real-time property updates from our internal feed service'
      },
      {
        id: '2',
        name: 'Market Data Service',
        type: 'database',
        status: connectionStatus === 'connected' ? 'active' : 'error',
        lastUpdate: new Date(),
        frequency: 'Hourly',
        dataPoints: 0,
        description: 'Market trends and analytics data'
      },
      {
        id: '3',
        name: 'Infrastructure Updates',
        type: 'feed',
        status: connectionStatus === 'connected' ? 'active' : 'error',
        lastUpdate: new Date(),
        frequency: 'Daily',
        dataPoints: 0,
        description: 'Infrastructure and development project updates'
      },
      {
        id: '4',
        name: 'ML Analysis Service',
        type: 'ml',
        status: connectionStatus === 'connected' ? 'active' : 'error',
        lastUpdate: new Date(),
        frequency: 'Real-time',
        dataPoints: 0,
        description: 'GPT-4 powered property analysis and zone classification'
      }
    ]);
  }, [connectionStatus]);

  // Update system status
  useEffect(() => {
    const activeCount = dataSources.filter(s => s.status === 'active').length;
    const totalPoints = dataSources.reduce((sum, source) => sum + source.dataPoints, 0);

    setSystemStatus(prev => ({
      ...prev,
      activeSources: activeCount,
      totalDataPoints: totalPoints,
      updateFrequency: activeCount > 0 ? '5 min - Daily' : 'N/A',
      systemHealth: connectionStatus === 'connected' ? '100%' : '0%'
    }));
  }, [dataSources, connectionStatus]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Technical Settings</h1>
            <p className="mt-2 text-lg text-gray-600">
              Configure AI/ML models and data integrations
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

      {/* Add Source Modal */}
      {showAddSource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Data Source</h3>
              <button onClick={() => setShowAddSource(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newSource.name}
                  onChange={(e) => setNewSource(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={newSource.type}
                  onChange={(e) => setNewSource(prev => ({ ...prev, type: e.target.value as any }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="api">API</option>
                  <option value="database">Database</option>
                  <option value="feed">Feed</option>
                  <option value="news">News</option>
                  <option value="ml">ML</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Update Frequency</label>
                <input
                  type="text"
                  value={newSource.frequency}
                  onChange={(e) => setNewSource(prev => ({ ...prev, frequency: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Real-time, Hourly, Daily"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newSource.description}
                  onChange={(e) => setNewSource(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddSource(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSource}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={!newSource.name || !newSource.frequency || !newSource.description}
                >
                  Add Source
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Active Sources</h3>
            <Database className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {systemStatus.activeSources}
          </div>
          <p className="text-sm text-gray-600">Connected data sources</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Total Data Points</h3>
            <Brain className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            {(systemStatus.totalDataPoints / 1000000).toFixed(1)}M
          </div>
          <p className="text-sm text-gray-600">Processed in current session</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Update Frequency</h3>
            <RefreshCw className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600">{systemStatus.updateFrequency}</div>
          <p className="text-sm text-gray-600">Current refresh rates</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">System Health</h3>
            {connectionStatus === 'connected' ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-600" />
            )}
          </div>
          <div className="text-2xl font-bold text-green-600">{systemStatus.systemHealth}</div>
          <p className="text-sm text-gray-600">WebSocket connection status</p>
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
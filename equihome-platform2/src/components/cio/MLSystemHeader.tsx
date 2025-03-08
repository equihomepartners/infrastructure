import React, { useEffect, useState } from 'react';
import { getMLSystemStatus } from '../../services/mlAnalytics';
import { Activity, RefreshCw, Brain, AlertTriangle, Database, Zap } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

const MLSystemHeader: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState(getMLSystemStatus());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(getMLSystemStatus());
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-8">
      {/* System Status Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600 animate-pulse" />
              <span className="font-medium text-blue-800">ML System Active</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-gray-600">Processing {systemStatus.dataPoints.last24h.toLocaleString()} updates/day</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <RefreshCw className="h-4 w-4 text-blue-500" />
              <span>Last Update: {lastUpdate.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Response Time: {systemStatus.systemHealth.latency}ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-700">Model Performance</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              systemStatus.modelMetrics.accuracy > 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {systemStatus.modelMetrics.accuracy}% Accuracy
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Confidence Score</span>
            <span className="font-medium">{systemStatus.modelMetrics.confidence}%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-700">Data Processing</h3>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              Live
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">New Properties</span>
            <span className="font-medium text-green-600">+{systemStatus.dataPoints.newProperties}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-700">System Health</h3>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              {systemStatus.systemHealth.uptime}% Uptime
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Active Connections</span>
            <span className="font-medium">{Object.keys(systemStatus.integrations).length}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-700">Data Sources</h3>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              All Connected
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Total Data Points</span>
            <span className="font-medium">
              {formatNumber.compact(systemStatus.dataPoints.total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLSystemHeader; 
import React, { useEffect, useState } from 'react';
import { getMLSystemStatus, getUnderwritingIntegration } from '../../services/mlAnalytics';
import { Activity, RefreshCw, Brain, AlertTriangle, Database, Zap, Shield, CheckCircle } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

const MLSystemIntegration: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState(getMLSystemStatus());
  const [underwritingStatus, setUnderwritingStatus] = useState(getUnderwritingIntegration());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(getMLSystemStatus());
      setUnderwritingStatus(getUnderwritingIntegration());
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Real-time Status Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600 animate-pulse" />
              <span className="font-medium text-blue-800">ML System Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800">Underwriting Connected</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4 text-blue-500" />
              <span>Last Update: {lastUpdate.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Response Time: {systemStatus.systemHealth.latency}ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Metrics */}
      <div className="grid grid-cols-3 gap-6">
        {/* ML System Metrics */}
        <div className="bg-white rounded-lg border p-4">
          <h4 className="font-medium text-gray-900 mb-3">ML System Performance</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Model Accuracy</span>
                <span className="font-medium">{formatNumber.percentage(systemStatus.modelMetrics.accuracy)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${systemStatus.modelMetrics.accuracy}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Data Quality</span>
                <span className="font-medium">{formatNumber.percentage(systemStatus.modelMetrics.validationScore * 100)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${systemStatus.modelMetrics.validationScore * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Underwriting Integration */}
        <div className="bg-white rounded-lg border p-4">
          <h4 className="font-medium text-gray-900 mb-3">Underwriting Integration</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Automation Rate</span>
                <span className="font-medium">{formatNumber.percentage(underwritingStatus.automationRate)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${underwritingStatus.automationRate}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Processing Time</span>
                <span className="font-medium">{formatNumber.time(underwritingStatus.averageProcessingTime)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Updates */}
        <div className="bg-white rounded-lg border p-4">
          <h4 className="font-medium text-gray-900 mb-3">Real-time Activity</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Data Points Today</span>
              <span className="font-medium">{formatNumber.compact(systemStatus.dataPoints.last24h)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">New Properties</span>
              <span className="font-medium text-green-600">+{systemStatus.dataPoints.newProperties}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Assessments Today</span>
              <span className="font-medium text-blue-600">+{underwritingStatus.last24h}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Status */}
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(systemStatus.integrations).map(([source, status]) => (
          <div key={source} className="bg-white rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 capitalize">{source}</span>
              <span className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {status === 'connected' ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : (
                  <AlertTriangle className="h-3 w-3 mr-1" />
                )}
                {status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MLSystemIntegration; 
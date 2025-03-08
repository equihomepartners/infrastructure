import React, { useEffect, useState } from 'react';
import { getMLSystemStatus, getUnderwritingIntegration } from '../../services/mlAnalytics';
import { Activity, Database, Cpu, RefreshCw, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const MLSystemStatus: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState(getMLSystemStatus());
  const [underwritingStatus, setUnderwritingStatus] = useState(getUnderwritingIntegration());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(getMLSystemStatus());
      setUnderwritingStatus(getUnderwritingIntegration());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* System Health Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">ML System Operational</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">Last Update: {systemStatus.lastUpdate.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <RefreshCw className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">Next Update: {systemStatus.nextUpdate.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Metrics Grid */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Database className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Data Processing</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Data Points</span>
              <span className="font-medium">{systemStatus.dataPoints.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last 24h</span>
              <span className="font-medium text-green-600">+{systemStatus.dataPoints.last24h.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">New Properties</span>
              <span className="font-medium text-blue-600">+{systemStatus.dataPoints.newProperties}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Cpu className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold">Model Performance</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Accuracy</span>
              <span className="font-medium">{systemStatus.modelMetrics.accuracy}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Confidence</span>
              <span className="font-medium">{systemStatus.modelMetrics.confidence}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Validation</span>
              <span className="font-medium">{systemStatus.modelMetrics.validationScore}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Activity className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">System Health</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="font-medium text-green-600">
                {systemStatus.systemHealth.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Uptime</span>
              <span className="font-medium">{systemStatus.systemHealth.uptime}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Latency</span>
              <span className="font-medium">{systemStatus.systemHealth.latency}ms</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center space-x-2 mb-3">
            <RefreshCw className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold">Data Sources</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(systemStatus.integrations).map(([source, status]) => (
              <div key={source} className="flex justify-between items-center">
                <span className="text-gray-600">{source}</span>
                <span className={`flex items-center ${
                  status === 'connected' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {status === 'connected' ? (
                    <CheckCircle className="h-4 w-4 mr-1" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 mr-1" />
                  )}
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Underwriting Integration */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Underwriting Integration</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Assessments</span>
              <span className="font-medium">{underwritingStatus.totalAssessments}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last 24h</span>
              <span className="font-medium text-green-600">+{underwritingStatus.last24h}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Automation Rate</span>
              <span className="font-medium">{underwritingStatus.automationRate}%</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Risk Assessments</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Approved</span>
                <span className="text-green-600 font-medium">{underwritingStatus.riskAssessments.approved}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Flagged</span>
                <span className="text-yellow-600 font-medium">{underwritingStatus.riskAssessments.flaggedForReview}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rejected</span>
                <span className="text-red-600 font-medium">{underwritingStatus.riskAssessments.rejected}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Recent Updates</h4>
            <div className="space-y-3">
              {underwritingStatus.recentUpdates.map((update, index) => (
                <div key={index} className="text-sm">
                  <div className="text-gray-600">{update.timestamp.toLocaleTimeString()}</div>
                  <div className="font-medium">{update.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLSystemStatus; 
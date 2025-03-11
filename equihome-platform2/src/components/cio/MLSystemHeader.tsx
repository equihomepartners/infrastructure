import React from 'react';
import { Activity, RefreshCw, Brain, AlertTriangle, Database, Zap, CheckCircle, Loader2 } from 'lucide-react';

interface MLSystemHeaderProps {
  selectedModel?: {
    id: string;
    name: string;
    performance: {
      accuracy: number;
      f1Score: number;
    };
  } | null;
}

const MLSystemHeader: React.FC<MLSystemHeaderProps> = ({ selectedModel = null }) => {
  // Mock system status
  const systemStatus = {
    systemHealth: { status: 'Healthy', latency: '< 100' },
    dataPoints: { total: 765432 },
    integrations: { propTrack: true, coreLogic: true, abs: true, nswPlanning: true }
  };

  // Use mock data for demo
  const mockModel = {
    id: 'ml-001',
    name: 'PropTrack ML v1.0',
    performance: {
      accuracy: 0.945,
      f1Score: 0.932
    }
  };

  const model = selectedModel || mockModel;

  return (
    <div className="space-y-4">
      {/* Active Model Banner */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 p-4 rounded-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Active Model: {model.name}</h3>
              <p className="text-sm text-gray-600">Model ID: {model.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-gray-600">Accuracy</p>
              <p className="font-semibold text-gray-900">{(model.performance.accuracy * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">F1 Score</p>
              <p className="font-semibold text-gray-900">{(model.performance.f1Score * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <h4 className="text-sm font-medium text-gray-600 mb-2">System Health</h4>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <p className="font-semibold text-gray-900">{systemStatus.systemHealth.status}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Data Processing</h4>
          <p className="font-semibold text-gray-900">{systemStatus.dataPoints.total.toLocaleString()} records</p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Response Time</h4>
          <p className="font-semibold text-gray-900">{systemStatus.systemHealth.latency}ms</p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Data Sources</h4>
          <p className="font-semibold text-gray-900">{Object.values(systemStatus.integrations).filter(Boolean).length} Connected</p>
        </div>
      </div>
    </div>
  );
};

export default MLSystemHeader; 
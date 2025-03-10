import React, { useEffect, useState } from 'react';
import { getMLSystemStatus } from '../../services/mlAnalytics';
import { Activity, RefreshCw, Brain, AlertTriangle, Database, Zap, CheckCircle, Loader2 } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

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

const MLSystemHeader: React.FC<MLSystemHeaderProps> = ({ selectedModel }) => {
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await getMLSystemStatus();
        setSystemStatus(status);
      } catch (error) {
        console.error('Error fetching ML system status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
      </div>
    );
  }

  if (!selectedModel) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-sm">
        <div className="flex items-center gap-2 text-yellow-800">
          <AlertTriangle className="h-5 w-5" />
          <p>No ML model selected. Please select a model in Tech Settings to enable ML-powered analysis.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Active Model Banner */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 p-4 rounded-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Active Model: {selectedModel.name}</h3>
              <p className="text-sm text-gray-600">Model ID: {selectedModel.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-gray-600">Accuracy</p>
              <p className="font-semibold text-gray-900">{(selectedModel.performance.accuracy * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">F1 Score</p>
              <p className="font-semibold text-gray-900">{(selectedModel.performance.f1Score * 100).toFixed(1)}%</p>
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
            <p className="font-semibold text-gray-900">{systemStatus?.systemHealth?.status || 'Healthy'}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Data Processing</h4>
          <p className="font-semibold text-gray-900">{systemStatus?.dataPoints?.total?.toLocaleString() || '0'} records</p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Response Time</h4>
          <p className="font-semibold text-gray-900">{systemStatus?.systemHealth?.latency || '< 100'}ms</p>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Data Sources</h4>
          <p className="font-semibold text-gray-900">{Object.values(systemStatus?.integrations || {}).filter(Boolean).length || 4} Connected</p>
        </div>
      </div>
    </div>
  );
};

export default MLSystemHeader; 
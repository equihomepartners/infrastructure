import React from 'react';
import { Database, Rss, Globe, Newspaper, CheckCircle, AlertTriangle, XCircle, Settings } from 'lucide-react';

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

interface Props {
  source: DataSource;
}

const DataSourceCard: React.FC<Props> = ({ source }) => {
  const getIcon = () => {
    switch (source.type) {
      case 'api':
        return <Globe className="h-6 w-6 text-blue-600" />;
      case 'database':
        return <Database className="h-6 w-6 text-purple-600" />;
      case 'feed':
        return <Rss className="h-6 w-6 text-orange-600" />;
      case 'news':
        return <Newspaper className="h-6 w-6 text-green-600" />;
    }
  };

  const getStatusIcon = () => {
    switch (source.status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-gray-400" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusColor = () => {
    switch (source.status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          {getIcon()}
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-900">{source.name}</h3>
            <p className="text-sm text-gray-600">{source.type.toUpperCase()}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <p className="text-gray-600 mb-4">{source.description}</p>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status</span>
          <div className="flex items-center">
            {getStatusIcon()}
            <span className={`ml-1 text-sm px-2 py-1 rounded-full ${getStatusColor()}`}>
              {source.status}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Update Frequency</span>
          <span className="text-sm font-medium">{source.frequency}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Data Points</span>
          <span className="text-sm font-medium">
            {source.dataPoints.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Last Update</span>
          <span className="text-sm font-medium">
            {source.lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DataSourceCard; 
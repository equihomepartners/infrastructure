import React from 'react';
import { Database, ArrowRight, RefreshCcw, Zap, Server, Shield } from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import { Mermaid } from '../../Mermaid';

const DataProcessingView: React.FC = () => {
  const dataProcessingFlow = `
    flowchart LR
      subgraph Input
        direction TB
        Market[Market Data]
        Property[Property Data]
        Economic[Economic Indicators]
        Portfolio[Portfolio Data]
        Pipeline[Deal Pipeline]
      end

      subgraph ETL
        direction TB
        Extract[Data Extraction]
        Transform[Data Transformation]
        Load[Data Loading]
        Validate[Data Validation]
      end

      subgraph Storage
        direction TB
        Raw[Raw Data Lake]
        Processed[Processed Data]
        Warehouse[Data Warehouse]
        Cache[Real-time Cache]
      end

      Market --> Extract
      Property --> Extract
      Economic --> Extract
      Portfolio --> Extract
      Pipeline --> Extract

      Extract --> Validate
      Validate --> Transform
      Transform --> Load
      
      Load --> Raw
      Load --> Processed
      Processed --> Warehouse
      Warehouse --> Cache
  `;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Data Processing Pipeline</h3>
        <Mermaid chart={dataProcessingFlow} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Real-time Processing Metrics</h4>
          <div className="space-y-4">
            {[
              { label: 'Data Ingestion Rate', value: '500k events/sec' },
              { label: 'Processing Latency', value: '< 50ms' },
              { label: 'Data Accuracy', value: '99.99%' },
              { label: 'Pipeline Uptime', value: '99.995%' }
            ].map((metric, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{metric.label}</span>
                <span className="font-mono text-blue-600">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Data Quality Metrics</h4>
          <div className="space-y-4">
            {[
              { label: 'Completeness', value: '98.5%' },
              { label: 'Accuracy', value: '99.2%' },
              { label: 'Consistency', value: '99.7%' },
              { label: 'Timeliness', value: '99.9%' }
            ].map((metric, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{metric.label}</span>
                <span className="font-mono text-green-600">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataProcessingView; 
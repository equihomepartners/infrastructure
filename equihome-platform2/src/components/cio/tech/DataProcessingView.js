import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Mermaid } from '../../Mermaid';
const DataProcessingView = () => {
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
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-6", children: "Data Processing Pipeline" }), _jsx(Mermaid, { chart: dataProcessingFlow })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Real-time Processing Metrics" }), _jsx("div", { className: "space-y-4", children: [
                                    { label: 'Data Ingestion Rate', value: '500k events/sec' },
                                    { label: 'Processing Latency', value: '< 50ms' },
                                    { label: 'Data Accuracy', value: '99.99%' },
                                    { label: 'Pipeline Uptime', value: '99.995%' }
                                ].map((metric, index) => (_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600", children: metric.label }), _jsx("span", { className: "font-mono text-blue-600", children: metric.value })] }, index))) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Data Quality Metrics" }), _jsx("div", { className: "space-y-4", children: [
                                    { label: 'Completeness', value: '98.5%' },
                                    { label: 'Accuracy', value: '99.2%' },
                                    { label: 'Consistency', value: '99.7%' },
                                    { label: 'Timeliness', value: '99.9%' }
                                ].map((metric, index) => (_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600", children: metric.label }), _jsx("span", { className: "font-mono text-green-600", children: metric.value })] }, index))) })] })] })] }));
};
export default DataProcessingView;

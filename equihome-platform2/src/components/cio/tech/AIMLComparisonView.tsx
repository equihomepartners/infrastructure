import React from 'react';
import { Brain, GitBranch, LineChart, RefreshCcw } from 'lucide-react';
import { Mermaid } from '../../Mermaid';

const AIMLComparisonView: React.FC = () => {
  const comparisonFlow = `
    flowchart LR
      subgraph AI ["AI Architecture"]
        Strategy[Strategic Decision Making]:::ai
        Rules[Business Rules Engine]:::ai
        Logic[Complex Logic Processing]:::ai
        Executive[Executive Decisions]:::ai
      end

      subgraph ML ["ML Pipeline"]
        Data[Data Processing]:::ml
        Models[Model Training]:::ml
        Predictions[Numerical Predictions]:::ml
        Performance[Performance Metrics]:::ml
      end

      AI --> ML
      ML --> AI

      classDef ai fill:#dbeafe,stroke:#2563eb,stroke-width:2px
      classDef ml fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
  `;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">AI vs ML Architecture</h3>
        <Mermaid chart={comparisonFlow} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="flex items-center text-lg font-semibold text-blue-900 mb-4">
            <Brain className="h-5 w-5 mr-2" />
            AI Architecture
          </h4>
          <ul className="space-y-3 text-blue-800">
            <li>• Strategic decision-making system</li>
            <li>• Complex business logic processing</li>
            <li>• Market understanding and analysis</li>
            <li>• Executive-level recommendations</li>
            <li>• Portfolio strategy optimization</li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h4 className="flex items-center text-lg font-semibold text-green-900 mb-4">
            <GitBranch className="h-5 w-5 mr-2" />
            ML Pipeline
          </h4>
          <ul className="space-y-3 text-green-800">
            <li>• Technical data processing</li>
            <li>• Model training and validation</li>
            <li>• Numerical predictions</li>
            <li>• Performance metrics tracking</li>
            <li>• Continuous model improvement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIMLComparisonView; 
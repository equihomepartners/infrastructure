import React from 'react';
import { GitBranch, Brain, LineChart, RefreshCcw, Database, TrendingUp, Home, ChevronRight } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Mermaid } from '../../Mermaid';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MLPipelineView: React.FC = () => {
  const mlPipelineFlow = `
    flowchart LR
      subgraph Learning ["Strategic Learning"]
        Portfolio[Portfolio Analysis]:::learning
        Market[Market Analysis]:::learning
        Risk[Risk Analysis]:::learning
      end

      subgraph Adaptation ["Strategy Adaptation"]
        Adjust[Strategy Adjustment]:::adapt
        Balance[Portfolio Balance]:::adapt
        Exposure[Risk Exposure]:::adapt
      end

      subgraph Outcomes ["Performance Tracking"]
        Returns[Return Metrics]:::outcome
        Health[Portfolio Health]:::outcome
        Growth[Fund Growth]:::outcome
      end

      Learning --> Adaptation
      Adaptation --> Outcomes
      Outcomes -.-> Learning

      classDef learning fill:#dbeafe,stroke:#2563eb,stroke-width:2px
      classDef adapt fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px
      classDef outcome fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
  `;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">ML Learning System</h3>
        <p className="text-gray-600 mb-6">
          Our ML system continuously learns from portfolio performance and market conditions to optimize 
          strategy and risk management, ensuring we maintain optimal market positioning.
        </p>
        <Mermaid chart={mlPipelineFlow} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-4">Strategic Learning</h4>
          <ul className="space-y-2 text-blue-800">
            <li>• Portfolio performance analysis</li>
            <li>• Market trend detection</li>
            <li>• Risk pattern identification</li>
          </ul>
        </div>

        <div className="bg-indigo-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-indigo-900 mb-4">Strategy Adaptation</h4>
          <ul className="space-y-2 text-indigo-800">
            <li>• Dynamic strategy updates</li>
            <li>• Portfolio rebalancing</li>
            <li>• Risk exposure management</li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-green-900 mb-4">Performance Tracking</h4>
          <ul className="space-y-2 text-green-800">
            <li>• Return optimization</li>
            <li>• Portfolio health metrics</li>
            <li>• Growth trajectory analysis</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Real-World Impact</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Continuous Improvement</h5>
            <p className="text-gray-600">
              System learns from every decision and transaction to refine its strategy and improve fund performance.
            </p>
          </div>
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Market Adaptation</h5>
            <p className="text-gray-600">
              Automatically adjusts strategy based on changing market conditions and portfolio performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLPipelineView;
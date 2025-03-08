import React from 'react';
import { Brain, Zap, GitBranch, LineChart, Database, ChevronRight, Shield } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Mermaid } from '../../Mermaid';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const AIArchitectureView: React.FC = () => {
  const coreAIFlow = `
    flowchart LR
      subgraph Strategy ["Investment Strategy"]
        Markets[Target Markets]:::strategy
        Capital[Capital Allocation]:::strategy
        Limits[Investment Limits]:::strategy
      end

      subgraph Rules ["Business Rules"]
        Risk[Risk Framework]:::rules
        Returns[Return Targets]:::rules
        Exposure[Exposure Limits]:::rules
      end

      subgraph Actions ["Strategic Actions"]
        Approve[Deal Approvals]:::action
        Adjust[Strategy Adjustments]:::action
        Balance[Portfolio Balance]:::action
      end

      Strategy --> Rules
      Rules --> Actions
      Actions -.-> Strategy

      classDef strategy fill:#dbeafe,stroke:#2563eb,stroke-width:2px
      classDef rules fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px
      classDef action fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
  `;

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Strategic AI System</h3>
        <p className="text-gray-600 mb-6">
          Our AI strategist makes high-level investment decisions, sets business rules, and manages 
          portfolio strategy. It works like an automated investment committee, ensuring our fund 
          stays aligned with its objectives.
        </p>
        <Mermaid chart={coreAIFlow} />
      </div>

      {/* Key Components */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-4">Investment Strategy</h4>
          <ul className="space-y-2 text-blue-800">
            <li>• Sets target markets</li>
            <li>• Allocates capital</li>
            <li>• Defines investment criteria</li>
            <li>• Manages fund strategy</li>
          </ul>
        </div>

        <div className="bg-indigo-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-indigo-900 mb-4">Business Rules</h4>
          <ul className="space-y-2 text-indigo-800">
            <li>• Risk framework</li>
            <li>• Return targets</li>
            <li>• Exposure limits</li>
            <li>• Investment criteria</li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-green-900 mb-4">Strategic Actions</h4>
          <ul className="space-y-2 text-green-800">
            <li>• Deal approvals</li>
            <li>• Strategy adjustments</li>
            <li>• Portfolio balancing</li>
            <li>• Risk management</li>
          </ul>
        </div>
      </div>

      {/* Strategic Process */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Strategic Decision Process</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Investment Committee AI</h5>
            <p className="text-gray-600">
              Acts as an automated investment committee, making strategic decisions about where to invest, 
              how much to invest, and when to adjust strategy based on market conditions and fund performance.
            </p>
          </div>
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Dynamic Strategy</h5>
            <p className="text-gray-600">
              Continuously monitors fund performance and market conditions to make strategic adjustments, 
              ensuring the portfolio stays optimized and aligned with fund objectives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIArchitectureView;
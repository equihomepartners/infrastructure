import React from 'react';
import { useFundStore } from './fundStore';
import { Card } from '../../ui/card';
import { Line } from 'react-chartjs-2';
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

const RiskAnalysis: React.FC = () => {
  const { inputs } = useFundStore();

  const riskMetrics = {
    concentrationRisk: {
      score: 0.7,
      factors: ['Geographic diversity', 'Property type mix', 'Tenant diversity']
    },
    marketRisk: {
      score: 0.6,
      factors: ['Interest rate exposure', 'Market cycle position', 'Economic indicators']
    },
    deploymentRisk: {
      score: 0.8,
      factors: ['Deployment pace', 'Deal pipeline', 'Market competition']
    },
    operationalRisk: {
      score: 0.75,
      factors: ['Property management', 'Maintenance costs', 'Regulatory compliance']
    }
  };

  const riskData = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    datasets: [
      {
        label: 'Interest Rate Risk',
        data: inputs.marketConditions.interestRates.map(rate => rate * 100),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Property Value Index',
        data: inputs.marketConditions.propertyValueIndex,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Employment Trends',
        data: inputs.marketConditions.employmentTrends.map(rate => rate * 100),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Market Risk Indicators',
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(riskMetrics).map(([key, { score, factors }]) => (
          <Card key={key} className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <div className="mb-4">
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-indigo-600 h-4 rounded-full"
                    style={{ width: `${score * 100}%` }}
                  />
                </div>
                <span className="ml-4 text-sm font-medium text-gray-700">
                  {Math.round(score * 100)}%
                </span>
              </div>
            </div>
            <ul className="space-y-2">
              {factors.map((factor, index) => (
                <li key={index} className="text-sm text-gray-600">
                  • {factor}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Risk Trends</h3>
        <div className="h-96">
          <Line options={options} data={riskData} />
        </div>
      </Card>
    </div>
  );
};

export default RiskAnalysis;
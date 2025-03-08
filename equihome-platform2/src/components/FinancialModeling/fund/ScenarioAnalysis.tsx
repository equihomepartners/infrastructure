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

const ScenarioAnalysis: React.FC = () => {
  const { inputs } = useFundStore();

  const scenarios = {
    base: {
      name: 'Base Case',
      description: 'Expected market conditions and deployment',
      irr: 0.15,
      multiple: 1.8,
      exitYear: 5
    },
    upside: {
      name: 'Upside Case',
      description: 'Strong market growth and optimal execution',
      irr: 0.22,
      multiple: 2.2,
      exitYear: 4
    },
    downside: {
      name: 'Downside Case',
      description: 'Market downturn and delayed deployment',
      irr: 0.08,
      multiple: 1.4,
      exitYear: 7
    }
  };

  const years = Array.from({ length: 7 }, (_, i) => `Year ${i + 1}`);
  
  const generateEquityCurve = (scenario: typeof scenarios.base) => {
    const curve = [100];
    const growthRate = scenario.irr;
    
    for (let i = 1; i <= 7; i++) {
      if (i <= scenario.exitYear) {
        curve.push(curve[i - 1] * (1 + growthRate));
      } else {
        curve.push(curve[i - 1]);
      }
    }
    
    return curve;
  };

  const scenarioData = {
    labels: years,
    datasets: [
      {
        label: 'Base Case',
        data: generateEquityCurve(scenarios.base),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Upside Case',
        data: generateEquityCurve(scenarios.upside),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Downside Case',
        data: generateEquityCurve(scenarios.downside),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        text: 'Equity Value Progression',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Equity Value (Base = 100)',
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <Card key={key} className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {scenario.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {scenario.description}
            </p>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Target IRR</span>
                <span className="text-sm font-medium text-gray-900">
                  {(scenario.irr * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Equity Multiple</span>
                <span className="text-sm font-medium text-gray-900">
                  {scenario.multiple.toFixed(1)}x
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Exit Year</span>
                <span className="text-sm font-medium text-gray-900">
                  Year {scenario.exitYear}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Scenario Comparison</h3>
        <div className="h-96">
          <Line options={options} data={scenarioData} />
        </div>
      </Card>
    </div>
  );
};

export default ScenarioAnalysis;
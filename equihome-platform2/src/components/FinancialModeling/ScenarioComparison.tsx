import React from 'react';
import { Line } from 'react-chartjs-2';
import { AlertTriangle, TrendingUp, Clock, Percent } from 'lucide-react';

interface ScenarioComparisonProps {
  modelInputs: {
    propertyValue: number;
    loanAmount: number;
    loanTerm: number;
    interestRate: number;
    upfrontFee: number;
    growthRate: number;
    existingMortgage: number;
    desiredExitYear: number;
  };
}

const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({ modelInputs }) => {
  // Growth rate scenarios
  const growthScenarios = [
    { name: 'Armageddon', rate: -5 },
    { name: 'Conservative', rate: Number(modelInputs.growthRate - 2) },
    { name: 'Base Case', rate: Number(modelInputs.growthRate) },
    { name: 'Optimistic', rate: Number(modelInputs.growthRate + 2) },
    { name: 'Bull Market', rate: 10 }
  ];

  // Exit timing scenarios
  const exitScenarios = [
    { name: 'Early Exit', year: Math.max(2, modelInputs.desiredExitYear - 2) },
    { name: 'Target Exit', year: modelInputs.desiredExitYear },
    { name: 'Late Exit', year: Math.min(10, modelInputs.desiredExitYear + 2) }
  ];

  // Calculate IRR and LTV for a given scenario
  const calculateScenarioMetrics = (
    growthRate: number,
    exitYear: number
  ) => {
    const propertyValue = modelInputs.propertyValue * Math.pow(1 + growthRate / 100, exitYear);
    const appreciation = propertyValue - modelInputs.propertyValue;
    const appreciationShare = appreciation * (modelInputs.loanAmount / modelInputs.propertyValue);
    const accruedInterest = modelInputs.loanAmount * (Math.pow(1 + modelInputs.interestRate / 100, exitYear) - 1);
    const upfrontFee = modelInputs.loanAmount * (modelInputs.upfrontFee / 100);
    const totalReturn = accruedInterest + appreciationShare + upfrontFee;
    
    // Calculate Combined LTV
    const totalDebt = modelInputs.existingMortgage + modelInputs.loanAmount;
    const combinedLTV = (totalDebt / propertyValue) * 100;
    
    // Calculate homeowner equity
    const equity = propertyValue - totalDebt;
    const equityPercentage = (equity / propertyValue) * 100;
    
    // Calculate IRR
    const irr = (Math.pow((totalReturn + modelInputs.loanAmount) / modelInputs.loanAmount, 1 / exitYear) - 1) * 100;

    return {
      irr,
      combinedLTV,
      equityPercentage,
      propertyValue,
      equity
    };
  };

  // Growth Rate Impact Data
  const growthData = {
    labels: Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`),
    datasets: growthScenarios.map(scenario => ({
      label: scenario.name,
      data: Array.from({ length: 10 }, (_, i) => 
        calculateScenarioMetrics(scenario.rate, i + 1).irr
      ),
      borderColor: scenario.name === 'Armageddon' ? '#991B1B' :
                  scenario.name === 'Conservative' ? '#EF4444' : 
                  scenario.name === 'Base Case' ? '#3B82F6' : 
                  scenario.name === 'Optimistic' ? '#10B981' :
                  '#8B5CF6',
      backgroundColor: 'transparent',
      tension: 0.4
    }))
  };

  // Combined LTV Impact Data
  const ltvData = {
    labels: Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`),
    datasets: growthScenarios.map(scenario => ({
      label: scenario.name,
      data: Array.from({ length: 10 }, (_, i) => 
        calculateScenarioMetrics(scenario.rate, i + 1).combinedLTV
      ),
      borderColor: scenario.name === 'Armageddon' ? '#991B1B' :
                  scenario.name === 'Conservative' ? '#EF4444' : 
                  scenario.name === 'Base Case' ? '#3B82F6' : 
                  scenario.name === 'Optimistic' ? '#10B981' :
                  '#8B5CF6',
      backgroundColor: 'transparent',
      tension: 0.4
    }))
  };

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      annotation: {
        annotations: {
          exitLine: {
            type: 'line',
            xMin: modelInputs.desiredExitYear - 1,
            xMax: modelInputs.desiredExitYear - 1,
            borderColor: 'rgba(239, 68, 68, 0.5)',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              display: true,
              content: `Target Exit (Year ${modelInputs.desiredExitYear})`,
              position: 'start'
            }
          }
        }
      }
    }
  };

  // Calculate scenario matrix
  const scenarioMatrix = growthScenarios.map(growth => {
    const metrics = calculateScenarioMetrics(growth.rate, modelInputs.desiredExitYear);
    return {
      growthScenario: growth.name,
      rate: Number(growth.rate),
      propertyValue: metrics.propertyValue,
      combinedLTV: metrics.combinedLTV,
      equityPercentage: metrics.equityPercentage,
      equity: metrics.equity,
      irr: metrics.irr
    };
  });

  return (
    <div className="space-y-8">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <div className="flex">
          <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-lg font-medium text-yellow-800">Scenario Analysis</h3>
            <div className="mt-2 text-yellow-700">
              <p>This analysis shows how different growth scenarios affect:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Your IRR (investment return)</li>
                <li>Combined LTV ratio over time</li>
                <li>Homeowner's equity position</li>
                <li>Property value appreciation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">Growth Rate Impact on IRR</h3>
          </div>
          <div className="h-[400px]">
            <Line 
              data={growthData} 
              options={{
                ...commonOptions,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'IRR (%)'
                    },
                    ticks: {
                      callback: (value: number) => `${value.toFixed(1)}%`
                    }
                  }
                }
              }} 
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Percent className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">Impact on Combined LTV</h3>
          </div>
          <div className="h-[400px]">
            <Line 
              data={ltvData} 
              options={{
                ...commonOptions,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Combined LTV (%)'
                    },
                    ticks: {
                      callback: (value: number) => `${value.toFixed(1)}%`
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Clock className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold">Scenario Comparison at Exit (Year {modelInputs.desiredExitYear})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth Scenario
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property Value
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Combined LTV
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Equity
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Equity %
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IRR
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scenarioMatrix.map((scenario) => (
                <tr key={scenario.growthScenario}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {scenario.growthScenario} ({scenario.rate.toFixed(1)}%)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${Math.round(scenario.propertyValue).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {scenario.combinedLTV.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${Math.round(scenario.equity).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {scenario.equityPercentage.toFixed(1)}%
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    scenario.irr >= modelInputs.interestRate + 5 
                      ? 'text-green-600'
                      : scenario.irr >= modelInputs.interestRate
                      ? 'text-blue-600'
                      : 'text-red-600'
                  }`}>
                    {scenario.irr.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Growth Rate Scenarios</h4>
          <div className="space-y-4">
            {growthScenarios.map(scenario => {
              const metrics = calculateScenarioMetrics(scenario.rate, modelInputs.desiredExitYear);
              return (
                <div key={scenario.name} className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">{scenario.name}</div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <div className="text-xs text-gray-500">Growth Rate</div>
                      <div className="text-base font-semibold">{Number(scenario.rate).toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Final LTV</div>
                      <div className="text-base font-semibold">{metrics.combinedLTV.toFixed(1)}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Exit Timing Scenarios</h4>
          <div className="space-y-4">
            {exitScenarios.map(scenario => {
              const metrics = calculateScenarioMetrics(modelInputs.growthRate, scenario.year);
              return (
                <div key={scenario.name} className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">{scenario.name}</div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <div className="text-xs text-gray-500">Exit Year</div>
                      <div className="text-base font-semibold">Year {scenario.year}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Equity %</div>
                      <div className="text-base font-semibold">{metrics.equityPercentage.toFixed(1)}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioComparison;
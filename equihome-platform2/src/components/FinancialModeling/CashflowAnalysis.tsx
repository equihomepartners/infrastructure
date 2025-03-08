import React from 'react';
import { Line } from 'react-chartjs-2';
import { AlertTriangle } from 'lucide-react';

interface CashflowAnalysisProps {
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

const CashflowAnalysis: React.FC<CashflowAnalysisProps> = ({ modelInputs }) => {
  // Calculate yearly returns for full 10-year term
  const yearlyData = Array.from({ length: 10 }, (_, i) => {
    const year = i + 1;
    const propertyValue = modelInputs.propertyValue * Math.pow(1 + modelInputs.growthRate / 100, year);
    const appreciation = propertyValue - modelInputs.propertyValue;
    const appreciationShare = appreciation * (modelInputs.loanAmount / modelInputs.propertyValue);
    const accruedInterest = modelInputs.loanAmount * (Math.pow(1 + modelInputs.interestRate / 100, year) - 1);
    const upfrontFee = modelInputs.loanAmount * (modelInputs.upfrontFee / 100);
    
    return {
      year,
      propertyValue,
      appreciation,
      appreciationShare,
      accruedInterest,
      upfrontFee,
      totalReturn: accruedInterest + appreciationShare + upfrontFee,
      roi: ((accruedInterest + appreciationShare + upfrontFee) / modelInputs.loanAmount) * 100
    };
  });

  // Get data at desired exit point
  const exitYearIndex = Math.floor(modelInputs.desiredExitYear) - 1;
  const exitData = yearlyData[exitYearIndex];
  const exitFraction = modelInputs.desiredExitYear % 1;
  
  // If there's a fractional year, interpolate the values
  const actualExitData = exitFraction === 0 ? exitData : {
    year: modelInputs.desiredExitYear,
    propertyValue: modelInputs.propertyValue * Math.pow(1 + modelInputs.growthRate / 100, modelInputs.desiredExitYear),
    appreciation: 0, // Will be calculated below
    appreciationShare: 0,
    accruedInterest: modelInputs.loanAmount * (Math.pow(1 + modelInputs.interestRate / 100, modelInputs.desiredExitYear) - 1),
    upfrontFee: modelInputs.loanAmount * (modelInputs.upfrontFee / 100),
    totalReturn: 0,
    roi: 0
  };

  if (exitFraction > 0) {
    actualExitData.appreciation = actualExitData.propertyValue - modelInputs.propertyValue;
    actualExitData.appreciationShare = actualExitData.appreciation * (modelInputs.loanAmount / modelInputs.propertyValue);
    actualExitData.totalReturn = actualExitData.accruedInterest + actualExitData.appreciationShare + actualExitData.upfrontFee;
    actualExitData.roi = (actualExitData.totalReturn / modelInputs.loanAmount) * 100;
  }

  const data = {
    labels: yearlyData.map(d => `Year ${d.year}`),
    datasets: [
      {
        label: 'Property Value',
        data: yearlyData.map(d => d.propertyValue),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Potential Return at Exit',
        data: yearlyData.map(d => d.totalReturn),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Property Value & Return Projection',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      annotation: {
        annotations: {
          exitPoint: {
            type: 'line',
            xMin: modelInputs.desiredExitYear - 1,
            xMax: modelInputs.desiredExitYear - 1,
            borderColor: '#EF4444',
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              content: 'Exit Point',
              enabled: true,
              position: 'top'
            }
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Property Value ($)'
        },
        ticks: {
          callback: (value: number) => `$${(value / 1000000).toFixed(1)}M`
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Return at Exit ($)'
        },
        ticks: {
          callback: (value: number) => `$${(value / 1000).toFixed(0)}K`
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <div className="flex">
          <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-lg font-medium text-yellow-800">Important Note About Returns</h3>
            <div className="mt-2 text-yellow-700">
              <p className="mb-2">
                This is not a traditional cashflow investment. All returns (interest + appreciation share) 
                are realized as a single event at exit:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>No periodic payments during the term</li>
                <li>Returns accumulate but are only realized at exit</li>
                <li>Early exit is possible but affects total returns</li>
                <li>The vertical line indicates your chosen exit point</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="h-[500px]">
          <Line data={data} options={options} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Return at Exit (Year {modelInputs.desiredExitYear})</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Accrued Interest</div>
              <div className="text-2xl font-semibold">
                ${Math.round(actualExitData.accruedInterest).toLocaleString()}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Appreciation Share</div>
              <div className="text-2xl font-semibold">
                ${Math.round(actualExitData.appreciationShare).toLocaleString()}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Upfront Fee</div>
              <div className="text-2xl font-semibold">
                ${Math.round(actualExitData.upfrontFee).toLocaleString()}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Total Return at Exit</div>
              <div className="text-2xl font-semibold text-green-600">
                ${Math.round(actualExitData.totalReturn).toLocaleString()}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">ROI at Exit</div>
              <div className="text-2xl font-semibold text-blue-600">
                {actualExitData.roi.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Potential Returns by Exit Year</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exit Year
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property Value
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Return
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ROI
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {yearlyData.map((data) => (
                  <tr 
                    key={data.year}
                    className={data.year === Math.ceil(modelInputs.desiredExitYear) ? 'bg-green-50' : ''}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Year {data.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${Math.round(data.propertyValue).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${Math.round(data.totalReturn).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {data.roi.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashflowAnalysis;
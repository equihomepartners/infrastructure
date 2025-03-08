import React from 'react';
import { Line } from 'react-chartjs-2';
import { AlertTriangle, TrendingUp, DollarSign, Calculator } from 'lucide-react';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart as ChartJS } from 'chart.js';

// Register the annotation plugin
ChartJS.register(annotationPlugin);

interface ReturnAnalysisProps {
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

const ReturnAnalysis: React.FC<ReturnAnalysisProps> = ({ modelInputs }) => {
  // Calculate yearly returns for full 10-year term
  const yearlyData = Array.from({ length: 10 }, (_, i) => {
    const year = i + 1;
    const propertyValue = modelInputs.propertyValue * Math.pow(1 + modelInputs.growthRate / 100, year);
    const appreciation = propertyValue - modelInputs.propertyValue;
    const appreciationShare = appreciation * (modelInputs.loanAmount / modelInputs.propertyValue);
    const accruedInterest = modelInputs.loanAmount * (Math.pow(1 + modelInputs.interestRate / 100, year) - 1);
    const upfrontFee = modelInputs.loanAmount * (modelInputs.upfrontFee / 100);
    const totalReturn = accruedInterest + appreciationShare + upfrontFee;
    const irr = (Math.pow((totalReturn + modelInputs.loanAmount) / modelInputs.loanAmount, 1 / year) - 1) * 100;

    return {
      year,
      propertyValue,
      appreciation,
      appreciationShare,
      accruedInterest,
      upfrontFee,
      totalReturn,
      irr
    };
  });

  // Get data at desired exit point
  const exitYearIndex = Math.floor(modelInputs.desiredExitYear) - 1;
  const exitData = yearlyData[exitYearIndex];

  // Returns Line Chart Data
  const returnsData = {
    labels: yearlyData.map(d => `Year ${d.year}`),
    datasets: [
      {
        label: 'Interest Returns',
        data: yearlyData.map(d => d.accruedInterest),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        order: 2
      },
      {
        label: 'Appreciation Share',
        data: yearlyData.map(d => d.appreciationShare),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        order: 2
      },
      {
        label: 'Exit Point',
        data: yearlyData.map((d, i) => 
          Math.abs(i + 1 - modelInputs.desiredExitYear) < 0.1 ? d.accruedInterest + d.appreciationShare : null
        ),
        borderColor: '#EF4444',
        backgroundColor: '#EF4444',
        pointStyle: 'star',
        pointRadius: 25,
        pointHoverRadius: 30,
        borderWidth: 3,
        order: 1
      }
    ]
  };

  // IRR Line Chart Data
  const irrData = {
    labels: yearlyData.map(d => `Year ${d.year}`),
    datasets: [
      {
        label: 'IRR',
        data: yearlyData.map(d => d.irr),
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true,
        order: 2
      },
      {
        label: 'Exit Point',
        data: yearlyData.map((d, i) => 
          Math.abs(i + 1 - modelInputs.desiredExitYear) < 0.1 ? d.irr : null
        ),
        borderColor: '#EF4444',
        backgroundColor: '#EF4444',
        pointStyle: 'star',
        pointRadius: 25,
        pointHoverRadius: 30,
        borderWidth: 3,
        order: 1
      }
    ]
  };

  const commonAnnotations = {
    line1: {
      type: 'line',
      xMin: modelInputs.desiredExitYear - 1,
      xMax: modelInputs.desiredExitYear - 1,
      borderColor: 'rgba(239, 68, 68, 0.5)',
      borderWidth: 2,
      borderDash: [6, 6],
      label: {
        display: true,
        content: `Exit Year ${modelInputs.desiredExitYear}`,
        position: 'start'
      }
    }
  };

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            if (context.dataset.label === 'Exit Point') {
              return `Exit Point (Year ${modelInputs.desiredExitYear})`;
            }
            return context.dataset.label + ': ' + context.formattedValue;
          }
        }
      },
      annotation: {
        annotations: commonAnnotations
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const returnsOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Return Components Over Time',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      ...commonOptions.scales,
      y: {
        ...commonOptions.scales.y,
        ticks: {
          callback: (value: number) => `$${(value / 1000).toFixed(0)}k`
        }
      }
    }
  };

  const irrOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'IRR Over Time',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      ...commonOptions.scales,
      y: {
        ...commonOptions.scales.y,
        ticks: {
          callback: (value: number) => `${value.toFixed(1)}%`
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <div className="flex">
          <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-lg font-medium text-yellow-800">Return Structure</h3>
            <div className="mt-2 text-yellow-700">
              <p className="mb-2">Returns are realized in two components:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Interest accrual at {modelInputs.interestRate}% per year</li>
                <li>Share of property appreciation based on LTV ratio</li>
                <li>The red star and vertical line indicate your chosen exit point</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="h-[400px]">
            <Line data={returnsData} options={returnsOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="h-[400px]">
            <Line data={irrData} options={irrOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Components at Exit (Year {modelInputs.desiredExitYear})</h3>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-gray-600">Accrued Interest</div>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-2xl font-semibold text-blue-700">
                ${Math.round(exitData.accruedInterest).toLocaleString()}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-gray-600">Appreciation Share</div>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-2xl font-semibold text-green-700">
                ${Math.round(exitData.appreciationShare).toLocaleString()}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-gray-600">Upfront Fee</div>
                <Calculator className="h-4 w-4 text-purple-600" />
              </div>
              <div className="text-2xl font-semibold text-purple-700">
                ${Math.round(exitData.upfrontFee).toLocaleString()}
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-lg border-2 border-indigo-200">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium text-gray-900">Total Return</div>
                <DollarSign className="h-4 w-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold text-indigo-700">
                ${Math.round(exitData.totalReturn).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Analysis by Exit Year</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exit Year
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Return
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IRR
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
                      ${Math.round(data.totalReturn).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {data.irr.toFixed(2)}%
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

export default ReturnAnalysis;
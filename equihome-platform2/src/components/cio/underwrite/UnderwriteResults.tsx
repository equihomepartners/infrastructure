import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import type { LoanDecision } from '../../../types';

interface Props {
  decision: LoanDecision;
}

const UnderwriteResults: React.FC<Props> = ({ decision }) => {
  const returnData = {
    labels: decision.returns.yearlyBreakdown.map(y => `Year ${y.year}`),
    datasets: [
      {
        label: 'Interest Returns',
        data: decision.returns.yearlyBreakdown.map(y => y.accruedInterest),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Appreciation Share',
        data: decision.returns.yearlyBreakdown.map(y => y.appreciationShare),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Projected Returns Breakdown',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `$${value.toLocaleString()}`
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Analysis Results</h3>
        {decision.approved ? (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-6 w-6 mr-2" />
            <span className="font-semibold">Approved</span>
          </div>
        ) : (
          <div className="flex items-center text-red-600">
            <XCircle className="h-6 w-6 mr-2" />
            <span className="font-semibold">Not Approved</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Loan Amount</div>
          <div className="text-xl font-semibold">${decision.loanAmount.toLocaleString()}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Interest Rate</div>
          <div className="text-xl font-semibold">{decision.interestRate}%</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">LTV Ratio</div>
          <div className="text-xl font-semibold">{decision.ltv.toFixed(1)}%</div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <AlertTriangle className="h-5 w-5 text-gray-600 mr-2" />
          <h4 className="font-medium text-gray-900">Risk Assessment</h4>
        </div>
        <div className={`text-sm ${
          decision.riskLevel === 'low' 
            ? 'text-green-600' 
            : decision.riskLevel === 'medium'
            ? 'text-yellow-600'
            : 'text-red-600'
        }`}>
          {decision.explanation}
        </div>
      </div>

      {decision.approved && (
        <>
          <div className="h-[300px]">
            <Line data={returnData} options={options} />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Optimal Exit Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600">Recommended Exit</div>
                <div className="text-lg font-semibold">Year {decision.returns.optimalExit.year}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Return</div>
                <div className="text-lg font-semibold">${decision.returns.optimalExit.totalReturn.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">ROI</div>
                <div className="text-lg font-semibold">{decision.returns.optimalExit.roi.toFixed(2)}%</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UnderwriteResults;
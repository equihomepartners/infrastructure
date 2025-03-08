import React from 'react';
import { Bar } from 'react-chartjs-2';
import type { LoanDecision } from '../../types';

interface Props {
  decision: LoanDecision;
  selectedYear: number;
  onYearChange: (year: number) => void;
}

const ExitTimeAnalysis: React.FC<Props> = ({ decision, selectedYear, onYearChange }) => {
  const yearData = decision.returns.yearlyBreakdown[selectedYear - 1];

  // Bar chart data
  const barData = {
    labels: ['Returns Breakdown'],
    datasets: [
      {
        label: 'Interest Charged',
        data: [yearData.accruedInterest],
        backgroundColor: '#3B82F6',
      },
      {
        label: 'Appreciation Fee',
        data: [yearData.appreciationShare],
        backgroundColor: '#10B981',
      }
    ]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Returns Breakdown at Exit',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        stacked: true,
        ticks: {
          callback: (value: number) => `$${value.toLocaleString()}`
        }
      },
      x: {
        stacked: true
      }
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-900 mb-2">
          Exit Year: <span className="text-indigo-600">{selectedYear}</span>
        </label>
        <div className="relative">
          <input
            type="range"
            min="1"
            max={decision.returns.yearlyBreakdown.length}
            value={selectedYear}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700"
            style={{
              background: `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${(selectedYear / decision.returns.yearlyBreakdown.length) * 100}%, #E5E7EB ${(selectedYear / decision.returns.yearlyBreakdown.length) * 100}%, #E5E7EB 100%)`
            }}
          />
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-sm font-medium">
            <span className="text-indigo-600">Year 1</span>
            <span className="text-indigo-600">Year {decision.returns.yearlyBreakdown.length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-indigo-100">
          <div className="text-sm text-indigo-600 font-medium">Total Return at Exit</div>
          <div className="text-2xl font-bold text-indigo-700">${yearData.totalReturn.toLocaleString()}</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
          <div className="text-sm text-green-600 font-medium">IRR at Exit</div>
          <div className="text-2xl font-bold text-green-700">{yearData.irr.toFixed(2)}%</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
          <div className="text-sm text-purple-600 font-medium">Interest Charged</div>
          <div className="text-2xl font-bold text-purple-700">${yearData.accruedInterest.toLocaleString()}</div>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-100">
          <div className="text-sm text-pink-600 font-medium">Appreciation Fee</div>
          <div className="text-2xl font-bold text-pink-700">${yearData.appreciationShare.toLocaleString()}</div>
        </div>
      </div>

      <div className="h-[300px]">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
};

export default ExitTimeAnalysis;
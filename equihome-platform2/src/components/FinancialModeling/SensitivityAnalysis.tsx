import React from 'react';
import { Line } from 'react-chartjs-2';

interface SensitivityAnalysisProps {
  modelInputs: {
    propertyValue: number;
    loanAmount: number;
    loanTerm: number;
    interestRate: number;
    upfrontFee: number;
    growthRate: number;
    existingMortgage: number;
    sellingCosts: number;
  };
}

const SensitivityAnalysis: React.FC<SensitivityAnalysisProps> = ({ modelInputs }) => {
  // Generate sensitivity ranges
  const growthRateRange = Array.from({ length: 11 }, (_, i) => modelInputs.growthRate - 5 + i);
  const ltvRange = Array.from({ length: 11 }, (_, i) => 15 + i * 5);

  // Calculate returns for different growth rates
  const growthSensitivity = growthRateRange.map(rate => {
    const finalPropertyValue = modelInputs.propertyValue * Math.pow(1 + rate / 100, modelInputs.loanTerm);
    const appreciation = finalPropertyValue - modelInputs.propertyValue;
    const appreciationShare = appreciation * (modelInputs.loanAmount / modelInputs.propertyValue);
    const accruedInterest = modelInputs.loanAmount * (Math.pow(1 + modelInputs.interestRate / 100, modelInputs.loanTerm) - 1);
    const totalReturn = accruedInterest + appreciationShare + (modelInputs.loanAmount * (modelInputs.upfrontFee / 100));
    const roi = (totalReturn / modelInputs.loanAmount) * 100;

    return {
      rate,
      roi
    };
  });

  // Calculate returns for different LTVs
  const ltvSensitivity = ltvRange.map(ltv => {
    const loanAmount = (modelInputs.propertyValue * ltv) / 100;
    const finalPropertyValue = modelInputs.propertyValue * Math.pow(1 + modelInputs.growthRate / 100, modelInputs.loanTerm);
    const appreciation = finalPropertyValue - modelInputs.propertyValue;
    const appreciationShare = appreciation * (loanAmount / modelInputs.propertyValue);
    const accruedInterest = loanAmount * (Math.pow(1 + modelInputs.interestRate / 100, modelInputs.loanTerm) - 1);
    const totalReturn = accruedInterest + appreciationShare + (loanAmount * (modelInputs.upfrontFee / 100));
    const roi = (totalReturn / loanAmount) * 100;

    return {
      ltv,
      roi
    };
  });

  const growthData = {
    labels: growthRateRange.map(rate => `${rate.toFixed(1)}%`),
    datasets: [{
      label: 'ROI Sensitivity to Growth Rate',
      data: growthSensitivity.map(d => d.roi),
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    }]
  };

  const ltvData = {
    labels: ltvRange.map(ltv => `${ltv}%`),
    datasets: [{
      label: 'ROI Sensitivity to LTV',
      data: ltvSensitivity.map(d => d.roi),
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'ROI (%)'
        },
        ticks: {
          callback: (value: number) => `${value.toFixed(1)}%`
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Rate Sensitivity</h3>
          <div className="h-[400px]">
            <Line data={growthData} options={options} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">LTV Sensitivity</h3>
          <div className="h-[400px]">
            <Line data={ltvData} options={options} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Rate Impact</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Growth Rate
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ROI
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {growthSensitivity.map((data) => (
                  <tr key={data.rate}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {data.rate.toFixed(1)}%
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

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">LTV Impact</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LTV
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ROI
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ltvSensitivity.map((data) => (
                  <tr key={data.ltv}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {data.ltv}%
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

export default SensitivityAnalysis;
import React from 'react';
import Input from '../ui/input';
import { DollarSign, Percent, Clock } from 'lucide-react';

interface ModelInputsProps {
  inputs: {
    propertyValue: number;
    loanAmount: number;
    loanTerm: number;
    interestRate: number;
    upfrontFee: number;
    growthRate: number;
    existingMortgage: number;
    desiredExitYear: number;
  };
  onInputChange: (updates: Partial<ModelInputsProps['inputs']>) => void;
}

const ModelInputs: React.FC<ModelInputsProps> = ({ inputs, onInputChange }) => {
  // Calculate IRR at exit
  const exitYear = inputs.desiredExitYear;
  const propertyValue = inputs.propertyValue * Math.pow(1 + inputs.growthRate / 100, exitYear);
  const appreciation = propertyValue - inputs.propertyValue;
  const appreciationShare = appreciation * (inputs.loanAmount / inputs.propertyValue);
  const accruedInterest = inputs.loanAmount * (Math.pow(1 + inputs.interestRate / 100, exitYear) - 1);
  const upfrontFee = inputs.loanAmount * (inputs.upfrontFee / 100);
  const totalReturn = accruedInterest + appreciationShare + upfrontFee;
  
  // Calculate IRR
  const irr = Math.pow((totalReturn + inputs.loanAmount) / inputs.loanAmount, 1 / exitYear) - 1;
  const irrPercentage = irr * 100;

  // Calculate Combined LTV
  const combinedLTV = ((inputs.loanAmount + inputs.existingMortgage) / inputs.propertyValue) * 100;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Property Details */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Value
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="number"
                  formatNumber
                  value={inputs.propertyValue}
                  onChange={(value) => onInputChange({ propertyValue: value as number })}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Existing Mortgage
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="number"
                  formatNumber
                  value={inputs.existingMortgage}
                  onChange={(value) => onInputChange({ existingMortgage: value as number })}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Growth Rate
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="number"
                  value={inputs.growthRate}
                  onChange={(value) => onInputChange({ growthRate: value as number })}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loan Details */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="number"
                  formatNumber
                  value={inputs.loanAmount}
                  onChange={(value) => onInputChange({ loanAmount: value as number })}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interest Rate
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="number"
                  value={inputs.interestRate}
                  onChange={(value) => onInputChange({ interestRate: value as number })}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upfront Fee
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="number"
                  value={inputs.upfrontFee}
                  onChange={(value) => onInputChange({ upfrontFee: value as number })}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Strategy */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Exit Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Term (Years)
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={inputs.loanTerm}
                onChange={(e) => onInputChange({ loanTerm: Number(e.target.value) })}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                disabled
              >
                <option value={10}>10 Years</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Desired Exit Year
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="number"
                value={inputs.desiredExitYear}
                onChange={(value) => onInputChange({ desiredExitYear: value as number })}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                min={1}
                max={10}
                step={0.5}
              />
              <div className="mt-1 text-sm text-gray-500">Enter a value between 1-10 years (0.5 year increments allowed)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">IRR at Exit</div>
            <div className="text-2xl font-semibold">
              {irrPercentage.toFixed(2)}%
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Combined LTV at Start</div>
            <div className="text-2xl font-semibold">
              {combinedLTV.toFixed(2)}%
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Total Return at Exit</div>
            <div className="text-2xl font-semibold">
              ${Math.round(totalReturn).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelInputs;
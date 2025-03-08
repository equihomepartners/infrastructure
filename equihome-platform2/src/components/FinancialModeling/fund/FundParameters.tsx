import React from 'react';
import { AlertTriangle, DollarSign, Percent } from 'lucide-react';
import Input from '../../ui/input';
import { useFundStore } from './fundStore';

const FundParameters: React.FC = () => {
  const { inputs, updateInput } = useFundStore();

  return (
    <div className="space-y-8">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <div className="flex">
          <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-lg font-medium text-yellow-800">Fund Model Parameters</h3>
            <p className="mt-2 text-yellow-700">
              Configure the fund's target size, composition, and return expectations.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Fund Parameters</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target AUM
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="number"
                formatNumber
                value={inputs.targetAUM}
                onChange={(value) => updateInput('targetAUM', value as number)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Deals
            </label>
            <Input
              type="number"
              value={inputs.numberOfDeals}
              onChange={(value) => updateInput('numberOfDeals', value as number)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-3">LTV Distribution</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Mean LTV (%)</label>
                <Input
                  type="number"
                  value={inputs.ltvDistribution.mean}
                  onChange={(value) => updateInput('ltvDistribution.mean', value as number)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Std Dev (%)</label>
                <Input
                  type="number"
                  value={inputs.ltvDistribution.standardDev}
                  onChange={(value) => updateInput('ltvDistribution.standardDev', value as number)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Growth Rate Distribution</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Mean Growth (%)</label>
                <Input
                  type="number"
                  value={inputs.growthDistribution.mean}
                  onChange={(value) => updateInput('growthDistribution.mean', value as number)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Std Dev (%)</label>
                <Input
                  type="number"
                  value={inputs.growthDistribution.standardDev}
                  onChange={(value) => updateInput('growthDistribution.standardDev', value as number)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundParameters;
import React from 'react';
import { useFundStore } from './fundStore';

const FundInputs: React.FC = () => {
  const { inputs, updateInput } = useFundStore();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Fund Parameters</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target AUM
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={inputs.fundSize}
                  onChange={(e) => updateInput('fundSize', Number(e.target.value))}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investment Period (Years)
              </label>
              <input
                type="number"
                value={inputs.investmentPeriod}
                onChange={(e) => updateInput('investmentPeriod', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fund Term (Years)
              </label>
              <input
                type="number"
                value={inputs.fundTerm}
                onChange={(e) => updateInput('fundTerm', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">LTV Distribution</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum LTV (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={inputs.ltvRange.min * 100}
                  onChange={(e) => updateInput('ltvRange', { ...inputs.ltvRange, min: Number(e.target.value) / 100 })}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum LTV (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={inputs.ltvRange.max * 100}
                  onChange={(e) => updateInput('ltvRange', { ...inputs.ltvRange, max: Number(e.target.value) / 100 })}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target LTV (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={inputs.ltvRange.target * 100}
                  onChange={(e) => updateInput('ltvRange', { ...inputs.ltvRange, target: Number(e.target.value) / 100 })}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundInputs;
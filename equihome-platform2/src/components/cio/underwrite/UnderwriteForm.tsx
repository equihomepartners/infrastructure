import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { FormData } from '../../../types';

interface Props {
  onSubmit: (data: FormData) => void;
  loading: boolean;
}

const UnderwriteForm: React.FC<Props> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<FormData>({
    borrowerName: '',
    annualIncome: 0,
    employmentStatus: '',
    propertyAddress: '',
    propertyType: '',
    currentValue: 0,
    mortgageBalance: 0,
    loanAmount: 0,
    loanPurpose: '',
    loanTerm: 10
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = ['annualIncome', 'currentValue', 'mortgageBalance', 'loanAmount'].includes(name)
      ? Math.max(0, Number(value))
      : value;

    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Loan Application Details</h3>

      <div className="space-y-6">
        {/* Borrower Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Borrower Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="borrowerName"
                value={formData.borrowerName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Annual Income
              </label>
              <input
                type="number"
                name="annualIncome"
                value={formData.annualIncome || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Employment Status
            </label>
            <select
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select status</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self-Employed</option>
              <option value="retired">Retired</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Property Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Property Information</h4>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Property Address
            </label>
            <input
              type="text"
              name="propertyAddress"
              value={formData.propertyAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Property Type
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="townhouse">Townhouse</option>
                <option value="villa">Villa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Current Value
              </label>
              <input
                type="number"
                name="currentValue"
                value={formData.currentValue || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Loan Details */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Loan Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Current Mortgage Balance
              </label>
              <input
                type="number"
                name="mortgageBalance"
                value={formData.mortgageBalance || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Requested Loan Amount
              </label>
              <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Loan Purpose
              </label>
              <select
                name="loanPurpose"
                value={formData.loanPurpose}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select purpose</option>
                <option value="refinance">Refinance</option>
                <option value="renovation">Renovation</option>
                <option value="investment">Investment</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Loan Term (Years)
              </label>
              <select
                name="loanTerm"
                value={formData.loanTerm}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Analyzing...
              </>
            ) : (
              'Analyze Loan Application'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UnderwriteForm;
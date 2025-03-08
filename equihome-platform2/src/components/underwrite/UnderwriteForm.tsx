import React, { useState, useEffect } from 'react';
import { formatNumber } from '../../lib/formatters';
import Input from '../ui/input';
import type { FormData } from '../../types';

interface Props {
  onSubmit: (data: FormData) => void;
  loading: boolean;
  initialValues?: FormData | null;
}

const UnderwriteForm: React.FC<Props> = ({ onSubmit, loading, initialValues }) => {
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
    loanTerm: 10,
    forecastedGrowth: 5
  });

  // Update form data when initialValues changes
  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: number | string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-8">
        {/* Borrower Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Borrower Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                type="text"
                value={formData.borrowerName}
                onChange={(value) => handleChange('borrowerName', value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual Income
              </label>
              <Input
                type="number"
                formatNumber
                value={formData.annualIncome}
                onChange={(value) => handleChange('annualIncome', value as number)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employment Status
            </label>
            <select
              value={formData.employmentStatus}
              onChange={(e) => handleChange('employmentStatus', e.target.value)}
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
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Address
            </label>
            <Input
              type="text"
              value={formData.propertyAddress}
              onChange={(value) => handleChange('propertyAddress', value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => handleChange('propertyType', e.target.value)}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PropTrack AVM Value
              </label>
              <Input
                type="number"
                formatNumber
                value={formData.currentValue}
                onChange={(value) => handleChange('currentValue', value as number)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Loan Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Mortgage Balance
              </label>
              <Input
                type="number"
                formatNumber
                value={formData.mortgageBalance}
                onChange={(value) => handleChange('mortgageBalance', value as number)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requested Loan Amount
              </label>
              <Input
                type="number"
                formatNumber
                value={formData.loanAmount}
                onChange={(value) => handleChange('loanAmount', value as number)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Purpose
              </label>
              <select
                value={formData.loanPurpose}
                onChange={(e) => handleChange('loanPurpose', e.target.value)}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Term (Years)
              </label>
              <select
                value={formData.loanTerm}
                onChange={(e) => handleChange('loanTerm', parseInt(e.target.value))}
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
            {loading ? 'Analyzing...' : 'Get Loan Decision'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UnderwriteForm;
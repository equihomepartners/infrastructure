import React, { useState } from 'react';
import type { FormData } from '../types';

interface Props {
  onSubmit: (data: FormData) => void;
}

const INITIAL_FORM_DATA: FormData = {
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
};

const UnderwritingForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = ['annualIncome', 'currentValue', 'mortgageBalance', 'loanAmount', 'loanTerm'].includes(name)
      ? Math.max(0, Number(value))
      : value;

    setFormData(prev => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-8">
      <div className="space-y-8">
        {/* Borrower Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Borrower Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual Income
              </label>
              <input
                type="number"
                name="annualIncome"
                value={formData.annualIncome || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
        </div>

        {/* Property Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Property Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                <option value="single-family">Single Family</option>
                <option value="multi-family">Multi Family</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Value
              </label>
              <input
                type="number"
                name="currentValue"
                value={formData.currentValue || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mortgage Balance
              </label>
              <input
                type="number"
                name="mortgageBalance"
                value={formData.mortgageBalance || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Loan Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Loan Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Amount
              </label>
              <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                <option value="purchase">Purchase</option>
                <option value="refinance">Refinance</option>
                <option value="cashout">Cash-Out Refinance</option>
                <option value="construction">Construction</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                <option value="15">15</option>
                <option value="30">30</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Get Loan Decision
          </button>
        </div>
      </div>
    </form>
  );
};

export default UnderwritingForm;
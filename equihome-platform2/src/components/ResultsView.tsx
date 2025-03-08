import React from 'react';
import { CheckCircle, XCircle, Building2, Scale } from 'lucide-react';
import type { FormData, LoanDecision } from '../types';
import ReturnProjections from './ReturnProjections';

interface Props {
  data: FormData;
  decision: LoanDecision;
}

const ResultsView: React.FC<Props> = ({ data, decision }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Investment Analysis</h2>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Property Value</div>
            <div className="text-2xl font-semibold">
              ${data.currentValue.toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Loan Amount</div>
            <div className="text-2xl font-semibold">
              ${decision.loanAmount.toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">LTV Ratio</div>
            <div className="text-2xl font-semibold">{decision.ltv.toFixed(1)}%</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700">{decision.explanation}</p>
        </div>
      </div>

      <ReturnProjections 
        decision={decision}
        propertyValue={data.currentValue}
        loanAmount={decision.loanAmount}
      />

      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center mb-6">
          <Scale className="h-6 w-6 text-indigo-600 mr-2" />
          <h3 className="text-xl font-semibold">Risk Assessment</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Risk Level</div>
              <div className={`text-lg font-semibold ${
                decision.riskLevel === 'low' 
                  ? 'text-green-600' 
                  : decision.riskLevel === 'medium'
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}>
                {decision.riskLevel.charAt(0).toUpperCase() + decision.riskLevel.slice(1)}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Property Type</div>
              <div className="text-lg font-semibold">{data.propertyType}</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Risk Factors</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• LTV Ratio: {decision.ltv.toFixed(1)}% {decision.ltv > 70 ? '(High)' : decision.ltv > 65 ? '(Medium)' : '(Low)'}</li>
              <li>• Fixed Interest Rate: 5.0%</li>
              <li>• No Monthly Payments Required</li>
              <li>• Early Exit Option Available</li>
              <li>• Property Type: {data.propertyType}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center mb-6">
          <Building2 className="h-6 w-6 text-indigo-600 mr-2" />
          <h3 className="text-xl font-semibold">Property Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-600 mb-2">Address</div>
            <div className="text-lg">{data.propertyAddress}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Current Mortgage</div>
            <div className="text-lg">${data.mortgageBalance.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
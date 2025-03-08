import React, { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';
import type { LoanDecision } from '../types';

interface Props {
  decision: LoanDecision;
  loanTerm: number;
}

const EarlyExitCalculator: React.FC<Props> = ({ decision, loanTerm }) => {
  const [exitYear, setExitYear] = useState(Math.floor(loanTerm / 2));
  
  const calculations = useMemo(() => {
    const monthlyRate = decision.interestRate / 100 / 12;
    const totalMonths = loanTerm * 12;
    const exitMonth = exitYear * 12;
    
    // Calculate remaining balance at exit
    const remainingBalance = (
      decision.monthlyPayment * 
      ((1 - Math.pow(1 + monthlyRate, -(totalMonths - exitMonth))) / monthlyRate)
    );
    
    // Calculate total payments made
    const totalPaid = decision.monthlyPayment * exitMonth;
    
    // Calculate potential appreciation scenarios
    const conservativeGrowth = decision.loanAmount * Math.pow(1.02, exitYear);
    const moderateGrowth = decision.loanAmount * Math.pow(1.05, exitYear);
    const optimisticGrowth = decision.loanAmount * Math.pow(1.08, exitYear);
    
    return {
      remainingBalance,
      totalPaid,
      scenarios: {
        conservative: conservativeGrowth - remainingBalance,
        moderate: moderateGrowth - remainingBalance,
        optimistic: optimisticGrowth - remainingBalance
      }
    };
  }, [exitYear, decision, loanTerm]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 mt-8">
      <div className="flex items-center mb-6">
        <Calculator className="h-6 w-6 text-indigo-600 mr-2" />
        <h3 className="text-xl font-semibold">Early Exit Calculator</h3>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Exit Year: {exitYear}
        </label>
        <input
          type="range"
          min="1"
          max={loanTerm}
          value={exitYear}
          onChange={(e) => setExitYear(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Year 1</span>
          <span>Year {loanTerm}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Remaining Balance</div>
            <div className="text-2xl font-semibold">
              ${Math.round(calculations.remainingBalance).toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Total Payments Made</div>
            <div className="text-2xl font-semibold">
              ${Math.round(calculations.totalPaid).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Potential Equity Growth Scenarios
          </h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Conservative (2%)</span>
                <span className="font-medium">
                  ${Math.round(calculations.scenarios.conservative).toLocaleString()}
                </span>
              </div>
              <div className="mt-1 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-green-300 rounded-full"
                  style={{ width: `${Math.min(100, (calculations.scenarios.conservative / calculations.totalPaid) * 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Moderate (5%)</span>
                <span className="font-medium">
                  ${Math.round(calculations.scenarios.moderate).toLocaleString()}
                </span>
              </div>
              <div className="mt-1 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${Math.min(100, (calculations.scenarios.moderate / calculations.totalPaid) * 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Optimistic (8%)</span>
                <span className="font-medium">
                  ${Math.round(calculations.scenarios.optimistic).toLocaleString()}
                </span>
              </div>
              <div className="mt-1 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-green-600 rounded-full"
                  style={{ width: `${Math.min(100, (calculations.scenarios.optimistic / calculations.totalPaid) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyExitCalculator;
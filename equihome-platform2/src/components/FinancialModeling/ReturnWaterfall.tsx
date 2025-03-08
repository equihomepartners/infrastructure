import React from 'react';
import { DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

interface ReturnWaterfallProps {
  modelInputs: {
    propertyValue: number;
    loanAmount: number;
    loanTerm: number;
    interestRate: number;
    upfrontFee: number;
    growthRate: number;
    existingMortgage: number;
    desiredExitYear: number;
  };
}

const ReturnWaterfall: React.FC<ReturnWaterfallProps> = ({ modelInputs }) => {
  // Calculate yearly data for all 10 years
  const yearlyData = Array.from({ length: 10 }, (_, i) => {
    const year = i + 1;
    const propertyValue = modelInputs.propertyValue * Math.pow(1 + modelInputs.growthRate / 100, year);
    const appreciation = propertyValue - modelInputs.propertyValue;
    const appreciationShare = appreciation * (modelInputs.loanAmount / modelInputs.propertyValue);
    const accruedInterest = modelInputs.loanAmount * (Math.pow(1 + modelInputs.interestRate / 100, year) - 1);
    const upfrontFee = modelInputs.loanAmount * (modelInputs.upfrontFee / 100);
    const legalFee = 2000; // Fixed legal fee
    const totalReturn = accruedInterest + appreciationShare + upfrontFee;
    const irr = (Math.pow((totalReturn + modelInputs.loanAmount) / modelInputs.loanAmount, 1 / year) - 1) * 100;

    return {
      year,
      underwriteProfile: {
        upfrontFee,
        legalFee,
        totalDebt: modelInputs.loanAmount,
        moniesReleased: modelInputs.loanAmount - upfrontFee - legalFee,
        startingValue: modelInputs.propertyValue,
        growthRate: modelInputs.growthRate,
        projectedValue: propertyValue,
        appreciation: appreciation
      },
      settlementProfile: {
        projectedValue: propertyValue,
        capitalRepayment: modelInputs.loanAmount,
        interest: accruedInterest,
        equihomeFee: appreciationShare,
        netProceeds: propertyValue - modelInputs.loanAmount - accruedInterest - appreciationShare,
        proceedsToEquihome: accruedInterest + appreciationShare + upfrontFee,
        irr: irr
      }
    };
  });

  return (
    <div className="space-y-8">
      {yearlyData.map((data) => (
        <div key={data.year} className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-blue-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Year {data.year} Transaction Profile</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">IRR:</span>
                <span className="text-lg font-bold text-blue-600">{data.settlementProfile.irr.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* Underwrite Profile */}
            <div className="p-6">
              <div className="flex items-center mb-6">
                <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="text-lg font-semibold text-gray-900">Underwrite Profile</h4>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Upfront Fee (3%)</div>
                      <div className="text-lg font-semibold">${data.underwriteProfile.upfrontFee.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Legal Fee</div>
                      <div className="text-lg font-semibold">${data.underwriteProfile.legalFee.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Total Debt</div>
                      <div className="text-lg font-semibold">${data.underwriteProfile.totalDebt.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Monies Released</div>
                      <div className="text-lg font-semibold">${data.underwriteProfile.moniesReleased.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Starting Value</div>
                      <div className="text-lg font-semibold">${data.underwriteProfile.startingValue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Growth Rate</div>
                      <div className="text-lg font-semibold">{data.underwriteProfile.growthRate}%</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Projected Home Value</div>
                      <div className="text-lg font-semibold">${data.underwriteProfile.projectedValue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Home Value Appreciation</div>
                      <div className="text-lg font-semibold">${data.underwriteProfile.appreciation.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settlement Profile */}
            <div className="p-6">
              <div className="flex items-center mb-6">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="text-lg font-semibold text-gray-900">Settlement Profile</h4>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Projected Home Value</div>
                  <div className="text-lg font-semibold">${data.settlementProfile.projectedValue.toLocaleString()}</div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Capital Repayment</div>
                      <div className="text-lg font-semibold">${data.settlementProfile.capitalRepayment.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Interest</div>
                      <div className="text-lg font-semibold">${Math.round(data.settlementProfile.interest).toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Equihome Fee</div>
                      <div className="text-lg font-semibold">${Math.round(data.settlementProfile.equihomeFee).toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Net Proceeds to Homeowner</div>
                      <div className="text-lg font-semibold">${Math.round(data.settlementProfile.netProceeds).toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Proceeds to Equihome</div>
                      <div className="text-xl font-bold text-green-600">
                        ${Math.round(data.settlementProfile.proceedsToEquihome).toLocaleString()}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReturnWaterfall;
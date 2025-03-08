import React from 'react';
import { TrendingUp, DollarSign, Percent, Clock, Coins } from 'lucide-react';
import { sampleDeals } from '../../data/sampleDeals';

const FundMetrics: React.FC = () => {
  // Calculate total starting portfolio value
  const totalStartingValue = sampleDeals.reduce((sum, deal) => sum + deal.propertyValue, 0);

  // Calculate current values based on individual growth rates
  const portfolioMetrics = sampleDeals.map(deal => {
    const startDate = new Date(deal.loanTerms.startDate);
    const endDate = new Date(deal.loanTerms.endDate);
    const now = new Date();
    const elapsedMonths = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
    const isActive = now < endDate;
    
    // Calculate current property value based on yearly growth rate
    const yearlyGrowthRate = deal.propertyDetails.yearlyGrowth / 100;
    const monthlyGrowthRate = yearlyGrowthRate / 12;
    const currentValue = deal.propertyValue * Math.pow(1 + monthlyGrowthRate, elapsedMonths);
    const appreciation = currentValue - deal.propertyValue;
    
    // Calculate returns
    const monthlyInterestRate = deal.loanTerms.interestRate / 100 / 12;
    const accruedInterest = deal.loanAmount * (Math.pow(1 + monthlyInterestRate, elapsedMonths) - 1);
    const appreciationShare = appreciation * (deal.loanAmount / deal.propertyValue);
    
    return {
      startDate,
      endDate,
      isActive,
      elapsedMonths,
      originalValue: deal.propertyValue,
      currentValue,
      appreciation,
      loanAmount: deal.loanAmount,
      accruedInterest,
      appreciationShare,
      totalReturn: accruedInterest + appreciationShare
    };
  });

  // Calculate total current portfolio value
  const totalCurrentValue = portfolioMetrics.reduce((sum, deal) => sum + deal.currentValue, 0);

  // Calculate portfolio growth rate
  const portfolioGrowth = ((totalCurrentValue - totalStartingValue) / totalStartingValue) * 100;

  // Calculate weighted average LTV
  const weightedLTV = sampleDeals.reduce((sum, deal) => 
    sum + (deal.loanAmount / deal.propertyValue * 100 * deal.loanAmount), 0) / 
    sampleDeals.reduce((sum, deal) => sum + deal.loanAmount, 0);

  // Monthly IRR (provided value)
  const monthlyIRR = 16.61;

  // Calculate total returns
  const totalReturns = portfolioMetrics.reduce((acc, deal) => ({
    accruedInterest: acc.accruedInterest + deal.accruedInterest,
    appreciationShare: acc.appreciationShare + deal.appreciationShare,
    totalReturn: acc.totalReturn + deal.totalReturn
  }), {
    accruedInterest: 0,
    appreciationShare: 0,
    totalReturn: 0
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Starting Home Portfolio Value</p>
              <p className="text-2xl font-semibold mt-1">${totalStartingValue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Home Portfolio Value</p>
              <p className="text-2xl font-semibold mt-1">${Math.round(totalCurrentValue).toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Portfolio Growth Rate</p>
              <p className="text-2xl font-semibold mt-1">{portfolioGrowth.toFixed(2)}%</p>
            </div>
            <Percent className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Weighted Average LTV</p>
              <p className="text-2xl font-semibold mt-1">{weightedLTV.toFixed(2)}%</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly IRR</p>
              <p className="text-2xl font-semibold mt-1">{monthlyIRR}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Returns Generated</p>
              <p className="text-2xl font-semibold mt-1">${Math.round(totalReturns.totalReturn).toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">
                Interest: ${Math.round(totalReturns.accruedInterest).toLocaleString()}<br />
                Appreciation: ${Math.round(totalReturns.appreciationShare).toLocaleString()}
              </p>
            </div>
            <Coins className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundMetrics;
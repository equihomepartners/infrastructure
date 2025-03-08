import React from 'react';
import { TrendingUp, DollarSign, Percent, Building2 } from 'lucide-react';
import type { LoanDecision } from '../../types';
import { sampleDeals } from '../../data/sampleDeals';

interface Props {
  decision: LoanDecision;
  selectedYear: number;
}

const FundImpactAnalysis: React.FC<Props> = ({ decision, selectedYear }) => {
  const yearData = decision.returns.yearlyBreakdown[selectedYear - 1];
  
  // Calculate current AUM from existing deals
  const currentAUM = sampleDeals.reduce((sum, deal) => sum + deal.loanAmount, 0);
  const newAUM = currentAUM + decision.loanAmount;

  // Calculate weighted IRR from existing deals
  const currentIRR = sampleDeals.reduce((sum, deal) => sum + (deal.irr * deal.loanAmount), 0) / currentAUM;
  const newIRR = ((currentIRR * currentAUM) + (yearData.irr * decision.loanAmount)) / newAUM;

  // Calculate weighted LTV
  const currentLTV = sampleDeals.reduce((sum, deal) => sum + (deal.ltv * deal.loanAmount), 0) / currentAUM;
  const newLTV = ((currentLTV * currentAUM) + (decision.ltv * decision.loanAmount)) / newAUM;

  // Calculate portfolio growth
  const currentGrowth = sampleDeals.reduce((sum, deal) => 
    sum + (deal.propertyDetails.yearlyGrowth * deal.loanAmount), 0) / currentAUM;
  const newGrowth = ((currentGrowth * currentAUM) + (yearData.propertyValue * decision.loanAmount / currentAUM)) / newAUM;

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Fund Impact Analysis</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Portfolio IRR</div>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex justify-between items-baseline">
            <div className="text-lg font-semibold">{newIRR.toFixed(2)}%</div>
            <div className={`text-sm ${newIRR > currentIRR ? 'text-green-600' : 'text-red-600'}`}>
              {newIRR > currentIRR ? '↑' : '↓'} from {currentIRR.toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Total AUM</div>
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex justify-between items-baseline">
            <div className="text-lg font-semibold">${(newAUM / 1000000).toFixed(1)}M</div>
            <div className="text-sm text-green-600">
              ↑ from ${(currentAUM / 1000000).toFixed(1)}M
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Weighted LTV</div>
            <Percent className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="flex justify-between items-baseline">
            <div className="text-lg font-semibold">{newLTV.toFixed(2)}%</div>
            <div className={`text-sm ${newLTV > currentLTV ? 'text-yellow-600' : 'text-green-600'}`}>
              {newLTV > currentLTV ? '↑' : '↓'} from {currentLTV.toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Portfolio Growth</div>
            <Building2 className="h-5 w-5 text-purple-600" />
          </div>
          <div className="flex justify-between items-baseline">
            <div className="text-lg font-semibold">{newGrowth.toFixed(2)}%</div>
            <div className={`text-sm ${newGrowth > currentGrowth ? 'text-green-600' : 'text-red-600'}`}>
              {newGrowth > currentGrowth ? '↑' : '↓'} from {currentGrowth.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundImpactAnalysis;
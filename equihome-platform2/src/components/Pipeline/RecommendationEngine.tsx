import React from 'react';
import { CheckCircle, AlertTriangle, DollarSign, TrendingUp, Target, Shield } from 'lucide-react';
import { useFundParameters } from '../../store/fundParameters';
import { pipelineDeals } from '../../data/pipelineData';

const RecommendationEngine: React.FC = () => {
  const { targetIRR, maxLTV, remainingAllocation } = useFundParameters();

  // Filter deals based on fund parameters
  const recommendedDeals = pipelineDeals.filter(deal => 
    deal.loanRequest.ltv <= maxLTV &&
    deal.returns.forecastedIrr >= targetIRR &&
    deal.underwriteScore >= 80
  );

  // Calculate total recommended volume
  const totalRecommendedVolume = recommendedDeals.reduce((sum, deal) => 
    sum + deal.loanRequest.amount, 0
  );

  // Calculate average metrics
  const averageIRR = recommendedDeals.reduce((sum, deal) => 
    sum + deal.returns.forecastedIrr, 0
  ) / (recommendedDeals.length || 1);

  const averageScore = recommendedDeals.reduce((sum, deal) => 
    sum + deal.underwriteScore, 0
  ) / (recommendedDeals.length || 1);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Recommended Deals</p>
              <p className="text-2xl font-semibold mt-1">{recommendedDeals.length}</p>
              <p className="text-sm text-gray-500">High-quality opportunities</p>
            </div>
            <Target className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Volume</p>
              <p className="text-2xl font-semibold mt-1">${(totalRecommendedVolume / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-500">vs ${(remainingAllocation / 1000000).toFixed(1)}M available</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average IRR</p>
              <p className="text-2xl font-semibold mt-1">{averageIRR.toFixed(1)}%</p>
              <p className="text-sm text-gray-500">vs {targetIRR}% target</p>
            </div>
            <TrendingUp className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-semibold mt-1">{averageScore.toFixed(1)}</p>
              <p className="text-sm text-gray-500">Quality threshold: 80</p>
            </div>
            <Shield className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Recommendations</h3>
        <div className="space-y-6">
          {recommendedDeals.slice(0, 5).map((deal) => (
            <div key={deal.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <h4 className="font-medium text-gray-900">{deal.propertyDetails.address}</h4>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Score: {deal.underwriteScore}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <div className="text-sm text-gray-600">Property Value</div>
                  <div className="font-medium">${(deal.propertyDetails.currentValue / 1000000).toFixed(1)}M</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Loan Amount</div>
                  <div className="font-medium">${(deal.loanRequest.amount / 1000000).toFixed(1)}M</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">LTV</div>
                  <div className="font-medium">{deal.loanRequest.ltv.toFixed(1)}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Projected IRR</div>
                  <div className="font-medium">{deal.returns.forecastedIrr.toFixed(1)}%</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center text-sm text-gray-600">
                  <AlertTriangle className="h-4 w-4 mr-1 text-yellow-600" />
                  Key Considerations
                </div>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li>• Risk Adjustment: {deal.propertyDetails.riskAdjustment}%</li>
                  <li>• Growth Rate: {deal.propertyDetails.forecastedGrowthRate}%</li>
                  <li>• Borrower Income: ${deal.borrowerDetails.income.toLocaleString()}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationEngine;
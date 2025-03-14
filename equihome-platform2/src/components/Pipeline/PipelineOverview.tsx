import React from 'react';
import { Bar } from 'react-chartjs-2';
import { AlertTriangle, TrendingUp, DollarSign, Target, Shield, Users, Clock, Percent } from 'lucide-react';
import { useFundParameters } from '../../store/fundParameters';
import { pipelineDeals } from '../../data/pipelineData';

const PipelineOverview: React.FC = () => {
  const { targetIRR, maxLTV, remainingAllocation } = useFundParameters();

  // Filter approved deals (score >= 80)
  const approvedDeals = pipelineDeals.filter(deal => deal.underwriteScore >= 80);

  // Calculate key metrics
  const metrics = {
    averagePropertyValue: pipelineDeals.reduce((sum, deal) => 
      sum + deal.propertyDetails.currentValue, 0) / pipelineDeals.length,
    
    averageLoanSize: pipelineDeals.reduce((sum, deal) => 
      sum + deal.loanRequest.amount, 0) / pipelineDeals.length,
    
    averageApprovedIRR: approvedDeals.reduce((sum, deal) => 
      sum + deal.returns.forecastedIrr, 0) / approvedDeals.length,
    
    totalPipelineVolume: pipelineDeals.reduce((sum, deal) => 
      sum + deal.loanRequest.amount, 0),
    
    highQualityDeals: pipelineDeals.filter(deal => deal.underwriteScore >= 80).length,
    mediumQualityDeals: pipelineDeals.filter(deal => deal.underwriteScore >= 60 && deal.underwriteScore < 80).length,
    lowQualityDeals: pipelineDeals.filter(deal => deal.underwriteScore < 60).length,
    
    noMortgageDeals: pipelineDeals.filter(deal => deal.loanRequest.existingMortgage === 0).length,
    firstMortgageRepayment: pipelineDeals.filter(deal => 
      deal.loanRequest.purpose === 'First Mortgage Repayment').length,
    
    // Additional metrics
    totalApplications: pipelineDeals.length,
    averageLTV: pipelineDeals.reduce((sum, deal) => sum + deal.loanRequest.ltv, 0) / pipelineDeals.length,
    approvalRate: (approvedDeals.length / pipelineDeals.length) * 100
  };

  // Quality distribution data
  const qualityData = {
    labels: ['High Quality (≥80)', 'Medium Quality (60-79)', 'Low Quality (<60)'],
    datasets: [{
      data: [metrics.highQualityDeals, metrics.mediumQualityDeals, metrics.lowQualityDeals],
      backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
      borderRadius: 8
    }]
  };

  // Approved Deals IRR Distribution
  const approvedIRRData = {
    labels: approvedDeals.map(deal => deal.propertyDetails.address.split(',')[0]),
    datasets: [{
      label: 'Forecasted IRR',
      data: approvedDeals.map(deal => deal.returns.forecastedIrr),
      backgroundColor: approvedDeals.map(deal => 
        deal.returns.forecastedIrr >= targetIRR ? '#22c55e' : '#eab308'
      ),
      borderRadius: 8
    }]
  };

  return (
    <div className="space-y-8">
      {/* Pipeline Summary Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Pipeline Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-semibold mt-1">{metrics.totalApplications}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pipeline Volume</p>
                <p className="text-2xl font-semibold mt-1">
                  ${(metrics.totalPipelineVolume / 1000000).toFixed(1)}M
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approval Rate</p>
                <p className="text-2xl font-semibold mt-1">{metrics.approvalRate.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average LTV</p>
                <p className="text-2xl font-semibold mt-1">{metrics.averageLTV.toFixed(1)}%</p>
              </div>
              <Percent className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Deal Quality and IRR Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Quality Distribution</h3>
          <div className="h-[300px]">
            <Bar 
              data={qualityData}
              options={{
                indexAxis: 'y' as const,
                plugins: {
                  legend: { display: false }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Forecasted Approved Deal IRRs</h3>
          <div className="h-[300px]">
            <Bar 
              data={approvedIRRData}
              options={{
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'IRR (%)'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Deal Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Deal Types */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Type Analysis</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">No Existing Mortgage</span>
                <span className="font-medium">{metrics.noMortgageDeals}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-green-600 rounded-full" 
                  style={{ width: `${(metrics.noMortgageDeals / pipelineDeals.length) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">First Mortgage Repayment</span>
                <span className="font-medium">{metrics.firstMortgageRepayment}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-blue-600 rounded-full" 
                  style={{ width: `${(metrics.firstMortgageRepayment / pipelineDeals.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Risk Analysis */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Analysis</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Average Property Value</span>
                <span className="font-medium">
                  ${(metrics.averagePropertyValue / 1000000).toFixed(1)}M
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Average Loan Size</span>
                <span className="font-medium">
                  ${(metrics.averageLoanSize / 1000000).toFixed(1)}M
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Average Approved IRR</span>
                <span className="font-medium">{metrics.averageApprovedIRR.toFixed(1)}%</span>
              </div>
              <div>
                <div className="text-xs text-gray-500 mt-1">vs Target {targetIRR}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline Health */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Pipeline Coverage</span>
                <span className="font-medium">
                  {((metrics.totalPipelineVolume / remainingAllocation) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-indigo-600 rounded-full" 
                  style={{ width: `${Math.min((metrics.totalPipelineVolume / remainingAllocation) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">High Quality Ratio</span>
                <span className="font-medium">
                  {((metrics.highQualityDeals / pipelineDeals.length) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-green-600 rounded-full" 
                  style={{ width: `${(metrics.highQualityDeals / pipelineDeals.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Times */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Times</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-gray-900">Initial Review</span>
            </div>
            <p className="text-2xl font-semibold">2.4 days</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-900">Due Diligence</span>
            </div>
            <p className="text-2xl font-semibold">5.2 days</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-sm font-medium text-gray-900">Final Approval</span>
            </div>
            <p className="text-2xl font-semibold">1.8 days</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-gray-900">Total Time</span>
            </div>
            <p className="text-2xl font-semibold">9.4 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineOverview;
import React from 'react';
import { Scale, Shield, MapPin, CreditCard, TrendingUp, Building2 } from 'lucide-react';

const DealScoring: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Deal Scoring System</h2>
        <p className="text-gray-600 mb-8">
          Our proprietary scoring system evaluates each deal across multiple dimensions to ensure alignment 
          with fund parameters and risk management guidelines.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <MapPin className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Location Score (30%)</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Traffic light zone rating</li>
              <li>• Historical growth rates</li>
              <li>• Suburb fundamentals</li>
              <li>• Infrastructure development</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Building2 className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold">Property Score (25%)</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Property condition</li>
              <li>• Land value ratio</li>
              <li>• Comparable sales</li>
              <li>• Property features</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <CreditCard className="h-6 w-6 text-purple-600 mr-2" />
              <h3 className="text-lg font-semibold">Financial Score (20%)</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• LTV ratio</li>
              <li>• Serviceability</li>
              <li>• Income stability</li>
              <li>• Asset position</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-6 w-6 text-yellow-600 mr-2" />
              <h3 className="text-lg font-semibold">Return Score (15%)</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Projected IRR</li>
              <li>• Growth potential</li>
              <li>• Exit scenarios</li>
              <li>• Market timing</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold">Risk Score (10%)</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Market volatility</li>
              <li>• Property risks</li>
              <li>• Borrower profile</li>
              <li>• External factors</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Scale className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold">Overall Score</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">High Quality (80+)</div>
                <div className="h-2 bg-green-200 rounded-full">
                  <div className="h-full bg-green-600 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Medium Quality (60-80)</div>
                <div className="h-2 bg-yellow-200 rounded-full">
                  <div className="h-full bg-yellow-600 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Low Quality (&lt;60)</div>
                <div className="h-2 bg-red-200 rounded-full">
                  <div className="h-full bg-red-600 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Score Thresholds</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <div className="text-lg font-semibold text-green-900 mb-2">Automatic Approval</div>
            <div className="text-3xl font-bold text-green-600 mb-2">85+</div>
            <p className="text-green-800">
              Deals scoring above 85 are fast-tracked for approval, subject to final verification
            </p>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
            <div className="text-lg font-semibold text-yellow-900 mb-2">Manual Review</div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">70-84</div>
            <p className="text-yellow-800">
              Requires additional analysis and senior underwriter review
            </p>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border border-red-100">
            <div className="text-lg font-semibold text-red-900 mb-2">Automatic Rejection</div>
            <div className="text-3xl font-bold text-red-600 mb-2">&lt;70</div>
            <p className="text-red-800">
              Deals below 70 are rejected unless exceptional circumstances exist
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealScoring;
import React from 'react';
import MLSystemHeader from './MLSystemHeader';
import SuburbClustering from './SuburbClustering';
import { Brain, TrendingUp, AlertTriangle, Building, ArrowRight } from 'lucide-react';

const FrontrunSuburbs: React.FC = () => {
  return (
    <div className="space-y-6">
      <MLSystemHeader />

      {/* High-Level Investment Thesis Adjustment */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-blue-900">Investment Thesis Adjustment</h2>
            <p className="text-blue-700 mt-1">ML-powered strategic recommendations</p>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-blue-800">Real-time Analysis</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Portfolio Positioning</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <ArrowRight className="h-4 w-4 text-green-500" />
                <span>Increase exposure to transitioning suburbs</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <ArrowRight className="h-4 w-4 text-green-500" />
                <span>Focus on transport corridor developments</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <ArrowRight className="h-4 w-4 text-green-500" />
                <span>Target value-add opportunities</span>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Risk Management</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span>Increase due diligence in growth corridors</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span>Monitor development pipeline closely</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span>Stage capital deployment</span>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Timeline Expectations</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span>12-18 months for initial transitions</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span>2-3 years for full value realization</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span>5+ year hold period recommended</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zone Transition Analysis */}
      <SuburbClustering />

      {/* Growth Corridor Analysis */}
      <div className="grid grid-cols-2 gap-6">
        {/* Inner West → Eastern Suburbs Corridor */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold">Inner West → Eastern Corridor</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800">Key Transition Indicators</h4>
              <div className="mt-2 space-y-2">
                <div className="text-sm">• Strong infrastructure pipeline</div>
                <div className="text-sm">• Demographic shift acceleration</div>
                <div className="text-sm">• Commercial revitalization</div>
                <div className="text-sm">• Transport connectivity improvements</div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800">Investment Strategy</h4>
              <div className="mt-2 space-y-2">
                <div className="text-sm">• Target older properties with renovation potential</div>
                <div className="text-sm">• Focus on transport hub proximity</div>
                <div className="text-sm">• Consider mixed-use developments</div>
                <div className="text-sm">• Build local agent relationships</div>
              </div>
            </div>
          </div>
        </div>

        {/* South Sydney → Inner South Corridor */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold">South Sydney → Inner South Corridor</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800">Key Transition Indicators</h4>
              <div className="mt-2 space-y-2">
                <div className="text-sm">• Employment hub development</div>
                <div className="text-sm">• Lifestyle amenity improvements</div>
                <div className="text-sm">• Green space initiatives</div>
                <div className="text-sm">• Education precinct expansion</div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800">Investment Strategy</h4>
              <div className="mt-2 space-y-2">
                <div className="text-sm">• Focus on employment hub proximity</div>
                <div className="text-sm">• Target family-friendly configurations</div>
                <div className="text-sm">• Consider student accommodation</div>
                <div className="text-sm">• Monitor commercial opportunities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontrunSuburbs; 
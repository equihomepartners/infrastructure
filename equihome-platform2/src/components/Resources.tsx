import React from 'react';
import { 
  Brain, 
  BarChart2, 
  Settings, 
  LineChart, 
  GitBranch, 
  Database, 
  Shield, 
  Target, 
  Cog,
  Zap,
  BarChart,
  Building2,
  Users,
  TrendingUp,
  Lock
} from 'lucide-react';

const Resources: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Platform Overview
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A comprehensive breakdown of Equihome's AI-driven investment and portfolio management platform
        </p>
      </div>

      <div className="space-y-12">
        {/* Core Platform Capabilities */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Platform Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="flex items-center text-lg font-semibold text-blue-900 mb-3">
                  <Brain className="h-5 w-5 mr-2" />
                  AI-Powered Decision Making
                </h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-blue-500" />
                    Real-time processing reducing underwriting from 30 days to under 5 minutes
                  </li>
                  <li className="flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-blue-500" />
                    95-100% valuation accuracy through multiple data sources
                  </li>
                  <li className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-blue-500" />
                    Focus on premium Sydney suburbs with proven long-term appreciation
                  </li>
                  <li className="flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-blue-500" />
                    Conservative LTV ratios providing significant downside protection
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="flex items-center text-lg font-semibold text-green-900 mb-3">
                  <Database className="h-5 w-5 mr-2" />
                  Data Integration
                </h3>
                <p className="text-green-800 mb-4">
                  Comprehensive data integration from multiple sources enables precise property valuation 
                  and risk assessment:
                </p>
                <ul className="space-y-2 text-green-800">
                  <li>• PropTrack API for real-time property data</li>
                  <li>• Historical sales and market trends</li>
                  <li>• Suburb-level economic indicators</li>
                  <li>• Demographic and growth projections</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="flex items-center text-lg font-semibold text-purple-900 mb-3">
                  <LineChart className="h-5 w-5 mr-2" />
                  Portfolio Management
                </h3>
                <p className="text-purple-800 mb-4">
                  Advanced portfolio management tools for optimal performance:
                </p>
                <ul className="space-y-2 text-purple-800">
                  <li>• Real-time portfolio monitoring</li>
                  <li>• Risk-adjusted return optimization</li>
                  <li>• Geographic exposure management</li>
                  <li>• Automated compliance checks</li>
                </ul>
              </div>

              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="flex items-center text-lg font-semibold text-orange-900 mb-3">
                  <Target className="h-5 w-5 mr-2" />
                  Risk Management
                </h3>
                <p className="text-orange-800 mb-4">
                  Comprehensive risk management framework:
                </p>
                <ul className="space-y-2 text-orange-800">
                  <li>• Traffic light zoning system</li>
                  <li>• Dynamic LTV thresholds</li>
                  <li>• Suburb concentration limits</li>
                  <li>• Market cycle analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Management */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-indigo-900 mb-3">
                <BarChart2 className="h-5 w-5 mr-2" />
                Return Optimization
              </h3>
              <p className="text-indigo-800">
                Sophisticated algorithms optimize returns through:
              </p>
              <ul className="mt-3 space-y-2 text-indigo-800">
                <li>• Dynamic pricing models</li>
                <li>• Exit timing optimization</li>
                <li>• Risk-adjusted return targeting</li>
                <li>• Market opportunity identification</li>
              </ul>
            </div>

            <div className="bg-pink-50 rounded-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-pink-900 mb-3">
                <Settings className="h-5 w-5 mr-2" />
                Portfolio Controls
              </h3>
              <p className="text-pink-800">
                Granular control over portfolio composition:
              </p>
              <ul className="mt-3 space-y-2 text-pink-800">
                <li>• Geographic allocation limits</li>
                <li>• Property type restrictions</li>
                <li>• Risk exposure management</li>
                <li>• Diversification requirements</li>
              </ul>
            </div>

            <div className="bg-cyan-50 rounded-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-cyan-900 mb-3">
                <GitBranch className="h-5 w-5 mr-2" />
                Pipeline Management
              </h3>
              <p className="text-cyan-800">
                Efficient deal flow management through:
              </p>
              <ul className="mt-3 space-y-2 text-cyan-800">
                <li>• Automated deal scoring</li>
                <li>• Risk assessment automation</li>
                <li>• Approval workflow optimization</li>
                <li>• Real-time pipeline analytics</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Machine Learning & Optimization */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Machine Learning & Optimization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-teal-50 rounded-lg p-6">
                <h3 className="flex items-center text-lg font-semibold text-teal-900 mb-3">
                  <Brain className="h-5 w-5 mr-2" />
                  Continuous Learning
                </h3>
                <p className="text-teal-800 mb-4">
                  The platform continuously improves through:
                </p>
                <ul className="space-y-2 text-teal-800">
                  <li>• Performance data analysis</li>
                  <li>• Market feedback integration</li>
                  <li>• Risk model refinement</li>
                  <li>• Return prediction optimization</li>
                </ul>
              </div>

              <div className="bg-rose-50 rounded-lg p-6">
                <h3 className="flex items-center text-lg font-semibold text-rose-900 mb-3">
                  <Cog className="h-5 w-5 mr-2" />
                  System Optimization
                </h3>
                <p className="text-rose-800 mb-4">
                  Continuous system improvements through:
                </p>
                <ul className="space-y-2 text-rose-800">
                  <li>• Algorithm refinement</li>
                  <li>• Process automation</li>
                  <li>• Decision accuracy enhancement</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">Enhanced Returns</h4>
                    <p className="text-gray-600">Optimized investment decisions leading to superior risk-adjusted returns</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">Risk Mitigation</h4>
                    <p className="text-gray-600">Comprehensive risk management through data-driven analysis</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-purple-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">Stakeholder Alignment</h4>
                    <p className="text-gray-600">Balanced approach benefiting both investors and homeowners</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Database className="h-5 w-5 text-indigo-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">Data-Driven Decisions</h4>
                    <p className="text-gray-600">Leveraging vast amounts of data for optimal decision-making</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resources;
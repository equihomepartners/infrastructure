import React, { useState } from 'react';
import { Settings, Brain, LineChart, Target } from 'lucide-react';

const PlatformGuide: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    mandate: true,
    parameters: false,
    thesis: false,
    implementation: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Investment Platform Guide</h1>
        <p className="text-xl text-gray-700 leading-relaxed">
          Our AI-powered investment platform combines sophisticated machine learning with deep real estate expertise 
          to identify, analyze, and execute high-performing property investments.
        </p>
      </div>

      {/* Fund Mandate Section */}
      <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        <button 
          onClick={() => toggleSection('mandate')}
          className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-2xl"
        >
          <div className="flex items-center gap-4">
            <Settings className="h-8 w-8 text-gray-700" />
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900">Fund Mandate</h2>
              <p className="text-gray-600">Core investment philosophy and objectives</p>
            </div>
          </div>
        </button>
        
        {expandedSections.mandate && (
          <div className="px-8 pb-8">
            <div className="prose prose-lg max-w-none text-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Investment Philosophy</h3>
              <div className="bg-gray-50 p-6 rounded-xl mb-6">
                <p className="mb-4">
                  Our fund combines data-driven decision making with deep real estate expertise to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Identify emerging market opportunities before they become widely recognized</li>
                  <li>Execute with precision through AI-powered analysis and risk management</li>
                  <li>Optimize returns through strategic timing and value-add opportunities</li>
                  <li>Scale efficiently while maintaining investment discipline</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Investment Strategies</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Core Strategy</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Focus on premium suburbs with strong fundamentals</li>
                    <li>Target 15% p.a. returns through lower-risk investments</li>
                    <li>Emphasis on capital preservation and steady income</li>
                    <li>Strategic value-add opportunities in established markets</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Growth Strategy</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Target emerging growth corridors and transitioning suburbs</li>
                    <li>Aim for 28% p.a. returns through capital appreciation</li>
                    <li>Focus on infrastructure-driven growth opportunities</li>
                    <li>Active management to accelerate value creation</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Opportunistic Strategy</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>ML-identified special situations and market inefficiencies</li>
                    <li>Target 22%+ p.a. returns through strategic positioning</li>
                    <li>Focus on unique value-add opportunities</li>
                    <li>Higher risk tolerance for exceptional return potential</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Risk Management Framework</h3>
              <div className="bg-gray-50 p-6 rounded-xl">
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Geographic Diversification:</strong> Strategic allocation across markets and submarkets
                  </li>
                  <li>
                    <strong>Risk-Return Alignment:</strong> Clear mapping of risk appetite to investment strategies
                  </li>
                  <li>
                    <strong>Market Cycle Management:</strong> Dynamic adjustment of strategy based on market conditions
                  </li>
                  <li>
                    <strong>Portfolio Construction:</strong> Balanced exposure across risk categories and asset types
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fund Parameters Section */}
      <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        <button 
          onClick={() => toggleSection('parameters')}
          className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-2xl"
        >
          <div className="flex items-center gap-4">
            <Target className="h-8 w-8 text-gray-700" />
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900">Fund Parameters</h2>
              <p className="text-gray-600">Operational framework and investment controls</p>
            </div>
          </div>
        </button>
        
        {expandedSections.parameters && (
          <div className="px-8 pb-8">
            <div className="prose prose-lg max-w-none text-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Investment Parameters</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Asset Selection Criteria</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Property value range: $500K - $5M</li>
                    <li>Minimum rental yield: 4.5%</li>
                    <li>Maximum LVR: 75%</li>
                    <li>Minimum market liquidity score: 7/10</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Portfolio Limits</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Maximum single asset exposure: 15%</li>
                    <li>Maximum suburb concentration: 25%</li>
                    <li>Minimum number of assets: 12</li>
                    <li>Maximum development exposure: 30%</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Return Targets</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Core portfolio IRR: 15-18%</li>
                    <li>Growth portfolio IRR: 25-30%</li>
                    <li>Opportunistic deals IRR: 22-35%</li>
                    <li>Minimum portfolio income yield: 5%</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Risk Controls</h3>
              <div className="bg-gray-50 p-6 rounded-xl">
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Market Risk:</strong> Continuous monitoring of market indicators and early warning signals
                  </li>
                  <li>
                    <strong>Liquidity Risk:</strong> Regular stress testing and maintenance of cash reserves
                  </li>
                  <li>
                    <strong>Operational Risk:</strong> Robust due diligence and compliance procedures
                  </li>
                  <li>
                    <strong>Concentration Risk:</strong> Diversification requirements and exposure limits
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Investment Thesis Section */}
      <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        <button 
          onClick={() => toggleSection('thesis')}
          className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-2xl"
        >
          <div className="flex items-center gap-4">
            <Brain className="h-8 w-8 text-gray-700" />
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900">Investment Thesis</h2>
              <p className="text-gray-600">Market analysis and opportunity identification</p>
            </div>
          </div>
        </button>
        
        {expandedSections.thesis && (
          <div className="px-8 pb-8">
            <div className="prose prose-lg max-w-none text-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Traffic Light Investment Zones</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-green-700 mb-3">Green Zone Investment Thesis</h4>
                  <p className="mb-4">Premium markets with proven performance:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Strong historical returns and market stability</li>
                    <li>High-quality property stock and tenant demographics</li>
                    <li>Established infrastructure and amenities</li>
                    <li>Defensive characteristics in market downturns</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-orange-700 mb-3">Orange Zone Investment Thesis</h4>
                  <p className="mb-4">Emerging markets with growth catalysts:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Infrastructure development driving value appreciation</li>
                    <li>Demographic shifts creating new demand</li>
                    <li>Improving amenity and lifestyle factors</li>
                    <li>Price growth momentum and market depth</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-red-700 mb-3">Red Zone Considerations</h4>
                  <p className="mb-4">Higher risk areas requiring special analysis:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Specific catalysts for value creation</li>
                    <li>Clear exit strategy and risk mitigation</li>
                    <li>Unique market opportunities or inefficiencies</li>
                    <li>Higher return potential to compensate for risk</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">ML Analysis Framework</h3>
              <div className="bg-gray-50 p-6 rounded-xl">
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Market Analysis:</strong>
                    <ul className="list-disc pl-6 mt-2">
                      <li>Price trends and growth patterns</li>
                      <li>Supply and demand dynamics</li>
                      <li>Market depth and liquidity</li>
                      <li>Rental market analysis</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Growth Drivers:</strong>
                    <ul className="list-disc pl-6 mt-2">
                      <li>Infrastructure development impact</li>
                      <li>Population and employment growth</li>
                      <li>Economic diversification</li>
                      <li>Lifestyle and amenity improvements</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Implementation Section */}
      <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        <button 
          onClick={() => toggleSection('implementation')}
          className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-2xl"
        >
          <div className="flex items-center gap-4">
            <LineChart className="h-8 w-8 text-gray-700" />
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900">Implementation</h2>
              <p className="text-gray-600">Underwriting process and pipeline management</p>
            </div>
          </div>
        </button>
        
        {expandedSections.implementation && (
          <div className="px-8 pb-8">
            <div className="prose prose-lg max-w-none text-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Underwriting Process</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Initial Screening</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>ML-powered opportunity identification</li>
                    <li>Automated parameter compliance check</li>
                    <li>Preliminary return analysis</li>
                    <li>Risk factor assessment</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Detailed Analysis</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Comprehensive market research</li>
                    <li>Property condition assessment</li>
                    <li>Financial modeling and scenarios</li>
                    <li>Risk mitigation planning</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Investment Committee</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Deal presentation and review</li>
                    <li>Risk-return assessment</li>
                    <li>Portfolio fit analysis</li>
                    <li>Final approval process</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Pipeline Management</h3>
              <div className="bg-gray-50 p-6 rounded-xl">
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Deal Flow Management:</strong>
                    <ul className="list-disc pl-6 mt-2">
                      <li>Opportunity tracking and prioritization</li>
                      <li>Resource allocation optimization</li>
                      <li>Timeline and milestone monitoring</li>
                      <li>Stakeholder communication</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Portfolio Integration:</strong>
                    <ul className="list-disc pl-6 mt-2">
                      <li>Portfolio balance assessment</li>
                      <li>Risk exposure management</li>
                      <li>Performance tracking</li>
                      <li>Strategy alignment verification</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformGuide; 
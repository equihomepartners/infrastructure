import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, X } from 'lucide-react';
import TrafficLightZones from './TrafficLightZones';
import FrontrunSuburbs from './FrontrunSuburbs';
import FundParameters from './FundParameters';
import DataFeeds from '../data-feeds/DataFeeds';

const CIODashboard: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowInfo(false);
    }
  };

  return (
    <div className="p-6">
      <div className="text-center mb-6 relative">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-4xl font-bold">CIO Dashboard</h1>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-mono">
            alpha
          </span>
        </div>
        <p className="text-gray-600 text-xl mt-2 mb-4">Control center for our AI/ML underwriting system</p>
        
        <button 
          onClick={() => setShowInfo(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition-colors"
        >
          <Info className="h-5 w-5" />
          <span className="font-medium">Learn about this dashboard</span>
        </button>
      </div>

      {showInfo && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-xl shadow-xl max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">CIO Dashboard Overview</h2>
                <button 
                  onClick={() => setShowInfo(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Fund Parameters</h3>
                <div className="space-y-6 text-gray-600">
                  <div>
                    <p className="mb-4">
                      The Fund Parameters section serves as the primary control interface for the fund's investment 
                      strategy and risk management framework. These parameters directly influence the AI/ML underwriting 
                      system's decision-making process and portfolio construction methodology.
                    </p>
                    
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                      <h4 className="font-medium text-blue-900 mb-2">Strategic Investment Control</h4>
                      <p className="text-blue-800">
                        Investment strategy control enables precise calibration of risk-return parameters, geographic 
                        exposure limits, and portfolio composition targets. This granular control ensures the fund's 
                        deployment aligns with market conditions while maintaining optimal risk-adjusted returns.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Investment Strategy Presets</h4>
                        <p className="mb-3">Each preset represents a comprehensive investment approach with specific risk-return characteristics:</p>
                        
                        <div className="space-y-4 pl-4">
                          <div>
                            <h5 className="font-medium text-gray-800">Premium Suburbs Strategy (Lower Risk)</h5>
                            <p className="mb-2">
                              A conservative approach focusing on established premium markets with strong fundamentals:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Prioritizes capital preservation with consistent returns</li>
                              <li>15% target return through high-quality, lower-risk assets</li>
                              <li>Concentrated exposure to premium suburbs with proven performance</li>
                              <li>Strict LTV controls and conservative underwriting parameters</li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium text-gray-800">Growth Corridors Strategy (Higher Return)</h5>
                            <p className="mb-2">
                              Targets emerging markets with strong appreciation potential and infrastructure development:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Aggressive growth targeting with 28% return objective</li>
                              <li>Higher exposure limits in identified growth corridors</li>
                              <li>Enhanced LTV ratios for increased market participation</li>
                              <li>Dynamic risk management for emerging market opportunities</li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium text-gray-800">ML-Optimized Strategy (Data-Driven)</h5>
                            <p className="mb-2">
                              Machine learning-powered approach combining market analysis with risk optimization:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Real-time market data analysis for optimal positioning</li>
                              <li>22% target return through balanced portfolio construction</li>
                              <li>Dynamic allocation between premium and growth markets</li>
                              <li>Continuous parameter optimization based on market conditions</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Portfolio Management Integration</h4>
                        <p className="mb-3">
                          Strategy selection automatically configures multiple portfolio management parameters:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            <span className="font-medium">Underwriting Framework:</span> Configures property valuation 
                            thresholds, risk assessment criteria, and approval parameters
                          </li>
                          <li>
                            <span className="font-medium">Risk Controls:</span> Establishes LTV limits, concentration 
                            thresholds, and exposure caps across different market segments
                          </li>
                          <li>
                            <span className="font-medium">Deal Prioritization:</span> Sets deal scoring criteria and 
                            pipeline management priorities based on strategy objectives
                          </li>
                          <li>
                            <span className="font-medium">Portfolio Construction:</span> Defines target allocations 
                            across geographic zones and property segments
                          </li>
                        </ul>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-2">Strategy Implementation</h4>
                        <p className="text-green-800">
                          The Growth Corridors strategy implementation example:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-green-800">
                          <li>Increases exposure limits in identified growth corridors to 25%</li>
                          <li>Adjusts LTV thresholds up to 75% in strong growth areas</li>
                          <li>Modifies risk scoring to favor high-growth market indicators</li>
                          <li>Expands property value ranges for emerging market opportunities</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Traffic Light Zones</h3>
                <div className="space-y-4 text-gray-600">
                  <p>The Traffic Light Zones system is our proprietary geographic risk assessment framework that categorizes suburbs based on investment potential:</p>
                  <div className="pl-4 space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">Zone Classifications</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li><span className="text-green-600 font-medium">Green Zones:</span> Premium suburbs with strong fundamentals and proven track records</li>
                        <li><span className="text-orange-600 font-medium">Orange Zones:</span> Transitioning areas with emerging potential and moderate risk</li>
                        <li><span className="text-red-600 font-medium">Red Zones:</span> Higher risk areas requiring careful consideration and enhanced due diligence</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Dynamic Analysis</h4>
                      <p>Continuous monitoring and assessment of:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li>Market performance metrics</li>
                        <li>Infrastructure developments</li>
                        <li>Demographic trends</li>
                        <li>Economic indicators</li>
                        <li>Risk factor evolution</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Suburb Transition Forecasting</h3>
                <div className="space-y-4 text-gray-600">
                  <p>Our advanced ML system predicts suburb transitions and identifies emerging opportunities:</p>
                  <div className="pl-4 space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">Predictive Analytics</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li>ML-powered analysis of suburb trajectory</li>
                        <li>Early identification of growth catalysts</li>
                        <li>Risk-adjusted opportunity scoring</li>
                        <li>Transition probability modeling</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Growth Indicators</h4>
                      <p>Comprehensive analysis of:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li>Infrastructure development impact</li>
                        <li>Demographic shifts and trends</li>
                        <li>Economic development patterns</li>
                        <li>Market sentiment indicators</li>
                        <li>Comparable suburb analysis</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Strategic Applications</h4>
                      <p>Use this information to:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li>Identify early-stage growth opportunities</li>
                        <li>Optimize entry and exit timing</li>
                        <li>Manage portfolio geographic exposure</li>
                        <li>Balance risk and return across zones</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Tabs defaultValue="fund-parameters">
        <TabsList>
          <TabsTrigger value="fund-parameters">
            Fund Parameters
          </TabsTrigger>
          <TabsTrigger value="traffic-light">
            Traffic Light Zones
          </TabsTrigger>
          <TabsTrigger value="frontrun">
            Suburb Transition Forecasting
          </TabsTrigger>
          <TabsTrigger value="data-feeds">
            Data Feed Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fund-parameters">
          <FundParameters />
        </TabsContent>

        <TabsContent value="traffic-light">
          <TrafficLightZones />
        </TabsContent>

        <TabsContent value="frontrun">
          <FrontrunSuburbs />
        </TabsContent>

        <TabsContent value="data-feeds">
          <DataFeeds />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CIODashboard;
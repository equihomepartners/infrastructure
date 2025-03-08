import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import PortfolioModel from './PortfolioModel';
import RiskAnalysis from './RiskAnalysis';
import ScenarioAnalysis from './ScenarioAnalysis';
import { useFundStore } from './fundStore';
import { Line } from 'react-chartjs-2';
import { 
  DollarSign, 
  TrendingUp, 
  Building2, 
  Clock, 
  AlertTriangle, 
  MessageSquare, 
  Send,
  Percent,
  Users,
  BarChart,
  Calendar,
  Target,
  Shield
} from 'lucide-react';

const FundModelTabs: React.FC = () => {
  const { 
    inputs, 
    updateInput, 
    updateMarketConditions, 
    updateDeploymentSchedule, 
    updateCapitalStructure,
    updateFundManagerFees
  } = useFundStore();

  const [aiMessage, setAiMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);

  const handleAiChat = async () => {
    if (!aiMessage.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { role: 'user', content: aiMessage }]);

    try {
      // Call OpenAI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: aiMessage,
          fundInputs: inputs
        }),
      });

      const data = await response.json();
      
      // Add AI response to chat
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.response }]);
      setAiMessage('');
    } catch (error) {
      console.error('Error calling AI:', error);
    }
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="variables" className="w-full">
      <div className="flex justify-center mb-8">
          <TabsList className="bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="variables" className="px-4 py-2">Variables & Scenarios</TabsTrigger>
            <TabsTrigger value="model" className="px-4 py-2">Model & Forecasts</TabsTrigger>
            <TabsTrigger value="ai" className="px-4 py-2">AI Assistant</TabsTrigger>
        </TabsList>
      </div>

        <TabsContent value="variables">
          <div className="space-y-8">
            {/* Fund Overview Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <Card className="p-4 flex items-center space-x-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fund Size</p>
                  <p className="text-lg font-semibold">${(inputs.fundSize / 1000000).toFixed(1)}M</p>
                </div>
              </Card>
              <Card className="p-4 flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Investment Period</p>
                  <p className="text-lg font-semibold">{inputs.investmentPeriod} Years</p>
                </div>
              </Card>
              <Card className="p-4 flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Target IRR</p>
                  <p className="text-lg font-semibold">{(inputs.fundPerformance.tenYearIRR * 100).toFixed(1)}%</p>
                </div>
              </Card>
              <Card className="p-4 flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Risk Score</p>
                  <p className="text-lg font-semibold">{(inputs.riskMetrics.volatilityScore * 100).toFixed(1)}%</p>
                </div>
              </Card>
            </div>

            {/* Main Configuration Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fund Parameters */}
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Building2 className="h-5 w-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Fund Parameters</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fund Size
                      <span className="text-xs text-gray-500 ml-2">Total capital to be deployed</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="number"
                        value={inputs.fundSize}
                        onChange={(e) => updateInput('fundSize', Number(e.target.value))}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">USD</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Investment Period
                        <span className="text-xs text-gray-500 ml-2">Deployment timeline</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="number"
                          value={inputs.investmentPeriod}
                          onChange={(e) => updateInput('investmentPeriod', Number(e.target.value))}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">Years</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fund Term
                        <span className="text-xs text-gray-500 ml-2">Total duration</span>
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="number"
                          value={inputs.fundTerm}
                          onChange={(e) => updateInput('fundTerm', Number(e.target.value))}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">Years</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Fee Structure */}
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Percent className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Fee Structure</h3>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Management Fee
                        <span className="text-xs text-gray-500 ml-2">Annual fee</span>
                      </label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="number"
                          value={inputs.fundManagerFees.managementFee * 100}
                          onChange={(e) => updateFundManagerFees({ managementFee: Number(e.target.value) / 100 })}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Performance Fee
                        <span className="text-xs text-gray-500 ml-2">Carried interest</span>
                      </label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="number"
                          value={inputs.fundManagerFees.performanceFee * 100}
                          onChange={(e) => updateFundManagerFees({ performanceFee: Number(e.target.value) / 100 })}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hurdle Rate
                        <span className="text-xs text-gray-500 ml-2">Preferred return</span>
                      </label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="number"
                          value={inputs.fundManagerFees.hurdleRate * 100}
                          onChange={(e) => updateFundManagerFees({ hurdleRate: Number(e.target.value) / 100 })}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catch-up Rate
                        <span className="text-xs text-gray-500 ml-2">GP catch-up</span>
                      </label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="number"
                          value={inputs.fundManagerFees.catchUpRate * 100}
                          onChange={(e) => updateFundManagerFees({ catchUpRate: Number(e.target.value) / 100 })}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Waterfall Structure */}
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Waterfall Structure</h3>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Return
                        <span className="text-xs text-gray-500 ml-2">LP priority return</span>
                      </label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="number"
                          value={inputs.capitalStructure.preferredReturn * 100}
                          onChange={(e) => updateCapitalStructure({ preferredReturn: Number(e.target.value) / 100 })}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LP Split
                        <span className="text-xs text-gray-500 ml-2">After catch-up</span>
                      </label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="number"
                          value={inputs.capitalStructure.lpSplit * 100}
                          onChange={(e) => updateCapitalStructure({ lpSplit: Number(e.target.value) / 100 })}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reinvestment Rate
                      <span className="text-xs text-gray-500 ml-2">Capital recycling</span>
                    </label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="number"
                        value={inputs.capitalStructure.reinvestmentRate * 100}
                        onChange={(e) => updateCapitalStructure({ reinvestmentRate: Number(e.target.value) / 100 })}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Market Assumptions */}
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <BarChart className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Market Assumptions</h3>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Appreciation
                        <span className="text-xs text-gray-500 ml-2">Annual growth</span>
                      </label>
                      <div className="relative">
                        <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="number"
                          value={inputs.growthAssumptions.propertyAppreciation * 100}
                          onChange={(e) => updateInput('growthAssumptions', { 
                            ...inputs.growthAssumptions, 
                            propertyAppreciation: Number(e.target.value) / 100 
                          })}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Market Volatility
                        <span className="text-xs text-gray-500 ml-2">Price fluctuation</span>
                      </label>
                      <div className="relative">
                        <AlertTriangle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="number"
                          value={inputs.growthAssumptions.marketVolatility * 100}
                          onChange={(e) => updateInput('growthAssumptions', { 
                            ...inputs.growthAssumptions, 
                            marketVolatility: Number(e.target.value) / 100 
                          })}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Interest Rate
                        <span className="text-xs text-gray-500 ml-2">Borrowing cost</span>
                      </label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="number"
                          value={inputs.marketConditions.interestRates[0] * 100}
                          onChange={(e) => {
                            const newRates = Array(5).fill(Number(e.target.value) / 100);
                            updateMarketConditions({ interestRates: newRates });
                          }}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exit Timeframe
                        <span className="text-xs text-gray-500 ml-2">Average hold period</span>
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="number"
                          value={inputs.growthAssumptions.exitTimeframe}
                          onChange={(e) => updateInput('growthAssumptions', { 
                            ...inputs.growthAssumptions, 
                            exitTimeframe: Number(e.target.value)
                          })}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">Years</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
      </TabsContent>

        <TabsContent value="model">
          <div className="space-y-8">
        <PortfolioModel />
        <RiskAnalysis />
            <ScenarioAnalysis />
          </div>
      </TabsContent>

        {/* AI Assistant Tab Content */}
        <TabsContent value="ai">
          <div className="space-y-4">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="h-96 overflow-y-auto border rounded-lg p-4">
                  {chatHistory.map((msg, index) => (
                    <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block p-3 rounded-lg ${
                        msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={aiMessage}
                    onChange={(e) => setAiMessage(e.target.value)}
                    placeholder="Ask about fund performance, risks, or suggest changes..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleAiChat()}
                  />
                  <button
                    onClick={handleAiChat}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </Card>
          </div>
      </TabsContent>
    </Tabs>
    </div>
  );
};

export default FundModelTabs;
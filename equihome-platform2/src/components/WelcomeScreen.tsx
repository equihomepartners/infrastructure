import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, List, Brain, Database, Shield, Building2, BarChart3, Clock, DollarSign, FileText, LineChart, Search, BarChart2, FileSpreadsheet, UserCheck, AlertTriangle, FileSearch, Presentation } from 'lucide-react';
import Logo from './Logo';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center pt-20 pb-16">
          <div className="mb-12">
            <Logo />
          </div>
          
          <div className="text-center mb-6">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">
              Equihome Platform Demo
            </h1>
            <div className="inline-flex items-center justify-center space-x-2 px-4 py-1.5 bg-green-50 rounded-full">
              <span className="text-sm font-medium text-green-600">Platform Demo</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-mono">
                v1.32
              </span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-mono">
                alpha
              </span>
            </div>
          </div>

          <div className="text-xl text-gray-600 max-w-3xl text-center mb-6">
            Experience our sophisticated underwriting and portfolio management platform
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-12 max-w-3xl w-full">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  For optimal experience, please access this demo on a laptop or desktop computer. 
                  Mobile viewing may not provide the best visualization of our platform's features.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-5xl space-y-8 mb-16">
            {/* Data Partner Integration */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-blue-100">
              <div className="flex items-center text-blue-700 mb-6">
                <Database className="h-8 w-8 mr-3" />
                <div>
                  <h3 className="text-2xl font-semibold">Data Partner Integration</h3>
                  <div className="mt-1">
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-4 py-1.5 rounded-full border-2 border-green-200 shadow-sm">
                      At Production
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Through our data partners, we leverage over 4 trillion data points for precise property analysis:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-100">
                    <div className="flex items-center mb-3">
                      <Search className="h-6 w-6 text-blue-700 mr-2" />
                      <span className="font-bold text-lg text-blue-900">95-100% Accuracy</span>
                    </div>
                    <p className="text-sm text-blue-700">Hyper-accurate valuations powered by comprehensive data analysis and machine learning</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-3">
                      <LineChart className="h-6 w-6 text-blue-700 mr-2" />
                      <span className="font-semibold text-lg text-gray-900">Market Intelligence</span>
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">Macro Factors:</span>
                        <p className="text-gray-600">Interest rates, inflation, employment</p>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">Market Metrics:</span>
                        <p className="text-gray-600">Median prices, rental yields, supply/demand</p>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">Local Insights:</span>
                        <p className="text-gray-600">Demographics, infrastructure, suburb data</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Operational Efficiency */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center text-blue-700 mb-6">
                <Clock className="h-8 w-8 mr-3" />
                <h3 className="text-2xl font-semibold">Operational Efficiency</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Clock className="h-6 w-6 text-blue-700 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-900">Processing Time</h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">Traditional Process</div>
                      <div className="text-2xl font-bold text-gray-900">30 days</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Equihome Platform</div>
                      <div className="text-2xl font-bold text-blue-700">&lt; 5 minutes</div>
                      <div className="text-xs text-blue-600 mt-1">99.9% reduction in processing time</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <BarChart3 className="h-6 w-6 text-blue-700 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-900">Cost Reduction</h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">Traditional Financial Analysts</div>
                      <div className="text-2xl font-bold text-blue-700">95% reduction</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Deal Analysis Speed</div>
                      <div className="text-2xl font-bold text-blue-700">10,000% faster</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-blue-700 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-900">Automation</h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">Valuation Process</div>
                      <div className="text-2xl font-bold text-blue-700">100% automated</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Risk Assessment</div>
                      <div className="text-2xl font-bold text-blue-700">Real-time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI/ML Capabilities */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center text-blue-700 mb-6">
                <Brain className="h-8 w-8 mr-3" />
                <h3 className="text-2xl font-semibold">AI/ML Capabilities</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Intelligent Decision Making</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Advanced risk assessment algorithms</li>
                    <li>• Automated valuation adjustments</li>
                    <li>• Dynamic deal structuring</li>
                    <li>• Real-time market analysis</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Continuous Learning</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Portfolio performance optimization</li>
                    <li>• Market trend prediction</li>
                    <li>• Risk model refinement</li>
                    <li>• Return forecasting</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Platform Applications */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center text-blue-700 mb-6">
                <FileText className="h-8 w-8 mr-3" />
                <h3 className="text-2xl font-semibold">Platform Applications</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <BarChart2 className="h-6 w-6 text-blue-700 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-900">Real-Time Underwriting</h4>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Process 100s of applications daily</li>
                    <li>• Instant risk assessment</li>
                    <li>• Automated dealflow management</li>
                    <li>• Continuous pipeline analysis</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <BarChart3 className="h-6 w-6 text-blue-700 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-900">Portfolio Management</h4>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Real-time performance tracking</li>
                    <li>• Risk monitoring</li>
                    <li>• Return optimization</li>
                    <li>• Market analysis</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <FileSpreadsheet className="h-6 w-6 text-blue-700 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-900">Comprehensive Reporting</h4>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Automated asset reports</li>
                    <li>• Performance analytics</li>
                    <li>• Risk metrics tracking</li>
                    <li>• Market insights</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* KYC and AML Section */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center text-blue-700 mb-6">
                <UserCheck className="h-8 w-8 mr-3" />
                <h3 className="text-2xl font-semibold">KYC & AML Compliance</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <FileSearch className="h-6 w-6 text-blue-700 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-900">Automated Verification</h4>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Real-time identity verification</li>
                    <li>• Document authenticity checks</li>
                    <li>• Biometric validation</li>
                    <li>• Digital signature integration</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-blue-700 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-900">Risk Screening</h4>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Global sanctions screening</li>
                    <li>• PEP checks</li>
                    <li>• Adverse media monitoring</li>
                    <li>• Continuous risk assessment</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-blue-700 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-900">Compliance Management</h4>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Automated compliance reporting</li>
                    <li>• Regulatory updates integration</li>
                    <li>• Audit trail maintenance</li>
                    <li>• Secure data management</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/cio"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-green-500 hover:bg-green-600 shadow-sm hover:shadow-md transition-all"
            >
              Explore Platform
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              to="/guided-demo"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-200 text-lg font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 shadow-sm hover:shadow-md transition-all"
            >
              Take Guided Demo
              <Presentation className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
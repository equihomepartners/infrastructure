import React from 'react';
import { Home, TrendingUp, Database, LineChart, Brain, ShieldCheck, GitBranch, RefreshCcw } from 'lucide-react';

const UnderwriteSystemDeepDive: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Underwriting System Deep Dive
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our sophisticated AI-driven underwriting process that ensures optimal investment decisions
        </p>
      </div>

      {/* Data Collection Section */}
      <section className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Collection</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
              alt="Data Collection Process"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-blue-900 mb-3">
                <Home className="h-5 w-5 mr-2" />
                Homeowner Data Collection
              </h3>
              <p className="text-blue-800">
                This includes gathering key details such as the property address, mortgage balance, and income. 
                These factors form the cornerstone of our underwriting system and serve as the basis for the 
                initial financial screening process.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-green-900 mb-3">
                <Database className="h-5 w-5 mr-2" />
                PropTrack API Inputs
              </h3>
              <p className="text-green-800">
                We utilise the PropTrack API to automatically retrieve property information and valuations, 
                drawing from a vast database of over 1 trillion data points. The Automated Valuation Model (AVM) 
                applies a high-low valuation adjustment based on the specific property.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-yellow-900 mb-3">
                <TrendingUp className="h-5 w-5 mr-2" />
                Historical Property Growth Data
              </h3>
              <p className="text-yellow-800">
                Our underwriting system is built on historical monthly property growth data, government reports, 
                and forecast models. These inputs are updated monthly and are critical in projecting deal returns 
                and ensuring accurate forecasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Assessment Section */}
      <section className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Risk Assessment and Loan Viability Analysis</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-purple-900 mb-3">
                <LineChart className="h-5 w-5 mr-2" />
                Financial Metrics Calculation
              </h3>
              <p className="text-purple-800">
                This process integrates homeowner financial data with risk-adjusted property values to calculate 
                key metrics such as Loan-to-Value (LTV) ratios, ensuring a balanced assessment of risk.
              </p>
            </div>

            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-indigo-900 mb-3">
                <Brain className="h-5 w-5 mr-2" />
                Fund Input Parameters
              </h3>
              <p className="text-indigo-800">
                Leverages historical data from previous underwriting decisions and approved loans to guide 
                AI-driven decision-making. The parameters include:
              </p>
              <ul className="list-disc list-inside mt-3 text-indigo-800">
                <li>Fund diversification targets (e.g., LTV ratios, loan amounts, geographic distribution)</li>
                <li>The target Internal Rate of Return (IRR) that the fund aims to achieve</li>
                <li>Ongoing adjustments based on the fund's performance and strategic objectives</li>
              </ul>
            </div>

            <div className="bg-pink-50 rounded-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-pink-900 mb-3">
                <ShieldCheck className="h-5 w-5 mr-2" />
                AI Decision Making
              </h3>
              <p className="text-pink-800">
                Our AI system processes all inputs through sophisticated algorithms to make data-driven lending 
                decisions, ensuring optimal risk-adjusted returns for our investment portfolio.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
              alt="Risk Assessment Process"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Decision Making Section */}
      <section className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Decision Making</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
              alt="Loan Application Process Funnel"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-blue-900 mb-3">
                <GitBranch className="h-5 w-5 mr-2" />
                Computation Data
              </h3>
              <p className="text-blue-800">
                The underwriting tool integrates both internal and external data sources to structure deals that enhance 
                the overall performance of the fund. This data-driven approach ensures that each deal aligns with the fund's 
                strategic goals and risk-adjusted return targets.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-green-900 mb-3">
                <Brain className="h-5 w-5 mr-2" />
                AI-Driven Loan Approval
              </h3>
              <p className="text-green-800">
                The system employs advanced AI algorithms to make binary decisions, either approving or rejecting loan 
                applications based on a comprehensive analysis of risk and projected returns.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-yellow-900 mb-3">
                <LineChart className="h-5 w-5 mr-2" />
                Term Sheet Generation
              </h3>
              <p className="text-yellow-800">
                For approved applications, the system automatically generates a term sheet, detailing the loan amount, 
                repayment terms, and the equity available for the homeowner to unlock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Post Decision Learning Section */}
      <section className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Post Decision Learning and Adaptation</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-indigo-900 mb-3">
                <Brain className="h-5 w-5 mr-2" />
                Machine Learning Integration
              </h3>
              <p className="text-indigo-800">
                The system uses machine learning to continuously learn from loan outcomes, refining its models to 
                improve prediction accuracy and optimise risk assessments. This process enhances the system's 
                ability to deliver higher returns while mitigating risks.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="flex items-center text-lg font-semibold text-purple-900 mb-3">
                <RefreshCcw className="h-5 w-5 mr-2" />
                Dynamic Fund Management
              </h3>
              <p className="text-purple-800">
                The CIO Dashboard provides real-time updates on fund performance, allowing for strategic adjustments 
                to the AI's criteria. These adjustments ensure the fund stays aligned with current market conditions, 
                optimising performance and risk management.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
              alt="Post Decision Learning Cycle"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default UnderwriteSystemDeepDive;
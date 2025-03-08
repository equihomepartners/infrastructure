import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Info } from 'lucide-react';

const TabInfo: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const location = useLocation();

  const getTabInfo = () => {
    const path = location.pathname;

    if (path.includes('/deals')) {
      return {
        title: 'Example Loan Portfolio',
        content: (
          <div className="space-y-4">
            <p className="text-gray-600">
              This section showcases example loans using real property data from Sydney's premium suburbs. 
              While these specific transactions haven't occurred, they demonstrate how our model would 
              have performed if applied to actual properties that transacted at these prices.
            </p>
            <p className="text-gray-600">
              Each example is based on real market data, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Actual property values and sales history</li>
              <li>Real suburb growth rates and market dynamics</li>
              <li>Genuine property characteristics and features</li>
              <li>Authentic market comparables and trends</li>
            </ul>
          </div>
        )
      };
    }

    if (path.includes('/fund-dashboard')) {
      return {
        title: 'Fund Performance Report',
        content: (
          <div className="space-y-4">
            <p className="text-gray-600">
              The Fund Dashboard provides a comprehensive overview of portfolio performance, risk metrics, 
              and investment returns. This powerful tool enables real-time monitoring of:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Portfolio-wide performance metrics and IRR tracking</li>
              <li>Geographic distribution and concentration analysis</li>
              <li>Risk exposure and mitigation strategies</li>
              <li>Return attribution and component analysis</li>
              <li>Historical performance trends and projections</li>
            </ul>
            <p className="text-gray-600">
              Use this dashboard to understand portfolio composition, track performance metrics, 
              and identify optimization opportunities across the fund.
            </p>
          </div>
        )
      };
    }

    if (path.includes('/underwrite')) {
      return {
        title: 'AI Underwriting System',
        content: (
          <div className="space-y-4">
            <p className="text-gray-600">
              Our AI-powered underwriting system processes loan applications instantly, leveraging machine 
              learning to make data-driven lending decisions. This internal system:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Processes applications in real-time with instant decisions</li>
              <li>Analyzes multiple data points for comprehensive risk assessment</li>
              <li>Projects returns and optimal exit timing</li>
              <li>Evaluates portfolio fit and concentration risks</li>
              <li>Continuously learns and adapts from portfolio performance</li>
            </ul>
            <p className="text-gray-600">
              The system automatically adjusts its parameters based on fund performance, market conditions, 
              and portfolio composition, ensuring optimal decision-making aligned with fund objectives.
            </p>
          </div>
        )
      };
    }

    if (path.includes('/cio-dashboard')) {
      return {
        title: 'CIO Control Center',
        content: (
          <div className="space-y-4">
            <p className="text-gray-600">
              The CIO Dashboard serves as the control center for our AI underwriting system, allowing 
              precise calibration of investment parameters and risk controls. This powerful interface enables:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Dynamic adjustment of fund parameters affecting AI decisions</li>
              <li>Real-time modification of risk tolerance and return targets</li>
              <li>Geographic exposure management through zone allocations</li>
              <li>Portfolio composition control and optimization</li>
            </ul>
            <p className="text-gray-600">
              Changes made here directly influence the AI underwriting model's decision-making process, 
              ensuring alignment with fund strategy and market conditions. The system provides immediate 
              feedback on parameter adjustments and their impact on portfolio metrics.
            </p>
          </div>
        )
      };
    }

    if (path.includes('/pipeline')) {
      return {
        title: 'Pipeline Management',
        content: (
          <div className="space-y-4">
            <p className="text-gray-600">
              The Pipeline Management system leverages predictive analytics and machine learning to 
              optimize deal selection and portfolio composition. This dynamic system:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Continuously learns from historical and current performance data</li>
              <li>Predicts deal outcomes and portfolio impacts</li>
              <li>Identifies optimal opportunities aligned with fund strategy</li>
              <li>Adapts to changing market conditions and fund parameters</li>
              <li>Provides real-time analytics on pipeline quality and composition</li>
            </ul>
            <p className="text-gray-600">
              The system's iterative learning process ensures increasingly accurate predictions and 
              recommendations, helping maintain optimal portfolio composition and risk-adjusted returns.
            </p>
          </div>
        )
      };
    }

    return {
      title: 'Welcome to Equihome Platform',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Welcome to our comprehensive platform demonstration. Navigate through different sections 
            to explore our sophisticated underwriting and portfolio management capabilities.
          </p>
        </div>
      )
    };
  };

  const tabInfo = getTabInfo();

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Info className="h-5 w-5 text-blue-500" />
        <span className="font-medium">About This Section</span>
      </button>

      {showInfo && (
        <div className="absolute top-12 left-0 w-[600px] bg-white rounded-lg shadow-xl p-6 mt-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{tabInfo.title}</h3>
            <button
              onClick={() => setShowInfo(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              ×
            </button>
          </div>
          {tabInfo.content}
        </div>
      )}
    </div>
  );
};

export default TabInfo;
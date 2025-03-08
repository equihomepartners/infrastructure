import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, List } from 'lucide-react';
import Logo from '../Logo';
import ExecutiveSummary from './ExecutiveSummary';
import PerformanceOverview from './PerformanceOverview';
import MarketAnalysis from './MarketAnalysis';
import RiskMetrics from './RiskMetrics';
import AssetClassComparison from './AssetClassComparison';
import USComparison from './USComparison';

const AssetReport: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showContents, setShowContents] = useState(false);

  const pages = [
    {
      title: "Executive Summary",
      component: <ExecutiveSummary />
    },
    {
      title: "Performance Overview",
      component: <PerformanceOverview />
    },
    {
      title: "Market Analysis",
      component: <MarketAnalysis />
    },
    {
      title: "Risk Metrics",
      component: <RiskMetrics />
    },
    {
      title: "Asset Class Comparison",
      component: <AssetClassComparison />
    },
    {
      title: "US Market Comparison",
      component: <USComparison />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/welcome" className="flex items-center text-gray-700 hover:text-gray-900">
              <Home className="h-5 w-5 mr-2" />
              <span className="font-medium">Home</span>
            </Link>
            <button
              onClick={() => setShowContents(!showContents)}
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <List className="h-5 w-5 mr-2" />
              <span className="font-medium">Contents</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contents Overlay */}
      {showContents && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Contents</h3>
              <button
                onClick={() => setShowContents(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {pages.map((page, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentPage(index);
                    setShowContents(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    currentPage === index
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {index + 1}. {page.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Report Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Sample Asset Report
            <span className="text-gray-500 text-lg ml-3">(Demo Data)</span>
          </h1>
          <div className="text-gray-500">March 11, 2024</div>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-6"></div>
        </div>

        {/* Page Content */}
        <div className="mb-12">
          {pages[currentPage].component}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous
          </button>
          
          <div className="text-sm text-gray-600">
            Page {currentPage + 1} of {pages.length}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(pages.length - 1, prev + 1))}
            disabled={currentPage === pages.length - 1}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetReport;
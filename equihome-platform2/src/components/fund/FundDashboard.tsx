import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import FundMetrics from './FundMetrics';
import PortfolioDistribution from './PortfolioDistribution';
import GeographicDistribution from './GeographicDistribution';
import CashflowAnalysis from './CashflowAnalysis';
import IncomeAnalysis from './IncomeAnalysis';
import LTVAnalysis from './LTVAnalysis';
import AssetReport from '../AssetReport';
import DriversOfPerformance from './DriversOfPerformance';

const FundDashboard: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4">
      {/* Fund Header */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-8 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-500 mb-1">Quarterly Investment Report</div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Equihome Fund I
              </h1>
              <div className="mt-2 flex items-center space-x-4 text-sm">
                <span className="text-gray-600">Q4 2023</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-600">As of December 31, 2023</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                Download PDF
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                Print Report
              </button>
            </div>
          </div>
        </div>

        {/* Key Fund Information */}
        <div className="grid grid-cols-4 divide-x divide-gray-100">
          <div className="p-6">
            <div className="text-sm text-gray-500">AUM</div>
            <div className="text-xl font-semibold text-gray-900 mt-1">$19.3M</div>
          </div>
          <div className="p-6">
            <div className="text-sm text-gray-500">IRR (Net)</div>
            <div className="text-xl font-semibold text-gray-900 mt-1">16.61%</div>
          </div>
          <div className="p-6">
            <div className="text-sm text-gray-500">Number of Assets</div>
            <div className="text-xl font-semibold text-gray-900 mt-1">8</div>
          </div>
          <div className="p-6">
            <div className="text-sm text-gray-500">Vintage Year</div>
            <div className="text-xl font-semibold text-gray-900 mt-1">2019</div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <Tabs defaultValue="portfolio" className="p-6">
          <TabsList className="border-b border-gray-100 mb-6">
            <TabsTrigger value="portfolio" className="text-sm font-medium px-6 py-3">
              Portfolio Overview
            </TabsTrigger>
            <TabsTrigger value="drivers" className="text-sm font-medium px-6 py-3">
              Drivers of Performance
            </TabsTrigger>
            <TabsTrigger value="asset-report" className="text-sm font-medium px-6 py-3">
              Asset Report
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <FundMetrics />
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <PortfolioDistribution />
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <GeographicDistribution />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <IncomeAnalysis />
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <CashflowAnalysis />
              </div>
            </div>
            <div className="mt-6 bg-gray-50 rounded-lg p-6">
              <LTVAnalysis />
            </div>
          </TabsContent>

          <TabsContent value="drivers">
            <DriversOfPerformance />
          </TabsContent>

          <TabsContent value="asset-report">
            <AssetReport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FundDashboard;
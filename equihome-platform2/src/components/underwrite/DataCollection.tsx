import React from 'react';
import { Database, Home, TrendingUp } from 'lucide-react';

const DataCollection: React.FC = () => (
  <section className="bg-white rounded-lg shadow-sm p-8">
    <div className="flex items-center mb-6">
      <Database className="h-7 w-7 text-indigo-600 mr-3" />
      <h2 className="text-2xl font-bold text-gray-900">Data Collection</h2>
    </div>
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
            Comprehensive gathering of property details, mortgage information, and income verification, 
            forming the foundation of our underwriting assessment.
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="flex items-center text-lg font-semibold text-green-900 mb-3">
            <Database className="h-5 w-5 mr-2" />
            PropTrack Integration
          </h3>
          <p className="text-green-800">
            Advanced property valuation and market analysis through PropTrack's extensive database, 
            providing accurate and current market insights.
          </p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6">
          <h3 className="flex items-center text-lg font-semibold text-yellow-900 mb-3">
            <TrendingUp className="h-5 w-5 mr-2" />
            Growth Analysis
          </h3>
          <p className="text-yellow-800">
            Historical property growth data combined with forward-looking projections to assess 
            long-term value potential and risk factors.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default DataCollection;
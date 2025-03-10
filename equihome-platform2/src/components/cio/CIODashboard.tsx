import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Info, X } from 'lucide-react';
import MLSystemHeader from './MLSystemHeader';
import TrafficLightZones from './TrafficLightZones';
import FrontrunSuburbs from './FrontrunSuburbs';
import FundParameters from './FundParameters';

const CIODashboard: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [activeTab, setActiveTab] = useState('fund-parameters');

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowInfo(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CIO Dashboard</h1>
            <p className="mt-1 text-gray-500">
              Real-time fund performance and market analysis powered by ML
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowInfo(true)}
          >
            <Info className="h-4 w-4 mr-2" />
            Learn More
          </Button>
        </div>
        <MLSystemHeader />
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="fund-parameters">Fund Parameters</TabsTrigger>
          <TabsTrigger value="traffic-light-zones">Traffic Light Zones</TabsTrigger>
          <TabsTrigger value="frontrun-suburbs">Suburb Transition Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="fund-parameters">
          <FundParameters />
        </TabsContent>

        <TabsContent value="traffic-light-zones">
          <TrafficLightZones />
        </TabsContent>

        <TabsContent value="frontrun-suburbs">
          <FrontrunSuburbs />
        </TabsContent>
      </Tabs>

      {/* Info Modal */}
      {showInfo && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleBackdropClick}
        >
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">About CIO Dashboard</h2>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="prose max-w-none">
              <p>
                The CIO Dashboard provides comprehensive insights and analysis for fund management:
              </p>
              <ul>
                <li>Configure fund parameters and investment strategies</li>
                <li>Monitor suburb performance with ML-powered traffic light zoning</li>
                <li>Track emerging opportunities with suburb transition forecasting</li>
              </ul>
              <p>
                Our machine learning models analyze multiple data sources to provide accurate and timely insights for investment decisions.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CIODashboard;
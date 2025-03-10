import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataFeeds from '../data-feeds/DataFeeds';
import MLModelSettings from './MLModelSettings';

const TechnicalSettings: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Technical Settings</h1>
        <p className="mt-2 text-lg text-gray-600">
          Configure AI/ML models and data integrations
        </p>
      </div>

      <Tabs defaultValue="data-infrastructure" className="space-y-8">
        <TabsList className="w-full border-b">
          <TabsTrigger value="data-infrastructure" className="flex-1">
            Data Infrastructure
          </TabsTrigger>
          <TabsTrigger value="ml-model" className="flex-1">
            AI/ML Model
          </TabsTrigger>
        </TabsList>

        <TabsContent value="data-infrastructure">
          <DataFeeds />
        </TabsContent>

        <TabsContent value="ml-model">
          <MLModelSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TechnicalSettings; 
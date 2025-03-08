import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import PipelineOverview from './PipelineOverview';
import DealScoring from './DealScoring';
import PipelineMap from './PipelineMap';
import PipelineDeals from './PipelineDeals';
import PipelineAnalytics from './PipelineAnalytics';

const Pipeline: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Pipeline Management
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          AI-driven deal analysis and portfolio optimization
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deals">Pipeline Deals</TabsTrigger>
            <TabsTrigger value="scoring">Deal Scoring</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="map">Geographic View</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview">
          <PipelineOverview />
        </TabsContent>

        <TabsContent value="deals">
          <PipelineDeals />
        </TabsContent>

        <TabsContent value="scoring">
          <DealScoring />
        </TabsContent>

        <TabsContent value="analytics">
          <PipelineAnalytics />
        </TabsContent>

        <TabsContent value="map">
          <PipelineMap />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Pipeline;
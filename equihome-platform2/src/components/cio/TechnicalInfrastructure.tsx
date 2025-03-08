import React, { useState } from 'react';
import { Brain, Database, Shield, Network, GitBranch, Server, Lock } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import AIArchitectureView from './tech/AIArchitectureView';
import MLPipelineView from './tech/MLPipelineView';
import InfrastructureView from './tech/InfrastructureView';
import SecurityView from './tech/SecurityView';
import AIMLComparisonView from './tech/AIMLComparisonView';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const TechnicalInfrastructure: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Introduction Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Overview</h2>
        <p className="text-gray-600">
          Equihome's technology stack combines strategic AI decision-making with precise ML predictions, 
          powered by a robust infrastructure that processes PropTrack and market data in real-time.
        </p>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="ai" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="ai">Strategic AI</TabsTrigger>
          <TabsTrigger value="ml">ML Pipeline</TabsTrigger>
          <TabsTrigger value="aiml">AI/ML Comparison</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
        </TabsList>

        <TabsContent value="ai">
          <AIArchitectureView />
        </TabsContent>
        <TabsContent value="ml">
          <MLPipelineView />
        </TabsContent>
        <TabsContent value="aiml">
          <AIMLComparisonView />
        </TabsContent>
        <TabsContent value="infrastructure">
          <InfrastructureView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TechnicalInfrastructure;
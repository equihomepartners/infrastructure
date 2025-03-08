import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import AIArchitectureView from './tech/AIArchitectureView';
import MLPipelineView from './tech/MLPipelineView';
import InfrastructureView from './tech/InfrastructureView';
import AIMLComparisonView from './tech/AIMLComparisonView';
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);
const TechnicalInfrastructure = () => {
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Technical Overview" }), _jsx("p", { className: "text-gray-600", children: "Equihome's technology stack combines strategic AI decision-making with precise ML predictions, powered by a robust infrastructure that processes PropTrack and market data in real-time." })] }), _jsxs(Tabs, { defaultValue: "ai", className: "space-y-6", children: [_jsxs(TabsList, { className: "grid grid-cols-4 w-full", children: [_jsx(TabsTrigger, { value: "ai", children: "Strategic AI" }), _jsx(TabsTrigger, { value: "ml", children: "ML Pipeline" }), _jsx(TabsTrigger, { value: "aiml", children: "AI/ML Comparison" }), _jsx(TabsTrigger, { value: "infrastructure", children: "Infrastructure" })] }), _jsx(TabsContent, { value: "ai", children: _jsx(AIArchitectureView, {}) }), _jsx(TabsContent, { value: "ml", children: _jsx(MLPipelineView, {}) }), _jsx(TabsContent, { value: "aiml", children: _jsx(AIMLComparisonView, {}) }), _jsx(TabsContent, { value: "infrastructure", children: _jsx(InfrastructureView, {}) })] })] }));
};
export default TechnicalInfrastructure;

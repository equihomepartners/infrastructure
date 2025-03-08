import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import PipelineOverview from './PipelineOverview';
import DealScoring from './DealScoring';
import PipelineMap from './PipelineMap';
import PipelineDeals from './PipelineDeals';
import PipelineAnalytics from './PipelineAnalytics';
const Pipeline = () => {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Pipeline Management" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "AI-driven deal analysis and portfolio optimization" })] }), _jsxs(Tabs, { defaultValue: "overview", className: "w-full", children: [_jsx("div", { className: "flex justify-center mb-8", children: _jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "deals", children: "Pipeline Deals" }), _jsx(TabsTrigger, { value: "scoring", children: "Deal Scoring" }), _jsx(TabsTrigger, { value: "analytics", children: "Analytics" }), _jsx(TabsTrigger, { value: "map", children: "Geographic View" })] }) }), _jsx(TabsContent, { value: "overview", children: _jsx(PipelineOverview, {}) }), _jsx(TabsContent, { value: "deals", children: _jsx(PipelineDeals, {}) }), _jsx(TabsContent, { value: "scoring", children: _jsx(DealScoring, {}) }), _jsx(TabsContent, { value: "analytics", children: _jsx(PipelineAnalytics, {}) }), _jsx(TabsContent, { value: "map", children: _jsx(PipelineMap, {}) })] })] }));
};
export default Pipeline;

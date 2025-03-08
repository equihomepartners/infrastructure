import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Target, Sliders } from 'lucide-react';
const FundStrategy = () => {
    const [strategies, setStrategies] = useState([
        {
            id: 'conservative',
            name: 'Conservative Growth',
            description: 'Focus on stable, low-risk properties in established areas with strong fundamentals',
            active: true,
            metrics: {
                targetReturn: 12,
                riskLevel: 'Low',
                timeHorizon: '5-7 years'
            }
        },
        {
            id: 'balanced',
            name: 'Balanced Opportunity',
            description: 'Mix of established and growth areas, moderate risk profile with higher return potential',
            active: false,
            metrics: {
                targetReturn: 18,
                riskLevel: 'Medium',
                timeHorizon: '3-5 years'
            }
        },
        {
            id: 'aggressive',
            name: 'High Growth',
            description: 'Target emerging areas with significant appreciation potential, higher risk tolerance',
            active: false,
            metrics: {
                targetReturn: 25,
                riskLevel: 'High',
                timeHorizon: '2-3 years'
            }
        }
    ]);
    const toggleStrategy = (id) => {
        setStrategies(strategies.map(strategy => ({
            ...strategy,
            active: strategy.id === id
        })));
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: strategies.map(strategy => (_jsxs("div", { className: `bg-white rounded-lg shadow-sm p-6 border-2 transition-colors ${strategy.active
                        ? 'border-indigo-500'
                        : 'border-transparent hover:border-gray-200'}`, children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: strategy.name }), _jsx("button", { onClick: () => toggleStrategy(strategy.id), className: `px-3 py-1 rounded-full text-sm font-medium ${strategy.active
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: strategy.active ? 'Active' : 'Select' })] }), _jsx("p", { className: "text-gray-600 text-sm mb-4", children: strategy.description }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Target Return" }), _jsxs("span", { className: "font-medium", children: [strategy.metrics.targetReturn, "%"] })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Risk Level" }), _jsx("span", { className: `font-medium ${strategy.metrics.riskLevel === 'Low'
                                                ? 'text-green-600'
                                                : strategy.metrics.riskLevel === 'Medium'
                                                    ? 'text-yellow-600'
                                                    : 'text-red-600'}`, children: strategy.metrics.riskLevel })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Time Horizon" }), _jsx("span", { className: "font-medium", children: strategy.metrics.timeHorizon })] })] })] }, strategy.id))) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx(Target, { className: "h-5 w-5 text-indigo-600 mr-2" }), _jsx("h3", { className: "text-lg font-semibold", children: "Investment Criteria" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Property Types" }), _jsx("div", { className: "font-medium", children: "Single Family Homes" })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Location Preferences" }), _jsx("div", { className: "font-medium", children: "90% Green Zone, 10% Orange Zone" })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Value Range" }), _jsx("div", { className: "font-medium", children: "$1M - $5M" })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx(Sliders, { className: "h-5 w-5 text-indigo-600 mr-2" }), _jsx("h3", { className: "text-lg font-semibold", children: "Risk Management" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Maximum LTV" }), _jsx("div", { className: "font-medium", children: "75%" })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Geographic Concentration" }), _jsx("div", { className: "font-medium", children: "Max 25% per suburb" })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Property Type Mix" }), _jsx("div", { className: "font-medium", children: "100% Single Family" })] })] })] })] })] }));
};
export default FundStrategy;

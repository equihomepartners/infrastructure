import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, List } from 'lucide-react';
import Logo from '../Logo';
import ExecutiveSummary from './ExecutiveSummary';
import PerformanceOverview from './PerformanceOverview';
import MarketAnalysis from './MarketAnalysis';
import RiskMetrics from './RiskMetrics';
import AssetClassComparison from './AssetClassComparison';
import USComparison from './USComparison';
const AssetReport = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [showContents, setShowContents] = useState(false);
    const pages = [
        {
            title: "Executive Summary",
            component: _jsx(ExecutiveSummary, {})
        },
        {
            title: "Performance Overview",
            component: _jsx(PerformanceOverview, {})
        },
        {
            title: "Market Analysis",
            component: _jsx(MarketAnalysis, {})
        },
        {
            title: "Risk Metrics",
            component: _jsx(RiskMetrics, {})
        },
        {
            title: "Asset Class Comparison",
            component: _jsx(AssetClassComparison, {})
        },
        {
            title: "US Market Comparison",
            component: _jsx(USComparison, {})
        }
    ];
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100", children: [_jsx("div", { className: "bg-white border-b", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between items-center h-16", children: [_jsxs(Link, { to: "/welcome", className: "flex items-center text-gray-700 hover:text-gray-900", children: [_jsx(Home, { className: "h-5 w-5 mr-2" }), _jsx("span", { className: "font-medium", children: "Home" })] }), _jsxs("button", { onClick: () => setShowContents(!showContents), className: "flex items-center text-gray-700 hover:text-gray-900", children: [_jsx(List, { className: "h-5 w-5 mr-2" }), _jsx("span", { className: "font-medium", children: "Contents" })] })] }) }) }), showContents && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20", children: _jsxs("div", { className: "bg-white rounded-lg shadow-xl p-8 max-w-lg w-full mx-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900", children: "Contents" }), _jsx("button", { onClick: () => setShowContents(false), className: "text-gray-500 hover:text-gray-700", children: "\u00D7" })] }), _jsx("div", { className: "space-y-4", children: pages.map((page, index) => (_jsxs("button", { onClick: () => {
                                    setCurrentPage(index);
                                    setShowContents(false);
                                }, className: `w-full text-left px-4 py-3 rounded-lg transition-colors ${currentPage === index
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'hover:bg-gray-50 text-gray-700'}`, children: [index + 1, ". ", page.title] }, index))) })] }) })), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("div", { className: "flex justify-center mb-8", children: _jsx(Logo, {}) }), _jsxs("h1", { className: "text-4xl font-bold text-gray-900 mb-2", children: ["Sample Asset Report", _jsx("span", { className: "text-gray-500 text-lg ml-3", children: "(Demo Data)" })] }), _jsx("div", { className: "text-gray-500", children: "March 11, 2024" }), _jsx("div", { className: "w-20 h-1 bg-indigo-600 mx-auto mt-6" })] }), _jsx("div", { className: "mb-12", children: pages[currentPage].component }), _jsxs("div", { className: "flex items-center justify-between mt-8", children: [_jsxs("button", { onClick: () => setCurrentPage(prev => Math.max(0, prev - 1)), disabled: currentPage === 0, className: "flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed", children: [_jsx(ChevronLeft, { className: "h-5 w-5 mr-2" }), "Previous"] }), _jsxs("div", { className: "text-sm text-gray-600", children: ["Page ", currentPage + 1, " of ", pages.length] }), _jsxs("button", { onClick: () => setCurrentPage(prev => Math.min(pages.length - 1, prev + 1)), disabled: currentPage === pages.length - 1, className: "flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed", children: ["Next", _jsx(ChevronRight, { className: "h-5 w-5 ml-2" })] })] })] })] }));
};
export default AssetReport;

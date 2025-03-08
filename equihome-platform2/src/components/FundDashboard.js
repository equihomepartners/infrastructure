import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import FundMetrics from './fund/FundMetrics';
import PortfolioDistribution from './fund/PortfolioDistribution';
import GeographicDistribution from './fund/GeographicDistribution';
import CashflowAnalysis from './fund/CashflowAnalysis';
import IncomeAnalysis from './fund/IncomeAnalysis';
import LTVAnalysis from './fund/LTVAnalysis';
const FundDashboard = () => {
    return (_jsxs("div", { className: "space-y-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Fund Dashboard" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Comprehensive overview of the fund's performance and portfolio metrics" })] }), _jsxs("div", { className: "bg-blue-50 p-4 rounded-lg mb-4", children: [_jsx("h3", { className: "text-sm font-medium text-blue-900 mb-2", children: "Portfolio Age Analysis" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xs text-blue-600", children: "Average Deal Age" }), _jsx("div", { className: "text-lg font-semibold text-blue-700", children: "5.1 years" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-blue-600", children: "Deal Date Range" }), _jsx("div", { className: "text-lg font-semibold text-blue-700", children: "2/1/2019 - Present" })] })] })] }), _jsx(FundMetrics, {}), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsx(PortfolioDistribution, {}), _jsx(GeographicDistribution, {})] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsx(IncomeAnalysis, {}), _jsx(CashflowAnalysis, {})] }), _jsx(LTVAnalysis, {})] }));
};
export default FundDashboard;

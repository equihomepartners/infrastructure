import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TrendingUp, DollarSign, Percent, Building2 } from 'lucide-react';
import { sampleDeals } from '../../data/sampleDeals';
const FundImpactAnalysis = ({ decision, selectedYear }) => {
    const yearData = decision.returns.yearlyBreakdown[selectedYear - 1];
    // Calculate current AUM from existing deals
    const currentAUM = sampleDeals.reduce((sum, deal) => sum + deal.loanAmount, 0);
    const newAUM = currentAUM + decision.loanAmount;
    // Calculate weighted IRR from existing deals
    const currentIRR = sampleDeals.reduce((sum, deal) => sum + (deal.irr * deal.loanAmount), 0) / currentAUM;
    const newIRR = ((currentIRR * currentAUM) + (yearData.irr * decision.loanAmount)) / newAUM;
    // Calculate weighted LTV
    const currentLTV = sampleDeals.reduce((sum, deal) => sum + (deal.ltv * deal.loanAmount), 0) / currentAUM;
    const newLTV = ((currentLTV * currentAUM) + (decision.ltv * decision.loanAmount)) / newAUM;
    // Calculate portfolio growth
    const currentGrowth = sampleDeals.reduce((sum, deal) => sum + (deal.propertyDetails.yearlyGrowth * deal.loanAmount), 0) / currentAUM;
    const newGrowth = ((currentGrowth * currentAUM) + (yearData.propertyValue * decision.loanAmount / currentAUM)) / newAUM;
    return (_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Fund Impact Analysis" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "bg-white p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Portfolio IRR" }), _jsx(TrendingUp, { className: "h-5 w-5 text-blue-600" })] }), _jsxs("div", { className: "flex justify-between items-baseline", children: [_jsxs("div", { className: "text-lg font-semibold", children: [newIRR.toFixed(2), "%"] }), _jsxs("div", { className: `text-sm ${newIRR > currentIRR ? 'text-green-600' : 'text-red-600'}`, children: [newIRR > currentIRR ? '↑' : '↓', " from ", currentIRR.toFixed(2), "%"] })] })] }), _jsxs("div", { className: "bg-white p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Total AUM" }), _jsx(DollarSign, { className: "h-5 w-5 text-green-600" })] }), _jsxs("div", { className: "flex justify-between items-baseline", children: [_jsxs("div", { className: "text-lg font-semibold", children: ["$", (newAUM / 1000000).toFixed(1), "M"] }), _jsxs("div", { className: "text-sm text-green-600", children: ["\u2191 from $", (currentAUM / 1000000).toFixed(1), "M"] })] })] }), _jsxs("div", { className: "bg-white p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Weighted LTV" }), _jsx(Percent, { className: "h-5 w-5 text-yellow-600" })] }), _jsxs("div", { className: "flex justify-between items-baseline", children: [_jsxs("div", { className: "text-lg font-semibold", children: [newLTV.toFixed(2), "%"] }), _jsxs("div", { className: `text-sm ${newLTV > currentLTV ? 'text-yellow-600' : 'text-green-600'}`, children: [newLTV > currentLTV ? '↑' : '↓', " from ", currentLTV.toFixed(2), "%"] })] })] }), _jsxs("div", { className: "bg-white p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Portfolio Growth" }), _jsx(Building2, { className: "h-5 w-5 text-purple-600" })] }), _jsxs("div", { className: "flex justify-between items-baseline", children: [_jsxs("div", { className: "text-lg font-semibold", children: [newGrowth.toFixed(2), "%"] }), _jsxs("div", { className: `text-sm ${newGrowth > currentGrowth ? 'text-green-600' : 'text-red-600'}`, children: [newGrowth > currentGrowth ? '↑' : '↓', " from ", currentGrowth.toFixed(2), "%"] })] })] })] })] }));
};
export default FundImpactAnalysis;

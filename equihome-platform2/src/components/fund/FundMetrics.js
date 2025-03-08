import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TrendingUp, DollarSign, Percent, Clock, Coins } from 'lucide-react';
import { sampleDeals } from '../../data/sampleDeals';
const FundMetrics = () => {
    // Calculate total starting portfolio value
    const totalStartingValue = sampleDeals.reduce((sum, deal) => sum + deal.propertyValue, 0);
    // Calculate current values based on individual growth rates
    const portfolioMetrics = sampleDeals.map(deal => {
        const startDate = new Date(deal.loanTerms.startDate);
        const endDate = new Date(deal.loanTerms.endDate);
        const now = new Date();
        const elapsedMonths = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
        const isActive = now < endDate;
        // Calculate current property value based on yearly growth rate
        const yearlyGrowthRate = deal.propertyDetails.yearlyGrowth / 100;
        const monthlyGrowthRate = yearlyGrowthRate / 12;
        const currentValue = deal.propertyValue * Math.pow(1 + monthlyGrowthRate, elapsedMonths);
        const appreciation = currentValue - deal.propertyValue;
        // Calculate returns
        const monthlyInterestRate = deal.loanTerms.interestRate / 100 / 12;
        const accruedInterest = deal.loanAmount * (Math.pow(1 + monthlyInterestRate, elapsedMonths) - 1);
        const appreciationShare = appreciation * (deal.loanAmount / deal.propertyValue);
        return {
            startDate,
            endDate,
            isActive,
            elapsedMonths,
            originalValue: deal.propertyValue,
            currentValue,
            appreciation,
            loanAmount: deal.loanAmount,
            accruedInterest,
            appreciationShare,
            totalReturn: accruedInterest + appreciationShare
        };
    });
    // Calculate total current portfolio value
    const totalCurrentValue = portfolioMetrics.reduce((sum, deal) => sum + deal.currentValue, 0);
    // Calculate portfolio growth rate
    const portfolioGrowth = ((totalCurrentValue - totalStartingValue) / totalStartingValue) * 100;
    // Calculate weighted average LTV
    const weightedLTV = sampleDeals.reduce((sum, deal) => sum + (deal.loanAmount / deal.propertyValue * 100 * deal.loanAmount), 0) /
        sampleDeals.reduce((sum, deal) => sum + deal.loanAmount, 0);
    // Monthly IRR (provided value)
    const monthlyIRR = 16.61;
    // Calculate total returns
    const totalReturns = portfolioMetrics.reduce((acc, deal) => ({
        accruedInterest: acc.accruedInterest + deal.accruedInterest,
        appreciationShare: acc.appreciationShare + deal.appreciationShare,
        totalReturn: acc.totalReturn + deal.totalReturn
    }), {
        accruedInterest: 0,
        appreciationShare: 0,
        totalReturn: 0
    });
    return (_jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6", children: [_jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Starting Home Portfolio Value" }), _jsxs("p", { className: "text-2xl font-semibold mt-1", children: ["$", totalStartingValue.toLocaleString()] })] }), _jsx(DollarSign, { className: "h-8 w-8 text-indigo-600" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Current Home Portfolio Value" }), _jsxs("p", { className: "text-2xl font-semibold mt-1", children: ["$", Math.round(totalCurrentValue).toLocaleString()] })] }), _jsx(TrendingUp, { className: "h-8 w-8 text-green-600" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Portfolio Growth Rate" }), _jsxs("p", { className: "text-2xl font-semibold mt-1", children: [portfolioGrowth.toFixed(2), "%"] })] }), _jsx(Percent, { className: "h-8 w-8 text-blue-600" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Weighted Average LTV" }), _jsxs("p", { className: "text-2xl font-semibold mt-1", children: [weightedLTV.toFixed(2), "%"] })] }), _jsx(Clock, { className: "h-8 w-8 text-yellow-600" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Monthly IRR" }), _jsxs("p", { className: "text-2xl font-semibold mt-1", children: [monthlyIRR, "%"] })] }), _jsx(TrendingUp, { className: "h-8 w-8 text-green-600" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Total Returns Generated" }), _jsxs("p", { className: "text-2xl font-semibold mt-1", children: ["$", Math.round(totalReturns.totalReturn).toLocaleString()] }), _jsxs("p", { className: "text-xs text-gray-500 mt-1", children: ["Interest: $", Math.round(totalReturns.accruedInterest).toLocaleString(), _jsx("br", {}), "Appreciation: $", Math.round(totalReturns.appreciationShare).toLocaleString()] })] }), _jsx(Coins, { className: "h-8 w-8 text-purple-600" })] }) })] }) }));
};
export default FundMetrics;

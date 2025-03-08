import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DealCard from './DealCard';
import { sampleDeals } from '../data/sampleDeals';
const InvestmentGrid = () => {
    return (_jsxs("div", { className: "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Example Loans" }), _jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Explore our curated selection of historical deals that showcase Equihome's investment thesis and underwriting model." }), _jsx("p", { className: "text-base text-gray-500 max-w-3xl mx-auto", children: "These transactions feature real-time property valuations and growth data from actual sales, demonstrating our ability to identify and structure optimal deals in Sydney's premium suburbs." })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: sampleDeals.map((deal, index) => (_jsx(DealCard, { deal: deal, index: index }, `deal-card-${deal.id}-${index}`))) })] }));
};
export default InvestmentGrid;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart2 } from 'lucide-react';
const InvestmentThesis = ({ thesis }) => (_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-8", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx(BarChart2, { className: "h-6 w-6 text-indigo-600 mr-2" }), _jsx("h2", { className: "text-xl font-semibold", children: "Investment Thesis" })] }), _jsx("ul", { className: "list-disc list-inside space-y-2 text-gray-700", children: thesis.map((point, index) => (_jsx("li", { children: point }, index))) })] }));
export default InvestmentThesis;

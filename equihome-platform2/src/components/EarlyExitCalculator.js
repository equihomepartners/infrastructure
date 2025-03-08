import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';
const EarlyExitCalculator = ({ decision, loanTerm }) => {
    const [exitYear, setExitYear] = useState(Math.floor(loanTerm / 2));
    const calculations = useMemo(() => {
        const monthlyRate = decision.interestRate / 100 / 12;
        const totalMonths = loanTerm * 12;
        const exitMonth = exitYear * 12;
        // Calculate remaining balance at exit
        const remainingBalance = (decision.monthlyPayment *
            ((1 - Math.pow(1 + monthlyRate, -(totalMonths - exitMonth))) / monthlyRate));
        // Calculate total payments made
        const totalPaid = decision.monthlyPayment * exitMonth;
        // Calculate potential appreciation scenarios
        const conservativeGrowth = decision.loanAmount * Math.pow(1.02, exitYear);
        const moderateGrowth = decision.loanAmount * Math.pow(1.05, exitYear);
        const optimisticGrowth = decision.loanAmount * Math.pow(1.08, exitYear);
        return {
            remainingBalance,
            totalPaid,
            scenarios: {
                conservative: conservativeGrowth - remainingBalance,
                moderate: moderateGrowth - remainingBalance,
                optimistic: optimisticGrowth - remainingBalance
            }
        };
    }, [exitYear, decision, loanTerm]);
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-8 mt-8", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx(Calculator, { className: "h-6 w-6 text-indigo-600 mr-2" }), _jsx("h3", { className: "text-xl font-semibold", children: "Early Exit Calculator" })] }), _jsxs("div", { className: "mb-6", children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["Exit Year: ", exitYear] }), _jsx("input", { type: "range", min: "1", max: loanTerm, value: exitYear, onChange: (e) => setExitYear(Number(e.target.value)), className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" }), _jsxs("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [_jsx("span", { children: "Year 1" }), _jsxs("span", { children: ["Year ", loanTerm] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Remaining Balance" }), _jsxs("div", { className: "text-2xl font-semibold", children: ["$", Math.round(calculations.remainingBalance).toLocaleString()] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Total Payments Made" }), _jsxs("div", { className: "text-2xl font-semibold", children: ["$", Math.round(calculations.totalPaid).toLocaleString()] })] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("h4", { className: "text-sm font-medium text-gray-700 mb-3", children: "Potential Equity Growth Scenarios" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Conservative (2%)" }), _jsxs("span", { className: "font-medium", children: ["$", Math.round(calculations.scenarios.conservative).toLocaleString()] })] }), _jsx("div", { className: "mt-1 h-2 bg-gray-200 rounded-full", children: _jsx("div", { className: "h-full bg-green-300 rounded-full", style: { width: `${Math.min(100, (calculations.scenarios.conservative / calculations.totalPaid) * 100)}%` } }) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Moderate (5%)" }), _jsxs("span", { className: "font-medium", children: ["$", Math.round(calculations.scenarios.moderate).toLocaleString()] })] }), _jsx("div", { className: "mt-1 h-2 bg-gray-200 rounded-full", children: _jsx("div", { className: "h-full bg-green-500 rounded-full", style: { width: `${Math.min(100, (calculations.scenarios.moderate / calculations.totalPaid) * 100)}%` } }) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Optimistic (8%)" }), _jsxs("span", { className: "font-medium", children: ["$", Math.round(calculations.scenarios.optimistic).toLocaleString()] })] }), _jsx("div", { className: "mt-1 h-2 bg-gray-200 rounded-full", children: _jsx("div", { className: "h-full bg-green-600 rounded-full", style: { width: `${Math.min(100, (calculations.scenarios.optimistic / calculations.totalPaid) * 100)}%` } }) })] })] })] })] })] }));
};
export default EarlyExitCalculator;

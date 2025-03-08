import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line } from 'react-chartjs-2';
import { AlertTriangle, Scale, ArrowRight, Clock } from 'lucide-react';
const ProductComparison = ({ modelInputs }) => {
    // Traditional Second Mortgage Parameters
    const secondMortgageRate = 8.99; // Current market rate for second mortgages
    const secondMortgagePoints = 2; // Points charged upfront
    const secondMortgageClosingCosts = 3500; // Typical closing costs
    const secondMortgageTerm = 360; // 30 years in months
    // Calculate monthly payments for traditional second mortgage
    const monthlyRate = secondMortgageRate / 100 / 12;
    const monthlyPayment = (modelInputs.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, secondMortgageTerm)) /
        (Math.pow(1 + monthlyRate, secondMortgageTerm) - 1);
    // Calculate metrics for traditional mortgage (30 years)
    const traditionalMetrics = Array.from({ length: 10 }, (_, year) => {
        let balance = modelInputs.loanAmount;
        let totalInterest = 0;
        let totalPrincipal = 0;
        for (let m = 0; m < (year + 1) * 12; m++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = monthlyPayment - interestPayment;
            totalInterest += interestPayment;
            totalPrincipal += principalPayment;
            balance -= principalPayment;
        }
        return {
            year: year + 1,
            totalInterest,
            totalPrincipal,
            totalCost: totalInterest + totalPrincipal +
                (secondMortgagePoints / 100 * modelInputs.loanAmount) +
                secondMortgageClosingCosts
        };
    });
    // Calculate metrics for Equihome (10 years)
    const equihomeMetrics = Array.from({ length: 10 }, (_, year) => {
        const yearNum = year + 1;
        const propertyValue = modelInputs.propertyValue * Math.pow(1 + modelInputs.growthRate / 100, yearNum);
        const appreciation = propertyValue - modelInputs.propertyValue;
        const appreciationShare = appreciation * (modelInputs.loanAmount / modelInputs.propertyValue);
        const accruedInterest = modelInputs.loanAmount * (Math.pow(1 + modelInputs.interestRate / 100, yearNum) - 1);
        const upfrontFee = modelInputs.loanAmount * (modelInputs.upfrontFee / 100);
        return {
            year: yearNum,
            accruedInterest,
            appreciationShare,
            upfrontFee,
            totalCost: accruedInterest + appreciationShare + upfrontFee,
            propertyValue
        };
    });
    // Interest accumulation comparison data
    const interestComparisonData = {
        labels: Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`),
        datasets: [
            {
                label: 'Traditional Mortgage Interest',
                data: traditionalMetrics.map(m => m.totalInterest),
                borderColor: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Equihome Interest',
                data: equihomeMetrics.map(m => m.accruedInterest),
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    };
    const commonOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            annotation: {
                annotations: {
                    exitLine: {
                        type: 'line',
                        xMin: modelInputs.desiredExitYear - 1,
                        xMax: modelInputs.desiredExitYear - 1,
                        borderColor: 'rgba(239, 68, 68, 0.5)',
                        borderWidth: 2,
                        borderDash: [6, 6],
                        label: {
                            display: true,
                            content: `Target Exit (Year ${modelInputs.desiredExitYear})`,
                            position: 'start'
                        }
                    }
                }
            }
        }
    };
    // Get metrics at target exit year
    const exitYearEquihome = equihomeMetrics[Math.floor(modelInputs.desiredExitYear) - 1];
    const exitYearTraditional = traditionalMetrics[Math.floor(modelInputs.desiredExitYear) - 1];
    return (_jsxs("div", { className: "space-y-8", children: [_jsx("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg", children: _jsxs("div", { className: "flex", children: [_jsx(AlertTriangle, { className: "h-6 w-6 text-yellow-600 flex-shrink-0" }), _jsxs("div", { className: "ml-3", children: [_jsx("h3", { className: "text-lg font-medium text-yellow-800", children: "Product Structure Comparison" }), _jsxs("div", { className: "mt-2 text-yellow-700", children: [_jsx("p", { children: "Key differences in capital structure:" }), _jsxs("ul", { className: "list-disc list-inside space-y-1 mt-2", children: [_jsxs("li", { children: ["Traditional: 30-year term, $", monthlyPayment.toFixed(2), " monthly payment at ", secondMortgageRate, "% APR"] }), _jsxs("li", { children: ["Equihome: 10-year max term, no payments, ", modelInputs.interestRate, "% + appreciation share"] }), _jsx("li", { children: "Different interest accumulation patterns" }), _jsx("li", { children: "Significant monthly cash flow impact" })] })] })] })] }) }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Interest Accumulation (10 Years)" }), _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: interestComparisonData, options: {
                                ...commonOptions,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Total Interest ($)'
                                        },
                                        ticks: {
                                            callback: (value) => `$${(value / 1000).toFixed(0)}k`
                                        }
                                    }
                                }
                            } }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Traditional Second Mortgage (30-Year)" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-red-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Monthly Payment Structure" }), _jsx(Clock, { className: "h-4 w-4 text-red-600" })] }), _jsxs("div", { className: "text-xl font-semibold text-red-700", children: ["$", monthlyPayment.toFixed(2), " per month"] }), _jsxs("div", { className: "text-sm text-red-600 mt-1", children: ["$", (monthlyPayment * 12).toFixed(2), " annual payment obligation"] })] }), _jsxs("div", { className: "bg-red-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsxs("div", { className: "text-sm text-gray-600", children: ["Cost at Year ", modelInputs.desiredExitYear] }), _jsx(Scale, { className: "h-4 w-4 text-red-600" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-red-600", children: "Principal Paid" }), _jsxs("div", { className: "text-lg font-semibold", children: ["$", Math.round(exitYearTraditional.totalPrincipal).toLocaleString()] })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-red-600", children: "Interest Paid" }), _jsxs("div", { className: "text-lg font-semibold", children: ["$", Math.round(exitYearTraditional.totalInterest).toLocaleString()] })] })] })] }), _jsxs("div", { className: "bg-red-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Total 30-Year Cost" }), _jsx(ArrowRight, { className: "h-4 w-4 text-red-600" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-red-600", children: "Total Principal" }), _jsxs("div", { className: "text-lg font-semibold", children: ["$", Math.round(traditionalMetrics[traditionalMetrics.length - 1].totalPrincipal).toLocaleString()] })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-red-600", children: "Total Interest" }), _jsxs("div", { className: "text-lg font-semibold", children: ["$", Math.round(traditionalMetrics[traditionalMetrics.length - 1].totalInterest).toLocaleString()] })] })] })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Equihome Solution (10-Year Max)" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-blue-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Monthly Payment Structure" }), _jsx(Clock, { className: "h-4 w-4 text-blue-600" })] }), _jsx("div", { className: "text-xl font-semibold text-blue-700", children: "$0 per month" }), _jsx("div", { className: "text-sm text-blue-600 mt-1", children: "No monthly payment obligation" })] }), _jsxs("div", { className: "bg-blue-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsxs("div", { className: "text-sm text-gray-600", children: ["Cost at Year ", modelInputs.desiredExitYear] }), _jsx(Scale, { className: "h-4 w-4 text-blue-600" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-blue-600", children: "Accrued Interest" }), _jsxs("div", { className: "text-lg font-semibold", children: ["$", Math.round(exitYearEquihome.accruedInterest).toLocaleString()] })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-blue-600", children: "Appreciation Share" }), _jsxs("div", { className: "text-lg font-semibold", children: ["$", Math.round(exitYearEquihome.appreciationShare).toLocaleString()] })] })] })] }), _jsxs("div", { className: "bg-blue-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Maximum Term Cost (Year 10)" }), _jsx(ArrowRight, { className: "h-4 w-4 text-blue-600" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-blue-600", children: "Total Interest" }), _jsxs("div", { className: "text-lg font-semibold", children: ["$", Math.round(equihomeMetrics[equihomeMetrics.length - 1].accruedInterest).toLocaleString()] })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-blue-600", children: "Total Appreciation" }), _jsxs("div", { className: "text-lg font-semibold", children: ["$", Math.round(equihomeMetrics[equihomeMetrics.length - 1].appreciationShare).toLocaleString()] })] })] })] })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-6", children: "Key Product Differences" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-base font-medium text-gray-900 mb-4", children: "Traditional Second Mortgage" }), _jsxs("ul", { className: "space-y-3", children: [_jsxs("li", { className: "flex items-start", children: [_jsx("span", { className: "text-red-500 mr-2", children: "\u2022" }), _jsxs("span", { className: "text-gray-600", children: ["30-year term with fixed $", monthlyPayment.toFixed(2), " monthly payments"] })] }), _jsxs("li", { className: "flex items-start", children: [_jsx("span", { className: "text-red-500 mr-2", children: "\u2022" }), _jsx("span", { className: "text-gray-600", children: "Front-loaded interest payments in early years" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx("span", { className: "text-red-500 mr-2", children: "\u2022" }), _jsxs("span", { className: "text-gray-600", children: ["Total interest paid: $", Math.round(traditionalMetrics[traditionalMetrics.length - 1].totalInterest).toLocaleString()] })] }), _jsxs("li", { className: "flex items-start", children: [_jsx("span", { className: "text-red-500 mr-2", children: "\u2022" }), _jsx("span", { className: "text-gray-600", children: "Impacts debt-to-income ratio for future borrowing" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx("span", { className: "text-red-500 mr-2", children: "\u2022" }), _jsx("span", { className: "text-gray-600", children: "Early payoff requires refinancing or lump sum" })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-base font-medium text-gray-900 mb-4", children: "Equihome Solution" }), _jsxs("ul", { className: "space-y-3", children: [_jsxs("li", { className: "flex items-start", children: [_jsx("span", { className: "text-green-500 mr-2", children: "\u2022" }), _jsx("span", { className: "text-gray-600", children: "10-year maximum term with no monthly payments" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx("span", { className: "text-green-500 mr-2", children: "\u2022" }), _jsx("span", { className: "text-gray-600", children: "Interest accrues but doesn't require servicing" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx("span", { className: "text-green-500 mr-2", children: "\u2022" }), _jsxs("span", { className: "text-gray-600", children: ["Maximum interest exposure: $", Math.round(equihomeMetrics[equihomeMetrics.length - 1].accruedInterest).toLocaleString()] })] }), _jsxs("li", { className: "flex items-start", children: [_jsx("span", { className: "text-green-500 mr-2", children: "\u2022" }), _jsx("span", { className: "text-gray-600", children: "No impact on debt-to-income ratio" })] }), _jsxs("li", { className: "flex items-start", children: [_jsx("span", { className: "text-green-500 mr-2", children: "\u2022" }), _jsx("span", { className: "text-gray-600", children: "Flexible exit timing within 10-year window" })] })] })] })] })] })] }));
};
export default ProductComparison;

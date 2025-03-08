import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line } from 'react-chartjs-2';
import { TrendingUp, DollarSign, Percent, Building2 } from 'lucide-react';
const PerformanceMetrics = () => {
    const monthlyData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Portfolio IRR',
                data: [15.2, 15.8, 16.1, 16.5, 17.2, 17.8, 18.1, 18.5, 18.8, 19.1, 19.5, 20.1],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Portfolio Performance',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${value}%`
                }
            }
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Monthly IRR" }), _jsx("p", { className: "text-2xl font-semibold mt-1", children: "16.61%" })] }), _jsx(TrendingUp, { className: "h-8 w-8 text-blue-600" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Total AUM" }), _jsx("p", { className: "text-2xl font-semibold mt-1", children: "$19.3M" })] }), _jsx(DollarSign, { className: "h-8 w-8 text-green-600" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Weighted LTV" }), _jsx("p", { className: "text-2xl font-semibold mt-1", children: "29.84%" })] }), _jsx(Percent, { className: "h-8 w-8 text-yellow-600" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Active Loans" }), _jsx("p", { className: "text-2xl font-semibold mt-1", children: "8" })] }), _jsx(Building2, { className: "h-8 w-8 text-purple-600" })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2 bg-white rounded-lg shadow-sm p-6", children: _jsx("div", { className: "h-[400px]", children: _jsx(Line, { data: monthlyData, options: options }) }) }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Return Breakdown" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600", children: "Interest Income" }), _jsx("span", { className: "font-semibold", children: "$1,126,667" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600", children: "Appreciation Share" }), _jsx("span", { className: "font-semibold", children: "$3,344,825" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600", children: "Total Returns" }), _jsx("span", { className: "font-semibold text-green-600", children: "$4,471,492" })] })] })] })] })] }));
};
export default PerformanceMetrics;

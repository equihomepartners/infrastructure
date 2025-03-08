import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapPin, AlertTriangle } from 'lucide-react';
const SuburbReport = ({ deal }) => {
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-8", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx(MapPin, { className: "h-6 w-6 text-indigo-600 mr-2" }), _jsxs("h3", { className: "text-xl font-semibold", children: [deal.suburb, " Suburb Report"] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Suburb Median Price (3 Bedrooms)" }), _jsxs("div", { className: "text-lg font-semibold", children: ["$", deal.marketAnalysis.medianPrice.toLocaleString()] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Median Growth (5 Year History)" }), _jsxs("div", { className: "text-lg font-semibold", children: [deal.propertyDetails.yearlyGrowth, "%"] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Risk Adjustment" }), _jsx("div", { className: "text-lg font-semibold", children: "2%" })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Forward Forecasted Growth Rate" }), _jsxs("div", { className: "text-lg font-semibold", children: [deal.propertyDetails.forecastGrowth, "%"] })] })] })] }), _jsx("div", { className: "mt-6 flex items-center", children: _jsxs("div", { className: `
          px-3 py-1 rounded-full text-sm font-medium flex items-center
          ${deal.propertyDetails.trafficLight === 'Green'
                        ? 'bg-green-100 text-green-800'
                        : deal.propertyDetails.trafficLight === 'Amber'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'}
        `, children: [_jsx(AlertTriangle, { className: "h-4 w-4 mr-1" }), deal.propertyDetails.trafficLight, " Investment Zone in Sydney"] }) })] }));
};
export default SuburbReport;

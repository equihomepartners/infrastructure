import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { pipelineDeals } from '../../data/pipelineData';
import 'leaflet/dist/leaflet.css';
const PipelineMap = () => {
    const center = [-33.8688, 151.2093]; // Sydney CBD coordinates
    // Calculate metrics for the legend
    const metrics = {
        totalDeals: pipelineDeals.length,
        highQuality: pipelineDeals.filter(deal => deal.underwriteScore >= 80).length,
        mediumQuality: pipelineDeals.filter(deal => deal.underwriteScore >= 60 && deal.underwriteScore < 80).length,
        lowQuality: pipelineDeals.filter(deal => deal.underwriteScore < 60).length,
        totalVolume: pipelineDeals.reduce((sum, deal) => sum + deal.loanRequest.amount, 0)
    };
    const getMarkerColor = (score) => {
        if (score >= 80)
            return '#22c55e'; // Green
        if (score >= 60)
            return '#eab308'; // Yellow
        return '#ef4444'; // Red
    };
    // Calculate the radius based on property value with increased base size
    const getRadius = (value) => {
        // Increase the base size by adjusting the divisor and adding a minimum size
        return Math.max(15, Math.sqrt(value / 50000)); // Adjusted for better visibility
    };
    return (_jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Geographic Distribution" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Total Deals" }), _jsx("div", { className: "text-xl font-semibold", children: metrics.totalDeals })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "High Quality" }), _jsx("div", { className: "text-xl font-semibold text-green-600", children: metrics.highQuality })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Medium Quality" }), _jsx("div", { className: "text-xl font-semibold text-yellow-600", children: metrics.mediumQuality })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Total Volume" }), _jsxs("div", { className: "text-xl font-semibold", children: ["$", (metrics.totalVolume / 1000000).toFixed(1), "M"] })] })] }), _jsx("div", { className: "h-[600px]", children: _jsxs(MapContainer, { center: center, zoom: 11, style: { height: '100%', width: '100%', borderRadius: '0.5rem' }, children: [_jsx(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }), pipelineDeals.map((deal) => (_jsx(CircleMarker, { center: [deal.propertyDetails.latitude, deal.propertyDetails.longitude], radius: getRadius(deal.propertyDetails.currentValue), fillColor: getMarkerColor(deal.underwriteScore), color: getMarkerColor(deal.underwriteScore), weight: 2, opacity: 1, fillOpacity: 0.6, children: _jsx(Popup, { children: _jsxs("div", { className: "p-2", children: [_jsx("h4", { className: "font-semibold", children: deal.propertyDetails.address }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Value: $", (deal.propertyDetails.currentValue / 1000000).toFixed(1), "M"] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Loan: $", (deal.loanRequest.amount / 1000000).toFixed(1), "M"] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Score: ", deal.underwriteScore] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["IRR: ", deal.returns.forecastedIrr.toFixed(1), "%"] })] }) }) }, deal.id)))] }) }), _jsxs("div", { className: "mt-4 flex justify-center space-x-6", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-4 h-4 rounded-full bg-green-500 mr-2" }), _jsx("span", { className: "text-sm text-gray-600", children: "High Score (\u226580)" })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-4 h-4 rounded-full bg-yellow-500 mr-2" }), _jsx("span", { className: "text-sm text-gray-600", children: "Medium Score (60-79)" })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-4 h-4 rounded-full bg-red-500 mr-2" }), _jsx("span", { className: "text-sm text-gray-600", children: "Low Score (<60)" })] })] })] }) }));
};
export default PipelineMap;

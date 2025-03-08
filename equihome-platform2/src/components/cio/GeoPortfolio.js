import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapContainer, TileLayer, CircleMarker, Popup, Polygon } from 'react-leaflet';
import { sampleDeals } from '../../data/sampleDeals';
import { sydneyZones } from '../../data/sydneyZones';
import 'leaflet/dist/leaflet.css';
const GeoPortfolio = () => {
    const center = [-33.8688, 151.2093]; // Sydney CBD coordinates
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Geographic Distribution" }), _jsx("div", { className: "h-[600px]", children: _jsxs(MapContainer, { center: center, zoom: 11, style: { height: '100%', width: '100%', borderRadius: '0.5rem' }, children: [_jsx(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }), sydneyZones.greenZones.map((coords, idx) => (_jsx(Polygon, { positions: coords, pathOptions: {
                                        fillColor: '#22c55e',
                                        fillOpacity: 0.3,
                                        weight: 2,
                                        opacity: 1,
                                        color: '#16a34a'
                                    }, children: _jsx(Popup, { children: "Green Zone - Premium Investment Area" }) }, `green-${idx}`))), sydneyZones.orangeZones.map((coords, idx) => (_jsx(Polygon, { positions: coords, pathOptions: {
                                        fillColor: '#f97316',
                                        fillOpacity: 0.3,
                                        weight: 2,
                                        opacity: 1,
                                        color: '#ea580c'
                                    }, children: _jsx(Popup, { children: "Orange Zone - Moderate Risk Area" }) }, `orange-${idx}`))), sydneyZones.redZones.map((coords, idx) => (_jsx(Polygon, { positions: coords, pathOptions: {
                                        fillColor: '#ef4444',
                                        fillOpacity: 0.3,
                                        weight: 2,
                                        opacity: 1,
                                        color: '#dc2626'
                                    }, children: _jsx(Popup, { children: "Red Zone - High Risk Area" }) }, `red-${idx}`))), sampleDeals.map((deal) => (_jsx(CircleMarker, { center: [deal.location.latitude, deal.location.longitude], radius: deal.propertyValue / 100000, fillColor: "#3B82F6", color: "#2563EB", weight: 1, opacity: 0.8, fillOpacity: 0.4, children: _jsx(Popup, { children: _jsxs("div", { className: "p-2", children: [_jsx("h4", { className: "font-semibold", children: deal.suburb }), _jsxs("p", { className: "text-sm text-gray-600", children: ["$", deal.propertyValue.toLocaleString()] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["LTV: ", deal.ltv.toFixed(2), "%"] })] }) }) }, deal.id)))] }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-green-700 mb-4", children: "Green Zones" }), _jsxs("ul", { className: "space-y-2 text-sm text-gray-600", children: [_jsx("li", { children: "\u2022 North Shore" }), _jsx("li", { children: "\u2022 Eastern Suburbs" }), _jsx("li", { children: "\u2022 Northern Beaches" }), _jsx("li", { children: "\u2022 Lower North Shore" })] }), _jsxs("div", { className: "mt-4 p-3 bg-green-50 rounded-lg", children: [_jsx("div", { className: "text-sm font-medium text-green-800", children: "Current Allocation" }), _jsx("div", { className: "text-2xl font-bold text-green-700", children: "90%" })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-orange-700 mb-4", children: "Orange Zones" }), _jsxs("ul", { className: "space-y-2 text-sm text-gray-600", children: [_jsx("li", { children: "\u2022 Inner West" }), _jsx("li", { children: "\u2022 Upper North Shore" }), _jsx("li", { children: "\u2022 Southern Sydney" })] }), _jsxs("div", { className: "mt-4 p-3 bg-orange-50 rounded-lg", children: [_jsx("div", { className: "text-sm font-medium text-orange-800", children: "Current Allocation" }), _jsx("div", { className: "text-2xl font-bold text-orange-700", children: "10%" })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-red-700 mb-4", children: "Red Zones" }), _jsxs("ul", { className: "space-y-2 text-sm text-gray-600", children: [_jsx("li", { children: "\u2022 Western Sydney" }), _jsx("li", { children: "\u2022 South Western Sydney" }), _jsx("li", { children: "\u2022 Outer West" })] }), _jsxs("div", { className: "mt-4 p-3 bg-red-50 rounded-lg", children: [_jsx("div", { className: "text-sm font-medium text-red-800", children: "Current Allocation" }), _jsx("div", { className: "text-2xl font-bold text-red-700", children: "0%" })] })] })] })] }));
};
export default GeoPortfolio;

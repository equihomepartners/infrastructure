import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { sampleDeals } from '../../data/sampleDeals';
import 'leaflet/dist/leaflet.css';
const GeographicDistribution = () => {
    const center = [-33.8688, 151.2093]; // Sydney CBD coordinates
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Geographic Distribution" }), _jsx("div", { className: "h-[400px]", children: _jsxs(MapContainer, { center: center, zoom: 11, style: { height: '100%', width: '100%', borderRadius: '0.5rem' }, children: [_jsx(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }), sampleDeals.map((deal) => (_jsx(CircleMarker, { center: [deal.location.latitude, deal.location.longitude], radius: deal.propertyValue / 100000, fillColor: "#3B82F6", color: "#2563EB", weight: 1, opacity: 0.8, fillOpacity: 0.4, children: _jsx(Popup, { children: _jsxs("div", { className: "p-2", children: [_jsx("h4", { className: "font-semibold", children: deal.suburb }), _jsxs("p", { className: "text-sm text-gray-600", children: ["$", deal.propertyValue.toLocaleString()] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["LTV: ", deal.ltv.toFixed(2), "%"] })] }) }) }, deal.id)))] }) }), _jsx("div", { className: "mt-4 text-sm text-gray-500", children: "Circle size represents relative property value" })] }));
};
export default GeographicDistribution;

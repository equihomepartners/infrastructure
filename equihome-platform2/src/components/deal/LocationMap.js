import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
const defaultIcon = new Icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
const LocationMap = ({ latitude, longitude, address }) => {
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-8", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx(MapPin, { className: "h-6 w-6 text-indigo-600 mr-2" }), _jsx("h3", { className: "text-xl font-semibold", children: "Property Location" })] }), _jsx("div", { className: "mb-4", children: _jsx("p", { className: "text-gray-700", children: address }) }), _jsx("div", { className: "h-96 rounded-lg overflow-hidden", children: _jsxs(MapContainer, { center: [latitude, longitude], zoom: 15, style: { height: '100%', width: '100%' }, children: [_jsx(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }), _jsx(Marker, { position: [latitude, longitude], icon: defaultIcon, children: _jsx(Popup, { children: address }) })] }) })] }));
};
export default LocationMap;

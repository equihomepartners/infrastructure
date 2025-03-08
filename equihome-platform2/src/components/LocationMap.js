import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs(MapContainer, { center: [latitude, longitude], zoom: 15, style: { height: '400px', width: '100%', borderRadius: '0.5rem' }, children: [_jsx(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }), _jsx(Marker, { position: [latitude, longitude], icon: defaultIcon, children: _jsx(Popup, { children: address }) })] }));
};
export default LocationMap;

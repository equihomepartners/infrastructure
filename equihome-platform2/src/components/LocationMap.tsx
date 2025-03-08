import React from 'react';
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

interface Props {
  latitude: number;
  longitude: number;
  address: string;
}

const LocationMap: React.FC<Props> = ({ latitude, longitude, address }) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]} icon={defaultIcon}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationMap;
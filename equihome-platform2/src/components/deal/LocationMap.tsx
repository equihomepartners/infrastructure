import React from 'react';
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

interface Props {
  latitude: number;
  longitude: number;
  address: string;
}

const LocationMap: React.FC<Props> = ({ latitude, longitude, address }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex items-center mb-6">
        <MapPin className="h-6 w-6 text-indigo-600 mr-2" />
        <h3 className="text-xl font-semibold">Property Location</h3>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-700">{address}</p>
      </div>

      <div className="h-96 rounded-lg overflow-hidden">
        <MapContainer 
          center={[latitude, longitude]} 
          zoom={15} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latitude, longitude]} icon={defaultIcon}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationMap;
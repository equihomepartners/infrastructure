export interface SuburbData {
  name: string;
  zone: 'green' | 'orange' | 'red';
  coordinates: {
    lat: number;
    lng: number;
  }[];
}

export interface MapboxEnv {
  VITE_MAPBOX_TOKEN: string;
} 
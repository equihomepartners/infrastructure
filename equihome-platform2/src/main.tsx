import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import App from './App';
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDJhE5B8nPz1FLG4RrRl2cA-Ni70zuEVCw';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

const onLoad = () => {
  console.log('Google Maps script loaded');
};

const onError = (error: Error) => {
  console.error('Google Maps script error:', error);
};

root.render(
  <React.StrictMode>
    <LoadScript 
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      onLoad={onLoad}
      onError={onError}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoadScript>
  </React.StrictMode>
);
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Map, { 
  Source, 
  Layer, 
  NavigationControl,
  FullscreenControl,
  MapRef,
  Popup,
  LayerProps,
  MapLayerMouseEvent
} from 'react-map-gl';
import { getSuburbAnalysis, getSuburbBoundaries } from '../../services/mlAnalytics';
import MLAnalytics from './MLAnalytics';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Props {
  onSuburbSelect: (suburb: string) => void;
}

interface SuburbProperties {
  name: string;
  zone: 'green' | 'orange' | 'red';
  confidence: number;
}

interface SuburbFeature {
  properties: SuburbProperties;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXF1aWhvbWVwYXJ0bmVycyIsImEiOiJjbTNzZGJ6ZHgwN281MmlvdHVhbTlsZWJmIn0.RDjB1kTaLmp67lc7J0AjiQ';

const MapboxZoningMap: React.FC<Props> = ({ onSuburbSelect }) => {
  const [hoveredSuburb, setHoveredSuburb] = useState<string | null>(null);
  const [selectedSuburb, setSelectedSuburb] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [suburbsData, setSuburbsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    const fetchSuburbs = async () => {
      try {
        const data = await getSuburbBoundaries();
        setSuburbsData(data);
      } catch (error) {
        console.error('Error fetching suburb boundaries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuburbs();
  }, []);

  const layerStyle: LayerProps = {
    id: 'sydney-suburbs',
    type: 'fill',
    paint: {
      'fill-color': [
        'match',
        ['get', 'zone'],
        'green', '#22c55e',
        'orange', '#f97316',
        '#ef4444'
      ],
      'fill-opacity': [
        'case',
        ['boolean', ['==', ['get', 'name'], hoveredSuburb], false],
        0.8,
        0.6
      ],
      'fill-outline-color': '#ffffff'
    }
  };

  const handleHover = useCallback((event: MapLayerMouseEvent) => {
    const feature = event.features?.[0] as SuburbFeature | undefined;
    if (feature?.properties) {
      setHoveredSuburb(feature.properties.name);
    } else {
      setHoveredSuburb(null);
    }
  }, []);

  const handleClick = useCallback((event: MapLayerMouseEvent) => {
    const feature = event.features?.[0] as SuburbFeature | undefined;
    if (feature?.properties) {
      const suburb = feature.properties.name;
      setSelectedSuburb(suburb);
      getSuburbAnalysis(suburb).then(analysis => {
        setAnalysis(analysis);
        onSuburbSelect(suburb);
      });

      // Zoom to clicked suburb
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: event.lngLat.toArray(),
          zoom: 13,
          duration: 1000
        });
      }
    }
  }, [onSuburbSelect]);

  // Reset view handler
  const handleReset = useCallback(() => {
    setSelectedSuburb(null);
    setAnalysis(null);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [151.2093, -33.8688],
        zoom: 11,
        duration: 1000
      });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading suburbs data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative h-[600px] rounded-lg overflow-hidden">
        <Map
          ref={mapRef}
          initialViewState={{
            latitude: -33.8688,
            longitude: 151.2093,
            zoom: 11
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
          onMouseMove={handleHover}
          onClick={handleClick}
          interactiveLayerIds={['sydney-suburbs']}
        >
          {suburbsData && (
            <Source type="geojson" data={suburbsData}>
              <Layer {...layerStyle} />
            </Source>
          )}
          <NavigationControl position="top-right" />
          <FullscreenControl position="top-right" />
        </Map>

        {hoveredSuburb && (
          <div 
            className="absolute z-10 bg-white px-3 py-2 rounded-lg shadow-lg pointer-events-none"
            style={{ 
              left: '50%', 
              top: '10px',
              transform: 'translateX(-50%)'
            }}
          >
            <p className="text-sm font-medium">{hoveredSuburb}</p>
          </div>
        )}

        {selectedSuburb && (
          <button
            onClick={handleReset}
            className="absolute top-4 right-20 bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Reset View
          </button>
        )}
      </div>

      {/* ML Analysis Panel */}
      {selectedSuburb && analysis && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{selectedSuburb} Analysis</h2>
          </div>
          <MLAnalytics analysis={analysis} />
        </div>
      )}
    </div>
  );
};

export default MapboxZoningMap; 
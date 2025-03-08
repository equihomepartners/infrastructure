import { Feature, FeatureCollection } from 'geojson';

type Coordinate = [number, number];
type SuburbBoundary = Coordinate[];

interface RegionSuburbs {
  [key: string]: SuburbBoundary;
}

interface RegionMap {
  [key: string]: RegionSuburbs;
}

const SYDNEY_SUBURBS: RegionMap = {
  northShore: {
    'Mosman': [
      [151.2466, -33.8269] as Coordinate,
      [151.2506, -33.8279] as Coordinate,
      [151.2536, -33.8289] as Coordinate,
      [151.2556, -33.8299] as Coordinate,
      [151.2576, -33.8319] as Coordinate,
      [151.2556, -33.8339] as Coordinate,
      [151.2526, -33.8349] as Coordinate,
      [151.2496, -33.8359] as Coordinate,
      [151.2466, -33.8349] as Coordinate,
      [151.2446, -33.8329] as Coordinate,
      [151.2436, -33.8309] as Coordinate,
      [151.2446, -33.8289] as Coordinate,
      [151.2466, -33.8269] as Coordinate
    ]
  },
  eastern: {
    'Double Bay': [
      [151.2432, -33.8764] as Coordinate,
      [151.2452, -33.8754] as Coordinate,
      [151.2472, -33.8764] as Coordinate,
      [151.2492, -33.8774] as Coordinate,
      [151.2472, -33.8784] as Coordinate,
      [151.2452, -33.8794] as Coordinate,
      [151.2432, -33.8784] as Coordinate,
      [151.2412, -33.8774] as Coordinate,
      [151.2432, -33.8764] as Coordinate
    ]
  }
};

const createFeature = (name: string, coordinates: Coordinate[], zone: 'green' | 'orange' | 'red'): Feature => ({
  type: 'Feature',
  properties: {
    name,
    zone
  },
  geometry: {
    type: 'Polygon',
    coordinates: [coordinates]
  }
});

const sydneyGeoJSON: FeatureCollection = {
  type: 'FeatureCollection',
  features: Object.entries(SYDNEY_SUBURBS).flatMap(([region, suburbs]) =>
    Object.entries(suburbs).map(([name, coordinates]) => {
      const zone = region === 'northShore' || region === 'eastern' ? 'green' :
                  region === 'innerWest' ? 'orange' : 'red';
      return createFeature(name, coordinates, zone);
    })
  )
};

export default sydneyGeoJSON; 
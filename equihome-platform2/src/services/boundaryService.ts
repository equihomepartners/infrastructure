import { FeatureCollection } from 'geojson';

export const fetchSuburbBoundaries = async (): Promise<FeatureCollection> => {
  // In production, this would fetch from an API
  // For now, we'll use static data
  const response = await fetch('/api/suburb-boundaries');
  const data = await response.json();
  return data as FeatureCollection;
};

// Alternative using NSW Government data
export const fetchNSWBoundaries = async (suburbs: string[]): Promise<FeatureCollection> => {
  // This would fetch from NSW Spatial Services
  // Example URL: https://portal.spatial.nsw.gov.au/server/rest/services/NSW_Administrative_Boundaries/FeatureServer/0/query
  const response = await fetch(`${process.env.NSW_SPATIAL_API}/query?where=suburb_name IN (${suburbs.join(',')}`);
  const data = await response.json();
  return data;
}; 
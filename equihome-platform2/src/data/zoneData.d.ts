export interface ZoneData {
  green: string[];
  orange: string[];
  red: string[];
}

export interface SuburbCoordinates {
  [key: string]: [number, number];
}

export const trafficLightZones: ZoneData;
export const suburbCoordinates: SuburbCoordinates; 
export interface Property {
  id: string;
  address: {
    street: string;
    suburb: string;
    state: string;
    postcode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  details: {
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    parking: number;
    landSize: number;
    floorArea: number;
  };
  valuation: {
    currentValue: number;
    lastUpdated: Date;
    confidence: number;
    historicalValues: Array<{
      date: Date;
      value: number;
    }>;
  };
  metrics: {
    daysOnMarket: number;
    lastSalePrice: number;
    lastSaleDate: Date;
    rentalYield: number;
    vacancyRate: number;
  };
  zoning: {
    currentZone: 'green' | 'amber' | 'red';
    confidence: number;
    lastUpdated: Date;
    history: Array<{
      date: Date;
      zone: 'green' | 'amber' | 'red';
      confidence: number;
    }>;
  };
  risk: {
    overall: number;
    factors: {
      market: number;
      location: number;
      property: number;
      financial: number;
    };
  };
} 
function generateMockData(type) {
  const baseData = {
    timestamp: new Date().toISOString(),
    source: 'mock-data-service'
  };

  switch (type) {
    case 'market':
      return {
        ...baseData,
        type: 'market',
        metrics: {
          medianPrice: Math.floor(Math.random() * 2000000) + 800000,
          priceGrowth: (Math.random() * 10).toFixed(2),
          salesVolume: Math.floor(Math.random() * 500) + 100,
          daysOnMarket: Math.floor(Math.random() * 30) + 15,
          clearanceRate: Math.floor(Math.random() * 30) + 60,
          listingVolume: Math.floor(Math.random() * 200) + 50,
          buyerDemand: Math.floor(Math.random() * 100)
        },
        trends: {
          monthly: {
            priceGrowth: Array.from({ length: 12 }, () => (Math.random() * 2 - 1).toFixed(2)),
            volumeGrowth: Array.from({ length: 12 }, () => (Math.random() * 20 - 10).toFixed(2)),
            demandIndex: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50) + 50)
          }
        }
      };

    case 'property':
      return {
        ...baseData,
        type: 'property',
        properties: Array.from({ length: 10 }, (_, i) => ({
          id: `PROP${i + 1}`,
          address: `${Math.floor(Math.random() * 100)} Sample Street`,
          suburb: 'Test Suburb',
          postcode: '2000',
          price: Math.floor(Math.random() * 1000000) + 500000,
          bedrooms: Math.floor(Math.random() * 3) + 2,
          bathrooms: Math.floor(Math.random() * 2) + 1,
          parking: Math.floor(Math.random() * 2) + 1,
          landSize: Math.floor(Math.random() * 300) + 200,
          type: Math.random() > 0.5 ? 'House' : 'Apartment',
          status: Math.random() > 0.7 ? 'For Sale' : 'Recently Sold'
        }))
      };

    case 'infrastructure':
      return {
        ...baseData,
        type: 'infrastructure',
        projects: Array.from({ length: 5 }, (_, i) => ({
          id: `INF${i + 1}`,
          name: `Project ${i + 1}`,
          type: ['Transport', 'Education', 'Healthcare', 'Commercial'][Math.floor(Math.random() * 4)],
          status: ['Planned', 'In Progress', 'Completed'][Math.floor(Math.random() * 3)],
          budget: Math.floor(Math.random() * 100000000) + 10000000,
          completion: Math.floor(Math.random() * 100),
          impact: {
            radius: Math.floor(Math.random() * 5) + 1,
            estimatedValue: Math.floor(Math.random() * 1000000000),
            confidence: Math.floor(Math.random() * 20) + 80
          }
        }))
      };

    default:
      throw new Error(`Unknown data type: ${type}`);
  }
}

module.exports = {
  generateMockData
}; 
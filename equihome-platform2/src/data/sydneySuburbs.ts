export const sydneySuburbsGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Mosman',
        zone: 'green'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [151.2466, -33.8269],
          [151.2506, -33.8279],
          [151.2536, -33.8289],
          [151.2556, -33.8299],
          [151.2576, -33.8319],
          [151.2556, -33.8339],
          [151.2526, -33.8349],
          [151.2496, -33.8359],
          [151.2466, -33.8349],
          [151.2446, -33.8329],
          [151.2436, -33.8309],
          [151.2446, -33.8289],
          [151.2466, -33.8269]
        ]]
      }
    },
    // Add more suburbs...
  ]
}; 
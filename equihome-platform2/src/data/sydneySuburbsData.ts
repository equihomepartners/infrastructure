export const sydneySuburbsData = {
  type: 'FeatureCollection',
  features: [
    // North Shore (Green Zone)
    {
      type: 'Feature',
      properties: { name: 'Mosman', zone: 'green' },
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
    {
      type: 'Feature',
      properties: { name: 'Cremorne', zone: 'green' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [151.2275, -33.8284],
          [151.2315, -33.8304],
          [151.2335, -33.8324],
          [151.2315, -33.8344],
          [151.2295, -33.8364],
          [151.2275, -33.8344],
          [151.2255, -33.8324],
          [151.2275, -33.8284]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Neutral Bay', zone: 'green' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [151.2177, -33.8317],
          [151.2217, -33.8337],
          [151.2237, -33.8357],
          [151.2217, -33.8377],
          [151.2197, -33.8397],
          [151.2177, -33.8377],
          [151.2157, -33.8357],
          [151.2177, -33.8317]
        ]]
      }
    },
    // Eastern Suburbs (Green Zone)
    {
      type: 'Feature',
      properties: { name: 'Double Bay', zone: 'green' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [151.2432, -33.8764],
          [151.2472, -33.8774],
          [151.2502, -33.8784],
          [151.2522, -33.8804],
          [151.2502, -33.8824],
          [151.2472, -33.8834],
          [151.2442, -33.8824],
          [151.2422, -33.8804],
          [151.2432, -33.8764]
        ]]
      }
    },
    // Inner West (Orange Zone)
    {
      type: 'Feature',
      properties: { name: 'Marrickville', zone: 'orange' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [151.1549, -33.9111],
          [151.1589, -33.9131],
          [151.1609, -33.9151],
          [151.1589, -33.9171],
          [151.1569, -33.9191],
          [151.1549, -33.9171],
          [151.1529, -33.9151],
          [151.1549, -33.9111]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Ashfield', zone: 'orange' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [151.1244, -33.8932],
          [151.1284, -33.8952],
          [151.1304, -33.8972],
          [151.1284, -33.8992],
          [151.1264, -33.9012],
          [151.1244, -33.8992],
          [151.1224, -33.8972],
          [151.1244, -33.8932]
        ]]
      }
    },
    // Western Sydney (Red Zone)
    {
      type: 'Feature',
      properties: { name: 'Blacktown', zone: 'red' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [150.9054, -33.7668],
          [150.9094, -33.7688],
          [150.9114, -33.7708],
          [150.9094, -33.7728],
          [150.9074, -33.7748],
          [150.9054, -33.7728],
          [150.9034, -33.7708],
          [150.9054, -33.7668]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Vaucluse', zone: 'green' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [151.2789, -33.8567],
          [151.2829, -33.8587],
          [151.2849, -33.8607],
          [151.2829, -33.8627],
          [151.2809, -33.8647],
          [151.2789, -33.8627],
          [151.2769, -33.8607],
          [151.2789, -33.8567]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Rose Bay', zone: 'green' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [151.2673, -33.8713],
          [151.2713, -33.8733],
          [151.2733, -33.8753],
          [151.2713, -33.8773],
          [151.2693, -33.8793],
          [151.2673, -33.8773],
          [151.2653, -33.8753],
          [151.2673, -33.8713]
        ]]
      }
    }
    // ... I can add more suburbs if you'd like
  ]
}; 
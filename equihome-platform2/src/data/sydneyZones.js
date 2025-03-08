// Coordinates for Sydney zones
export const sydneyZones = {
    greenZones: [
        // North Shore & Eastern Suburbs (roughly matching your map)
        [
            [-33.8382, 151.2175], // Neutral Bay
            [-33.8279, 151.2412], // Mosman
            [-33.8021, 151.1957], // Willoughby
            [-33.7456, 151.1432], // Pymble
            [-33.7827, 151.2897], // Northern Beaches
            [-33.8688, 151.2093], // Sydney CBD
            [-33.8382, 151.2175] // Close the polygon
        ]
    ],
    orangeZones: [
        // Inner West & Hills District (roughly matching your map)
        [
            [-33.8688, 151.1093], // Inner West
            [-33.7827, 151.0897], // Hills District
            [-33.8279, 151.0412], // Transitional areas
            [-33.8688, 151.1093] // Close the polygon
        ]
    ],
    redZones: [
        // Western Sydney (roughly matching your map)
        [
            [-33.9148, 151.0425], // Western Sydney
            [-33.8948, 150.9425], // Outer West
            [-33.9348, 150.8425], // South Western Sydney
            [-33.9148, 151.0425] // Close the polygon
        ]
    ]
};

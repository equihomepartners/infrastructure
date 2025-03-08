import { Feature, FeatureCollection, Geometry } from 'geojson';
import { trafficLightZones } from '../data/trafficLightZones';

// Define coordinates for all suburbs
export const SYDNEY_SUBURBS: Record<string, [number, number]> = {
  // Eastern Suburbs (All 20)
  'Double Bay': [-33.8764, 151.2432],
  'Bellevue Hill': [-33.8789, 151.2589],
  'Rose Bay': [-33.8713, 151.2673],
  'Vaucluse': [-33.8567, 151.2789],
  'Dover Heights': [-33.8689, 151.2817],
  'Woollahra': [-33.8847, 151.2416],
  'Paddington': [-33.8847, 151.2276],
  'Darling Point': [-33.8689, 151.2416],
  'Point Piper': [-33.8647, 151.2511],
  'Elizabeth Bay': [-33.8714, 151.2261],
  'Rushcutters Bay': [-33.8750, 151.2277],
  'Edgecliff': [-33.8797, 151.2380],
  'Queens Park': [-33.8994, 151.2507],
  'Bondi': [-33.8932, 151.2503],
  'Bondi Beach': [-33.8915, 151.2767],
  'Bondi Junction': [-33.8912, 151.2489],
  'Bronte': [-33.9033, 151.2647],
  'Tamarama': [-33.8990, 151.2677],
  'Clovelly': [-33.9144, 151.2689],
  'Randwick': [-33.9146, 151.2425],

  // North Shore (All 20)
  'Mosman': [-33.8269, 151.2466],
  'Cremorne': [-33.8284, 151.2275],
  'Neutral Bay': [-33.8317, 151.2177],
  'North Sydney': [-33.8389, 151.2072],
  'Cammeray': [-33.8239, 151.2088],
  'Northbridge': [-33.8156, 151.2168],
  'Naremburn': [-33.8225, 151.1912],
  'Waverton': [-33.8389, 151.1972],
  'McMahons Point': [-33.8467, 151.2022],
  'Lavender Bay': [-33.8447, 151.2072],
  'Kirribilli': [-33.8477, 151.2174],
  'Milsons Point': [-33.8497, 151.2122],
  'Wollstonecraft': [-33.8308, 151.1972],
  'Killara': [-33.7666, 151.1681],
  'Lindfield': [-33.7771, 151.1675],
  'Roseville': [-33.7833, 151.1778],
  'Pymble': [-33.7516, 151.1437],
  'Gordon': [-33.7571, 151.1543],
  'Turramurra': [-33.7333, 151.1289],
  'Wahroonga': [-33.7167, 151.1167],

  // Inner West (All 20)
  'Marrickville': [-33.9111, 151.1549],
  'Ashfield': [-33.8932, 151.1244],
  'Burwood': [-33.8774, 151.1037],
  'Strathfield': [-33.8791, 151.0824],
  'Croydon': [-33.8833, 151.1167],
  'Summer Hill': [-33.8917, 151.1389],
  'Lewisham': [-33.8956, 151.1456],
  'Petersham': [-33.8967, 151.1567],
  'Stanmore': [-33.8956, 151.1656],
  'Dulwich Hill': [-33.9100, 151.1417],
  'Hurlstone Park': [-33.9150, 151.1361],
  'Canterbury': [-33.9133, 151.1183],
  'Campsie': [-33.9150, 151.1039],
  'Earlwood': [-33.9233, 151.1361],
  'Leichhardt': [-33.8842, 151.1571],
  'Annandale': [-33.8867, 151.1744],
  'Lilyfield': [-33.8783, 151.1669],
  'Rozelle': [-33.8617, 151.1717],
  'Balmain': [-33.8567, 151.1821],
  'Haberfield': [-33.8783, 151.1417],

  // Northern Districts (All 20)
  'Chatswood': [-33.7969, 151.1803],
  'Lane Cove': [-33.8142, 151.1694],
  'St Leonards': [-33.8225, 151.1912],
  'Artarmon': [-33.8150, 151.1833],
  'Willoughby': [-33.8047, 151.2019],
  'Ryde': [-33.8183, 151.1028],
  'West Ryde': [-33.8067, 151.0889],
  'Meadowbank': [-33.8183, 151.0889],
  'Gladesville': [-33.8333, 151.1167],
  'Putney': [-33.8283, 151.1125],
  'Hunters Hill': [-33.8333, 151.1500],
  'Woolwich': [-33.8383, 151.1708],
  'Eastwood': [-33.7900, 151.0819],
  'Denistone': [-33.7983, 151.0875],
  'North Ryde': [-33.7983, 151.1333],
  'Macquarie Park': [-33.7767, 151.1242],
  'Marsfield': [-33.7850, 151.1039],
  'Epping': [-33.7722, 151.0819],
  'Carlingford': [-33.7833, 151.0500],
  'Top Ryde': [-33.8150, 151.1042],

  // Western Sydney (First 20)
  'Blacktown': [-33.7668, 150.9054],
  'Mount Druitt': [-33.7729, 150.8185],
  'Rooty Hill': [-33.7729, 150.8435],
  'Doonside': [-33.7668, 150.8685],
  'Penrith': [-33.7511, 150.6942],
  'St Marys': [-33.7668, 150.7742],
  'Kingswood': [-33.7511, 150.7192],
  'Cambridge Park': [-33.7511, 150.7042],
  'Werrington': [-33.7511, 150.7442],
  'St Clair': [-33.7968, 150.7842],
  'Erskine Park': [-33.8168, 150.7942],
  'Colyton': [-33.7829, 150.7942],
  'Oxley Park': [-33.7668, 150.7642],
  'Mount Pleasant': [-33.7511, 150.6842],
  'Whalan': [-33.7629, 150.8085],
  'Tregear': [-33.7529, 150.8185],
  'Bidwill': [-33.7429, 150.8285],
  'Hebersham': [-33.7529, 150.8385],
  'Emerton': [-33.7429, 150.8185],
  'Lethbridge Park': [-33.7329, 150.8285],

  // South West (All 20)
  'Liverpool': [-33.9200, 150.9238],
  'Casula': [-33.9500, 150.9038],
  'Prestons': [-33.9600, 150.8838],
  'Miller': [-33.9200, 150.8838],
  'Cartwright': [-33.9300, 150.8838],
  'Ashcroft': [-33.9200, 150.8938],
  'Sadleir': [-33.9300, 150.8938],
  'Heckenberg': [-33.9300, 150.8838],
  'Busby': [-33.9200, 150.8738],
  'Green Valley': [-33.9100, 150.8838],
  'Bonnyrigg': [-33.8900, 150.8838],
  'Cabramatta': [-33.8944, 150.9358],
  'Canley Vale': [-33.8900, 150.9358],
  'Fairfield': [-33.8733, 150.9558],
  'Fairfield Heights': [-33.8700, 150.9458],
  'Fairfield West': [-33.8700, 150.9358],
  'Smithfield': [-33.8500, 150.9358],
  'Wetherill Park': [-33.8400, 150.9158],
  'Bossley Park': [-33.8500, 150.8958],
  'Prairiewood': [-33.8600, 150.8958],

  // Canterbury-Bankstown (All 20)
  'Bankstown': [-33.9171, 151.0335],
  'Punchbowl': [-33.9300, 151.0535],
  'Lakemba': [-33.9200, 151.0735],
  'Wiley Park': [-33.9300, 151.0635],
  'Belmore': [-33.9200, 151.0885],
  'Riverwood': [-33.9500, 151.0535],
  'Padstow': [-33.9600, 151.0335],
  'Revesby': [-33.9600, 151.0135],
  'Panania': [-33.9500, 151.0235],
  'East Hills': [-33.9600, 151.0035],
  'Chester Hill': [-33.8900, 151.0035],
  'Sefton': [-33.8900, 151.0135],
  'Bass Hill': [-33.9000, 151.0035],
  'Yagoona': [-33.9100, 151.0235],
  'Birrong': [-33.9000, 151.0335],
  'Regents Park': [-33.8800, 151.0235],
  'Berala': [-33.8800, 151.0335],
  'Lidcombe': [-33.8644, 151.0444],
  'Auburn': [-33.8486, 151.0339],
  'Granville': [-33.8350, 151.0139]
};

export const getSuburbsData = async (): Promise<FeatureCollection> => {
  const features: Feature[] = Object.entries(SYDNEY_SUBURBS).map(([name, coordinates]) => ({
    type: 'Feature' as const,
    properties: {
      name,
      zone: trafficLightZones.green.includes(name) ? 'green' :
            trafficLightZones.orange.includes(name) ? 'orange' : 'red'
    },
    geometry: {
      type: 'Point' as const,
      coordinates: coordinates
    }
  }));

  return {
    type: 'FeatureCollection' as const,
    features
  };
}; 
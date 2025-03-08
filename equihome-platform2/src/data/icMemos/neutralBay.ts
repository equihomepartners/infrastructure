import type { Deal } from '../../types';

export const neutralBayDeal: Deal = {
  id: 'neutral-bay-001',
  suburb: 'Neutral Bay',
  propertyValue: 2300000,
  loanAmount: 650000,
  ltv: 29.82,
  projectedRoi: 25.14,
  projectedReturn: 163410,
  propertyType: 'House',
  borrowerProfile: {
    name: 'David',
    familyStatus: 'Single',
    income: 200000,
    useOfFunds: 'Lifestyle'
  },
  propertyDetails: {
    address: '24 Ben Boyd Road, Neutral Bay',
    council: 'NORTH SYDNEY COUNCIL',
    yearlyGrowth: 4.65,
    forecastGrowth: 2.65,
    trafficLight: 'Green',
    firstMortgage: 650000
  },
  loanTerms: {
    startDate: '2020-01-01',
    endDate: '2024-06-30',
    interestRate: 5,
    upsideParticipation: 29.82,
    term: 4.5
  },
  location: {
    latitude: -33.8382,
    longitude: 151.2175
  },
  images: {
    exterior: '/images/neutral_bay_exterior.png',
    interior: [
      '/images/neutral_bay_kitchen.png'
    ]
  },
  investmentThesis: [
    'Neutral Bay is located on the Lower North Shore of Sydney',
    'The property is well located with access to transport both ferry and buses',
    'The house is small, but is well maintained and refurbished',
    'David is single and looking to use the free additional free cashflow for investments for his retirement',
    'The exit strategy is to move into an apartment upon retirement in the next 5 years'
  ],
  riskAssessment: {
    level: 'low',
    factors: [
      'Prime Lower North Shore location',
      'Good transport links',
      'Clear exit strategy',
      'Strong rental market',
      'Well-maintained property'
    ]
  },
  returns: {
    yearlyBreakdown: [
      { year: 2019, propertyValue: 2300000, accruedInterest: 32500, appreciationShare: 51000, totalReturn: 83500, roi: 18.13 },
      { year: 2020, propertyValue: 2415000, accruedInterest: 66625, appreciationShare: 48900, totalReturn: 115525, roi: 25.14 },
      { year: 2021, propertyValue: 2535750, accruedInterest: 102456.25, appreciationShare: -11800, totalReturn: 90656.25, roi: 19.38 },
      { year: 2022, propertyValue: 2662537, accruedInterest: 140079.06, appreciationShare: -75600, totalReturn: 64479.06, roi: 14.00 },
      { year: 2023, propertyValue: 2795664, accruedInterest: 179583.02, appreciationShare: -133200, totalReturn: 46383.02, roi: 10.13 },
      { year: 2024, propertyValue: 2935447, accruedInterest: 221062.17, appreciationShare: -178300, totalReturn: 42762.17, roi: 9.35 },
      { year: 2025, propertyValue: 3082219, accruedInterest: 264615.28, appreciationShare: -224100, totalReturn: 40515.28, roi: 8.76 },
      { year: 2026, propertyValue: 3236330, accruedInterest: 310346.04, appreciationShare: -272300, totalReturn: 38046.04, roi: 8.29 },
      { year: 2027, propertyValue: 3398147, accruedInterest: 358363.34, appreciationShare: -322000, totalReturn: 36363.34, roi: 7.91 },
      { year: 2028, propertyValue: 3568054, accruedInterest: 408781.51, appreciationShare: -374200, totalReturn: 34581.51, roi: 7.58 }
    ],
    optimalExit: {
      year: 4.5,
      totalReturn: 163410,
      roi: 10.65
    }
  },
  marketAnalysis: {
    medianPrice: 2450000,
    yearlyGrowth: 4.65,
    rentalYield: 3.2
  },
  yearBuilt: '1920',
  bedrooms: 3,
  bathrooms: 2,
  parking: 1,
  landSize: 405,
  irr: 10.65,
  interestEarned: 146250,
  equihomeFeeEarned: 186353,
  capitalRepayment: 650000
};
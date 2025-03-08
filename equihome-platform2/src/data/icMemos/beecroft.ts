import type { Deal } from '../../types';

export const beecroftDeal: Deal = {
  id: 'beecroft-001',
  suburb: 'Beecroft',
  propertyValue: 1675000,
  loanAmount: 650000,
  ltv: 40.88,
  projectedRoi: 17.83,
  projectedReturn: 546722,
  propertyType: 'House',
  borrowerProfile: {
    name: 'Tina and Mary',
    familyStatus: 'Married, DINKS',
    income: 350000,
    useOfFunds: 'First Mortgage Repayment'
  },
  propertyDetails: {
    address: '34 Cardinal Avenue, Beecroft',
    council: 'THE COUNCIL OF THE SHIRE OF HORNSBY',
    yearlyGrowth: 6.45,
    forecastGrowth: 4.45,
    trafficLight: 'Green',
    firstMortgage: 400000
  },
  loanTerms: {
    startDate: '2019-02-01',
    endDate: '2023-01-31',
    interestRate: 5,
    upsideParticipation: 40.88,
    term: 4
  },
  location: {
    latitude: -33.7491,
    longitude: 151.0659
  },
  images: {
    exterior: '/images/beecroft_exterior.png',
    interior: [
      '/images/beecroft_kitchen.png',
      '/images/beecroft_backyard.png'
    ]
  },
  investmentThesis: [
    'Beecroft is a suburb located North West of Sydney CBD. The suburb is comprised of large residential blocks, leafy streets, and an affluent area',
    'Access to both public and private schools is a pull factor to the desire of the suburb',
    'Both Tina and Mary are married, no kids, and are looking to refurbish their home in the coming months, enjoy their new home and then sell',
    'Beecroft went through a considerable valuation increase from COVID-19 as the populace looked for large blocks and space for their families to enjoy being "locked down". The growth rates have not held (30%+); however, the median historical growth rate over a 5 year people is 6.45%.',
    'Forecasted growth rate 4.45% is a 200bps conservative adjustment to the median growth rate'
  ],
  riskAssessment: {
    level: 'low',
    factors: [
      'Premium North West Sydney location',
      'Strong school catchment',
      'Clear renovation strategy',
      'High income borrowers',
      'Well-maintained property'
    ]
  },
  returns: {
    yearlyBreakdown: [
      { year: 2019, propertyValue: 1675000, accruedInterest: 32500, appreciationShare: 44200, totalReturn: 76700, roi: 17.18 },
      { year: 2020, propertyValue: 1783375, accruedInterest: 66625, appreciationShare: 27300, totalReturn: 93925, roi: 20.98 },
      { year: 2021, propertyValue: 1899294, accruedInterest: 102456.25, appreciationShare: -23100, totalReturn: 79356.25, roi: 17.83 },
      { year: 2022, propertyValue: 2022748, accruedInterest: 140079.06, appreciationShare: -71800, totalReturn: 68279.06, roi: 15.36 },
      { year: 2023, propertyValue: 2154227, accruedInterest: 179583.02, appreciationShare: -118200, totalReturn: 61383.02, roi: 13.83 },
      { year: 2024, propertyValue: 2294251, accruedInterest: 221062.17, appreciationShare: -164600, totalReturn: 56462.17, roi: 12.73 },
      { year: 2025, propertyValue: 2443378, accruedInterest: 264615.28, appreciationShare: -211000, totalReturn: 53615.28, roi: 11.88 },
      { year: 2026, propertyValue: 2602197, accruedInterest: 310346.04, appreciationShare: -257400, totalReturn: 52946.04, roi: 11.21 },
      { year: 2027, propertyValue: 2771340, accruedInterest: 358363.34, appreciationShare: -303800, totalReturn: 54563.34, roi: 10.65 }
    ],
    optimalExit: {
      year: 4,
      totalReturn: 546722,
      roi: 17.83
    }
  },
  marketAnalysis: {
    medianPrice: 1590000,
    yearlyGrowth: 6.45,
    rentalYield: 2.8
  },
  yearBuilt: '1935',
  bedrooms: 4,
  bathrooms: 2,
  parking: 2,
  landSize: 650,
  irr: 17.83,
  interestEarned: 130000,
  equihomeFeeEarned: 416722,
  capitalRepayment: 650000
};
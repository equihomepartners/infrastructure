export const pymbleDeal = {
    id: 'pymble-001',
    suburb: 'Pymble',
    propertyValue: 1850000,
    loanAmount: 650000,
    ltv: 37.14,
    propertyType: 'House',
    borrowerProfile: {
        name: 'Geoff and Barbara',
        familyStatus: 'Married, 2 Kids',
        income: 200000,
        useOfFunds: 'Bank of Mum and Dad'
    },
    propertyDetails: {
        address: '28 Telegraph Road, Pymble',
        council: 'KU-RING-GAI COUNCIL',
        yearlyGrowth: 14.88,
        forecastGrowth: 12.88,
        trafficLight: 'Green',
        firstMortgage: 650000
    },
    loanTerms: {
        startDate: '2020-09-01',
        endDate: '2024-08-31',
        interestRate: 5,
        upsideParticipation: 37.14,
        term: 4
    },
    location: {
        latitude: -33.7456,
        longitude: 151.1432
    },
    images: {
        exterior: '/images/pymble_exterior.png',
        interior: [
            '/images/pymble_kitchen.png',
            '/images/pymble_backyard.png'
        ]
    },
    investmentThesis: [
        'Pymble is a suburb located on the Upper North Shore of Sydney',
        'The property is well located with access to the CBD via train',
        'The house is recently refurbished and is located on one of the best streets in Pymble',
        'The suburb is known for families, leafy large streets and green spaces',
        'The suburb has direct access to private schools in the area',
        'Geoff and Barbara have recently purchased the home through the sale of their business',
        'The couple now want to focus on setting up their children and are providing additional deposit support'
    ],
    riskAssessment: {
        level: 'low',
        factors: [
            'Premium Upper North Shore location',
            'Strong family area',
            'Clear exit strategy',
            'High income borrowers',
            'Well-maintained property'
        ]
    },
    returns: {
        yearlyBreakdown: [
            { year: 2019, propertyValue: 1850000, accruedInterest: 32500, appreciationShare: 55000, totalReturn: 87500, roi: 55.35 },
            { year: 2020, propertyValue: 1942500, accruedInterest: 66625, appreciationShare: 48900, totalReturn: 115525, roi: 37.18 },
            { year: 2021, propertyValue: 2039625, accruedInterest: 102456.25, appreciationShare: -1800, totalReturn: 100656.25, roi: 26.23 },
            { year: 2022, propertyValue: 2141606, accruedInterest: 140079.06, appreciationShare: -38500, totalReturn: 101579.06, roi: 21.97 },
            { year: 2023, propertyValue: 2248686, accruedInterest: 179583.02, appreciationShare: -75200, totalReturn: 104383.02, roi: 20.54 },
            { year: 2024, propertyValue: 2361120, accruedInterest: 221062.17, appreciationShare: -111900, totalReturn: 109162.17, roi: 19.53 },
            { year: 2025, propertyValue: 2479176, accruedInterest: 264615.28, appreciationShare: -148600, totalReturn: 116015.28, roi: 18.75 },
            { year: 2026, propertyValue: 2603135, accruedInterest: 310346.04, appreciationShare: -185300, totalReturn: 125046.04, roi: 18.13 },
            { year: 2027, propertyValue: 2733292, accruedInterest: 358363.34, appreciationShare: -222000, totalReturn: 136363.34, roi: 17.63 },
            { year: 2028, propertyValue: 2869957, accruedInterest: 408781.51, appreciationShare: -258700, totalReturn: 150081.51, roi: 17.22 }
        ],
        optimalExit: {
            year: 4,
            totalReturn: 719042,
            roi: 21.97
        }
    },
    marketAnalysis: {
        medianPrice: 1950000,
        yearlyGrowth: 14.88,
        rentalYield: 2.9
    },
    yearBuilt: '1935',
    bedrooms: 4,
    bathrooms: 2,
    parking: 2,
    landSize: 680,
    irr: 21.97,
    interestEarned: 130000,
    equihomeFeeEarned: 589042,
    capitalRepayment: 650000
};

export const randwickDeal = {
    id: 'randwick-001',
    suburb: 'Randwick',
    propertyValue: 1632500,
    loanAmount: 650000,
    ltv: 41.94,
    projectedRoi: 11.21,
    projectedReturn: 410317,
    propertyType: 'House',
    borrowerProfile: {
        name: 'Tessa & John',
        familyStatus: 'Married, 2 Kids',
        income: 250000,
        useOfFunds: 'Repayment of First Mortgage'
    },
    propertyDetails: {
        address: '4 Hodgson Street, Randwick',
        council: 'RANDWICK CITY COUNCIL',
        yearlyGrowth: 4.12,
        forecastGrowth: 2.12,
        trafficLight: 'Green',
        firstMortgage: 650000
    },
    loanTerms: {
        startDate: '2019-03-01',
        endDate: '2024-02-29',
        interestRate: 5,
        upsideParticipation: 41.94,
        term: 5
    },
    location: {
        latitude: -33.9148,
        longitude: 151.2425
    },
    images: {
        exterior: '/images/randwick_exterior.png',
        interior: [
            '/images/randwick_kitchen.png'
        ]
    },
    investmentThesis: [
        'Randwick is a suburb located on the Eastern Suburbs of Sydney',
        'The property is well located with access to the CBD, Centennial Park, and the Eastern Beaches',
        'The house is small, but is well maintained and refurbished',
        'Tessa and John are looking to use the free additional free cashflow to save for a larger deposit for a larger home to raise their children',
        'The exit strategy is to sell the house and use the upside + the additional deposit to buy a larger home with traditional mortgage products'
    ],
    riskAssessment: {
        level: 'low',
        factors: [
            'Premium Eastern Suburbs location',
            'Strong transport links',
            'Clear exit strategy',
            'Well-maintained property',
            'High demand area'
        ]
    },
    returns: {
        yearlyBreakdown: [
            { year: 2019, propertyValue: 1632500, accruedInterest: 32500, appreciationShare: 28500, totalReturn: 61000, roi: 16.81 },
            { year: 2020, propertyValue: 1699900, accruedInterest: 66625, appreciationShare: 24800, totalReturn: 91425, roi: 17.43 },
            { year: 2021, propertyValue: 1770296, accruedInterest: 102456.25, appreciationShare: -1800, totalReturn: 100656.25, roi: 18.07 },
            { year: 2022, propertyValue: 1843848, accruedInterest: 140079.06, appreciationShare: -38500, totalReturn: 101579.06, roi: 12.76 },
            { year: 2023, propertyValue: 1920685, accruedInterest: 179583.02, appreciationShare: -75200, totalReturn: 104383.02, roi: 11.21 },
            { year: 2024, propertyValue: 2001033, accruedInterest: 221062.17, appreciationShare: -111900, totalReturn: 109162.17, roi: 10.13 },
            { year: 2025, propertyValue: 2085076, accruedInterest: 264615.28, appreciationShare: -148600, totalReturn: 116015.28, roi: 9.34 },
            { year: 2026, propertyValue: 2172924, accruedInterest: 310346.04, appreciationShare: -185300, totalReturn: 125046.04, roi: 8.72 },
            { year: 2027, propertyValue: 2264731, accruedInterest: 358363.34, appreciationShare: -222000, totalReturn: 136363.34, roi: 8.23 },
            { year: 2028, propertyValue: 2360681, accruedInterest: 408781.51, appreciationShare: -258700, totalReturn: 150081.51, roi: 7.82 }
        ],
        optimalExit: {
            year: 5,
            totalReturn: 410317,
            roi: 11.21
        }
    },
    marketAnalysis: {
        medianPrice: 1550000,
        yearlyGrowth: 4.12,
        rentalYield: 2.9
    },
    yearBuilt: '1920',
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    landSize: 380,
    irr: 11.21,
    interestEarned: 162500,
    equihomeFeeEarned: 247817,
    capitalRepayment: 650000
};

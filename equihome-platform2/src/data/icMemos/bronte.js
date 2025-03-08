export const bronteDeal = {
    id: 'bronte-001',
    suburb: 'Bronte',
    propertyValue: 3150000,
    loanAmount: 500000,
    ltv: 16.72,
    projectedRoi: 21.94,
    projectedReturn: 781830,
    propertyType: 'House',
    borrowerProfile: {
        name: 'Daniel and Isabella',
        familyStatus: 'Married, 2 Kids',
        income: 200000,
        useOfFunds: 'Home refurbishment'
    },
    propertyDetails: {
        address: '6 Gordon Place, Bronte',
        council: 'WAVERLEY COUNCIL',
        yearlyGrowth: 10.70,
        forecastGrowth: 8.70,
        trafficLight: 'Green',
        firstMortgage: 500000
    },
    loanTerms: {
        startDate: '2019-03-01',
        endDate: '2024-02-29',
        interestRate: 5,
        upsideParticipation: 16.72,
        term: 5
    },
    location: {
        latitude: -33.9025,
        longitude: 151.2630
    },
    images: {
        exterior: '/images/bronte_exterior.png',
        interior: [
            '/images/bronte_kitchen.png',
            '/images/bronte_backyard.png'
        ]
    },
    investmentThesis: [
        'Bronte is a suburb located on the Eastern Beaches of Sydney',
        'The property is well located with access to the CBD, Centennial Park, and the Eastern Beaches',
        'The house is small, but is well maintained and refurbished',
        'Daniel and Isabella have recently purchased the home by downsizing the family home',
        'The home is dated and they want to do cosmetic improvements to the home before moving in',
        'This is a perfect use of funds for Equihome'
    ],
    riskAssessment: {
        level: 'low',
        factors: [
            'Premium Eastern Suburbs location',
            'Strong growth potential',
            'Clear renovation strategy',
            'Low LTV ratio',
            'Well-maintained property'
        ]
    },
    returns: {
        yearlyBreakdown: [
            { year: 2019, propertyValue: 3150000, accruedInterest: 25000, appreciationShare: 28500, totalReturn: 53500, roi: 16.93 },
            { year: 2020, propertyValue: 3307500, accruedInterest: 51250, appreciationShare: 24800, totalReturn: 76050, roi: 24.16 },
            { year: 2021, propertyValue: 3472875, accruedInterest: 78812.50, appreciationShare: -1800, totalReturn: 77012.50, roi: 24.43 },
            { year: 2022, propertyValue: 3646519, accruedInterest: 107753.13, appreciationShare: -38500, totalReturn: 69253.13, roi: 21.94 },
            { year: 2023, propertyValue: 3828845, accruedInterest: 138140.78, appreciationShare: -75200, totalReturn: 62940.78, roi: 19.99 },
            { year: 2024, propertyValue: 4020287, accruedInterest: 170047.82, appreciationShare: -111900, totalReturn: 58147.82, roi: 18.42 },
            { year: 2025, propertyValue: 4221301, accruedInterest: 203550.21, appreciationShare: -148600, totalReturn: 54950.21, roi: 17.29 },
            { year: 2026, propertyValue: 4432366, accruedInterest: 238727.72, appreciationShare: -185300, totalReturn: 53427.72, roi: 16.40 },
            { year: 2027, propertyValue: 4653985, accruedInterest: 275664.11, appreciationShare: -222000, totalReturn: 53664.11, roi: 15.68 }
        ],
        optimalExit: {
            year: 5,
            totalReturn: 781830,
            roi: 21.94
        }
    },
    marketAnalysis: {
        medianPrice: 2990000,
        yearlyGrowth: 10.70,
        rentalYield: 2.8
    },
    yearBuilt: '1925',
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    landSize: 420,
    irr: 21.94,
    interestEarned: 125000,
    equihomeFeeEarned: 656830,
    capitalRepayment: 500000
};

export const willoughbyDeal = {
    id: 'willoughby-001',
    suburb: 'Willoughby',
    propertyValue: 2850000,
    loanAmount: 750000,
    ltv: 27.78,
    projectedRoi: 26.59,
    projectedReturn: 584748,
    propertyType: 'House',
    borrowerProfile: {
        name: 'Chris',
        familyStatus: 'Single',
        income: 150000,
        useOfFunds: 'Lifestyle'
    },
    propertyDetails: {
        address: '11 High Street, Willoughby',
        council: 'WILLOUGHBY CITY COUNCIL',
        yearlyGrowth: 2.94,
        forecastGrowth: 0.94,
        trafficLight: 'Green',
        firstMortgage: 750000
    },
    loanTerms: {
        startDate: '2020-01-01',
        endDate: '2024-12-31',
        interestRate: 5,
        upsideParticipation: 27.78,
        term: 5
    },
    location: {
        latitude: -33.8021,
        longitude: 151.1957
    },
    images: {
        exterior: '/images/willoughby_exterior.png',
        interior: [
            '/images/willoughby_kitchen.png',
            '/images/willoughby_backyard.png'
        ]
    },
    investmentThesis: [
        'Willoughby is located in the lower north shore of Sydney',
        'The area is centrally located for the CBD travel and access to private school',
        'The suburb is key collection area for selective schools in Northern Sydney',
        'Chris has no debt and wanting to fund his lifestyle until selling his home to move into an over 55s'
    ],
    riskAssessment: {
        level: 'low',
        factors: [
            'Premium Lower North Shore location',
            'Strong school catchment',
            'Clear exit strategy',
            'No existing debt',
            'Well-maintained property'
        ]
    },
    returns: {
        yearlyBreakdown: [
            { year: 2019, propertyValue: 2850000, accruedInterest: 37500, appreciationShare: 42750, totalReturn: 80250, roi: 16.02 },
            { year: 2020, propertyValue: 2992500, accruedInterest: 76875, appreciationShare: 39900, totalReturn: 116775, roi: 15.29 },
            { year: 2021, propertyValue: 3142125, accruedInterest: 118218.75, appreciationShare: -22800, totalReturn: 95418.75, roi: 15.73 },
            { year: 2022, propertyValue: 3299231, accruedInterest: 161629.69, appreciationShare: -85500, totalReturn: 76129.69, roi: 13.19 },
            { year: 2023, propertyValue: 3464193, accruedInterest: 207211.17, appreciationShare: -148200, totalReturn: 59011.17, roi: 11.52 },
            { year: 2024, propertyValue: 3637403, accruedInterest: 255071.73, appreciationShare: -210900, totalReturn: 44171.73, roi: 10.33 },
            { year: 2025, propertyValue: 3819273, accruedInterest: 305325.32, appreciationShare: -273600, totalReturn: 31725.32, roi: 9.43 },
            { year: 2026, propertyValue: 4010237, accruedInterest: 358091.58, appreciationShare: -336300, totalReturn: 21791.58, roi: 8.72 },
            { year: 2027, propertyValue: 4210749, accruedInterest: 413496.16, appreciationShare: -399000, totalReturn: 14496.16, roi: 8.16 }
        ],
        optimalExit: {
            year: 5,
            totalReturn: 584748,
            roi: 26.59
        }
    },
    marketAnalysis: {
        medianPrice: 2700000,
        yearlyGrowth: 2.94,
        rentalYield: 2.9
    },
    yearBuilt: '1925',
    bedrooms: 4,
    bathrooms: 2,
    parking: 2,
    landSize: 607,
    irr: 13.19,
    interestEarned: 187500,
    equihomeFeeEarned: 397248,
    capitalRepayment: 750000
};

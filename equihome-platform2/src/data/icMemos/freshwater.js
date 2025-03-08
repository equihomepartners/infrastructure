export const freshwaterDeal = {
    id: 'freshwater-001',
    suburb: 'Freshwater',
    propertyValue: 2950000,
    loanAmount: 800000,
    ltv: 28.57,
    propertyType: 'House',
    borrowerProfile: {
        name: 'Belinda & Tony',
        familyStatus: 'Family, 3 Kids',
        income: 400000,
        useOfFunds: 'Lifestyle'
    },
    propertyDetails: {
        address: '22 Soliders Avenue, Freshwater',
        council: 'NORTHERN BEACHES COUNCIL',
        yearlyGrowth: 4.67,
        forecastGrowth: 2.67,
        trafficLight: 'Green',
        firstMortgage: 800000
    },
    loanTerms: {
        startDate: '2020-01-01',
        endDate: '2023-12-31',
        interestRate: 5,
        upsideParticipation: 28.57,
        term: 4
    },
    location: {
        latitude: -33.7827,
        longitude: 151.2897
    },
    images: {
        exterior: '/images/freshwater_exterior.png',
        interior: [
            '/images/freshwater_living_room.png',
            '/images/freshwater_living_room_two.png'
        ]
    },
    investmentThesis: [
        'Freshwater is a suburb located on the Northern Beaches and represents the Australian lifestyle',
        'The property is well located, with family amenities (Pool)',
        'Belinda and Tony are using Equihome to repay their 1st mortgage, free up cashflow for the next chapter in their lives',
        'Their children are beginning to move out with a view of downsizing in the future',
        'Their combined income of $400K enables the opportunity for a recapitalisation out of the position as well as a sale'
    ],
    riskAssessment: {
        level: 'low',
        factors: [
            'Premium Northern Beaches location',
            'Strong family area',
            'Clear exit strategy',
            'High income borrowers',
            'Well-maintained property'
        ]
    },
    returns: {
        yearlyBreakdown: [
            { year: 2019, propertyValue: 2950000, accruedInterest: 40000, appreciationShare: 55000, totalReturn: 95000, roi: 27.51 },
            { year: 2020, propertyValue: 3097500, accruedInterest: 82000, appreciationShare: 62000, totalReturn: 144000, roi: 41.58 },
            { year: 2021, propertyValue: 3252375, accruedInterest: 126100, appreciationShare: -15000, totalReturn: 111100, roi: 25.71 },
            { year: 2022, propertyValue: 3414994, accruedInterest: 172405, appreciationShare: -92000, totalReturn: 80405, roi: 18.22 },
            { year: 2023, propertyValue: 3585744, accruedInterest: 221025, appreciationShare: -169000, totalReturn: 52025, roi: 15.43 },
            { year: 2024, propertyValue: 3765031, accruedInterest: 272076, appreciationShare: -246000, totalReturn: 26076, roi: 13.60 },
            { year: 2025, propertyValue: 3953283, accruedInterest: 325680, appreciationShare: -323000, totalReturn: 2680, roi: 12.29 },
            { year: 2026, propertyValue: 4150947, accruedInterest: 381964, appreciationShare: -400000, totalReturn: -18036, roi: 11.29 },
            { year: 2027, propertyValue: 4358494, accruedInterest: 441062, appreciationShare: -477000, totalReturn: -35938, roi: 10.51 }
        ],
        optimalExit: {
            year: 4,
            totalReturn: 691264,
            roi: 18.22
        }
    },
    marketAnalysis: {
        medianPrice: 2800000,
        yearlyGrowth: 4.67,
        rentalYield: 3.1
    },
    yearBuilt: '1920',
    bedrooms: 4,
    bathrooms: 2,
    parking: 2,
    landSize: 556,
    irr: 18.22,
    interestEarned: 160000,
    equihomeFeeEarned: 531264,
    capitalRepayment: 800000
};

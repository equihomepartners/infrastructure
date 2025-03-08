export const mosmanDeal = {
    id: 'mosman-001',
    suburb: 'Mosman',
    propertyValue: 2800000,
    loanAmount: 500000,
    ltv: 18.80,
    projectedRoi: 20.74,
    projectedReturn: 404966,
    propertyType: 'House',
    borrowerProfile: {
        name: 'Thomas and Sabrina',
        familyStatus: 'Married, Kids Left the house',
        income: 200000,
        useOfFunds: 'Bank of Mum and Dad'
    },
    propertyDetails: {
        address: '49A Central Avenue, Mosman',
        council: 'MOSMAN MUNICIPAL COUNCIL',
        yearlyGrowth: 7.90,
        forecastGrowth: 5.90,
        trafficLight: 'Green',
        firstMortgage: 0
    },
    loanTerms: {
        startDate: '2020-01-01',
        endDate: '2023-05-31',
        interestRate: 5,
        upsideParticipation: 18.80,
        term: 3.416666667
    },
    location: {
        latitude: -33.8279,
        longitude: 151.2412
    },
    images: {
        exterior: '/images/mosman_exterior.png',
        interior: [
            '/images/mosman_kitchen.png',
            '/images/mosman_living_room.png'
        ]
    },
    investmentThesis: [
        'Very affluent suburb in Sydney with a high median house price',
        'This is the perfect profile for Equihome as the mortgage holder has no debt, in a land restrained suburb. The asset has the ability for further development under a DA application.',
        'Use of funds will be the bank of mum and dad, allowing their children to buy a home',
        'Very desirable suburb to live in, demand is always high for homes in the area.'
    ],
    riskAssessment: {
        level: 'low',
        factors: [
            'Premium Eastern Suburbs location',
            'No existing debt',
            'High property value',
            'Strong growth potential',
            'Desirable suburb'
        ]
    },
    returns: {
        yearlyBreakdown: [
            { year: 2019, propertyValue: 2800000, accruedInterest: 25000, appreciationShare: 41480, totalReturn: 66480, roi: 40.74 },
            { year: 2020, propertyValue: 2968000, accruedInterest: 51250, appreciationShare: 31600, totalReturn: 82850, roi: 27.80 },
            { year: 2021, propertyValue: 3146080, accruedInterest: 78812.50, appreciationShare: 19700, totalReturn: 98512.50, roi: 19.79 },
            { year: 2022, propertyValue: 3334845, accruedInterest: 107753.13, appreciationShare: -12400, totalReturn: 95353.13, roi: 19.14 },
            { year: 2023, propertyValue: 3534935, accruedInterest: 138140.78, appreciationShare: -54100, totalReturn: 84040.78, roi: 16.82 },
            { year: 2024, propertyValue: 3747031, accruedInterest: 170047.82, appreciationShare: -93800, totalReturn: 76247.82, roi: 15.26 },
            { year: 2025, propertyValue: 3971853, accruedInterest: 203550.21, appreciationShare: -133500, totalReturn: 70050.21, roi: 14.13 },
            { year: 2026, propertyValue: 4210164, accruedInterest: 238727.72, appreciationShare: -173200, totalReturn: 65527.72, roi: 13.25 },
            { year: 2027, propertyValue: 4462774, accruedInterest: 275664.11, appreciationShare: -212900, totalReturn: 62764.11, roi: 12.55 },
            { year: 2028, propertyValue: 4730540, accruedInterest: 314445.31, appreciationShare: -252600, totalReturn: 61845.31, roi: 11.98 }
        ],
        optimalExit: {
            year: 3.416666667,
            totalReturn: 404966,
            roi: 20.74
        }
    },
    marketAnalysis: {
        medianPrice: 2660000,
        yearlyGrowth: 7.90,
        rentalYield: 2.5
    },
    yearBuilt: '1920',
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    landSize: 580,
    irr: 20.74,
    interestEarned: 85417,
    equihomeFeeEarned: 319549,
    capitalRepayment: 500000
};

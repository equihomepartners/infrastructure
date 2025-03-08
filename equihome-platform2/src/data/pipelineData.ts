import type { PipelineDeal } from '../types';

export const pipelineDeals: PipelineDeal[] = [
  {
    id: 'pipeline-001',
    propertyDetails: {
      address: '42 Mosman Street, Mosman',
      currentValue: 4200000,
      latitude: -33.8279,
      longitude: 151.2412,
      medianPriceByType: 3950000,
      riskAdjustment: 10,
      forecastedGrowthRate: 7.2
    },
    loanRequest: {
      amount: 850000,
      existingMortgage: 1200000,
      ltv: 20.24,
      purpose: 'Investment'
    },
    borrowerDetails: {
      name: 'James & Sarah Wilson',
      income: 450000,
      occupation: 'Business Owners'
    },
    underwriteScore: 85,
    applicationDate: '2024-03-01',
    expectedFundingDate: '2024-03-15',
    returns: {
      forecastedIrr: 18.4,
      yearlyProjections: [
        { year: 1, totalReturn: 156000, irr: 18.4 },
        { year: 2, totalReturn: 325000, irr: 19.1 },
        { year: 3, totalReturn: 508000, irr: 19.8 },
        { year: 4, totalReturn: 706000, irr: 20.2 },
        { year: 5, totalReturn: 920000, irr: 20.5 }
      ]
    }
  },
  {
    id: 'pipeline-002',
    propertyDetails: {
      address: '15 Bellevue Hill Road, Bellevue Hill',
      currentValue: 5500000,
      latitude: -33.8816,
      longitude: 151.2543,
      medianPriceByType: 5200000,
      riskAdjustment: 8,
      forecastedGrowthRate: 8.1
    },
    loanRequest: {
      amount: 1200000,
      existingMortgage: 0,
      ltv: 21.82,
      purpose: 'Investment'
    },
    borrowerDetails: {
      name: 'Michael & Emma Thompson',
      income: 650000,
      occupation: 'Investment Bankers'
    },
    underwriteScore: 88,
    applicationDate: '2024-03-02',
    expectedFundingDate: '2024-03-16',
    returns: {
      forecastedIrr: 19.2,
      yearlyProjections: [
        { year: 1, totalReturn: 230400, irr: 19.2 },
        { year: 2, totalReturn: 478800, irr: 19.8 },
        { year: 3, totalReturn: 747600, irr: 20.4 },
        { year: 4, totalReturn: 1038000, irr: 20.9 },
        { year: 5, totalReturn: 1352400, irr: 21.3 }
      ]
    }
  },
  {
    id: 'pipeline-003',
    propertyDetails: {
      address: '28 Wunulla Road, Point Piper',
      currentValue: 6800000,
      latitude: -33.8636,
      longitude: 151.2571,
      medianPriceByType: 6500000,
      riskAdjustment: 7,
      forecastedGrowthRate: 8.5
    },
    loanRequest: {
      amount: 1500000,
      existingMortgage: 0,
      ltv: 22.06,
      purpose: 'Investment'
    },
    borrowerDetails: {
      name: 'Richard & Margaret Baker',
      income: 750000,
      occupation: 'Investment Bankers'
    },
    underwriteScore: 93,
    applicationDate: '2024-03-03',
    expectedFundingDate: '2024-03-17',
    returns: {
      forecastedIrr: 20.1,
      yearlyProjections: [
        { year: 1, totalReturn: 301500, irr: 20.1 },
        { year: 2, totalReturn: 632000, irr: 21.0 },
        { year: 3, totalReturn: 995000, irr: 21.8 },
        { year: 4, totalReturn: 1390000, irr: 22.3 },
        { year: 5, totalReturn: 1820000, irr: 22.8 }
      ]
    }
  },
  {
    id: 'pipeline-004',
    propertyDetails: {
      address: '56 Norton Street, Leichhardt',
      currentValue: 1850000,
      latitude: -33.8838,
      longitude: 151.1571,
      medianPriceByType: 1780000,
      riskAdjustment: 14,
      forecastedGrowthRate: 5.4
    },
    loanRequest: {
      amount: 420000,
      existingMortgage: 650000,
      ltv: 22.70,
      purpose: 'Renovation'
    },
    borrowerDetails: {
      name: 'Marco & Sofia Rossi',
      income: 210000,
      occupation: 'Restaurant Owners'
    },
    underwriteScore: 72,
    applicationDate: '2024-03-04',
    expectedFundingDate: '2024-03-18',
    returns: {
      forecastedIrr: 14.8,
      yearlyProjections: [
        { year: 1, totalReturn: 62160, irr: 14.8 },
        { year: 2, totalReturn: 130000, irr: 15.2 },
        { year: 3, totalReturn: 203000, irr: 15.7 },
        { year: 4, totalReturn: 282000, irr: 16.1 },
        { year: 5, totalReturn: 367000, irr: 16.5 }
      ]
    }
  },
  {
    id: 'pipeline-005',
    propertyDetails: {
      address: '128 Chapel Road, Bankstown',
      currentValue: 920000,
      latitude: -33.9171,
      longitude: 151.0353,
      medianPriceByType: 890000,
      riskAdjustment: 19,
      forecastedGrowthRate: 3.8
    },
    loanRequest: {
      amount: 210000,
      existingMortgage: 420000,
      ltv: 22.83,
      purpose: 'Home Improvement'
    },
    borrowerDetails: {
      name: 'John & Mary Nguyen',
      income: 135000,
      occupation: 'Retail Workers'
    },
    underwriteScore: 48,
    applicationDate: '2024-03-05',
    expectedFundingDate: '2024-03-19',
    returns: {
      forecastedIrr: 11.5,
      yearlyProjections: [
        { year: 1, totalReturn: 24150, irr: 11.5 },
        { year: 2, totalReturn: 50000, irr: 11.9 },
        { year: 3, totalReturn: 78000, irr: 12.3 },
        { year: 4, totalReturn: 108000, irr: 12.6 },
        { year: 5, totalReturn: 140000, irr: 12.9 }
      ]
    }
  },
  {
    id: 'pipeline-006',
    propertyDetails: {
      address: '42 Pentecost Avenue, St Ives',
      currentValue: 2200000,
      latitude: -33.7444,
      longitude: 151.1681,
      medianPriceByType: 2100000,
      riskAdjustment: 13,
      forecastedGrowthRate: 5.8
    },
    loanRequest: {
      amount: 500000,
      existingMortgage: 800000,
      ltv: 22.73,
      purpose: 'Investment'
    },
    borrowerDetails: {
      name: 'David & Rachel Thompson',
      income: 280000,
      occupation: 'IT Professionals'
    },
    underwriteScore: 75,
    applicationDate: '2024-03-06',
    expectedFundingDate: '2024-03-20',
    returns: {
      forecastedIrr: 15.2,
      yearlyProjections: [
        { year: 1, totalReturn: 76000, irr: 15.2 },
        { year: 2, totalReturn: 158000, irr: 15.7 },
        { year: 3, totalReturn: 247000, irr: 16.2 },
        { year: 4, totalReturn: 343000, irr: 16.6 },
        { year: 5, totalReturn: 446000, irr: 17.0 }
      ]
    }
  },
  {
    id: 'pipeline-007',
    propertyDetails: {
      address: '89 Macquarie Street, Liverpool',
      currentValue: 780000,
      latitude: -33.9208,
      longitude: 150.9246,
      medianPriceByType: 750000,
      riskAdjustment: 21,
      forecastedGrowthRate: 3.2
    },
    loanRequest: {
      amount: 180000,
      existingMortgage: 320000,
      ltv: 23.08,
      purpose: 'Debt Consolidation'
    },
    borrowerDetails: {
      name: 'Sam & Lucy Chen',
      income: 115000,
      occupation: 'Factory Workers'
    },
    underwriteScore: 42,
    applicationDate: '2024-03-07',
    expectedFundingDate: '2024-03-21',
    returns: {
      forecastedIrr: 10.8,
      yearlyProjections: [
        { year: 1, totalReturn: 19440, irr: 10.8 },
        { year: 2, totalReturn: 40000, irr: 11.2 },
        { year: 3, totalReturn: 63000, irr: 11.6 },
        { year: 4, totalReturn: 88000, irr: 11.9 },
        { year: 5, totalReturn: 115000, irr: 12.2 }
      ]
    }
  },
  {
    id: 'pipeline-008',
    propertyDetails: {
      address: '15 Military Road, Neutral Bay',
      currentValue: 3200000,
      latitude: -33.8382,
      longitude: 151.2175,
      medianPriceByType: 3100000,
      riskAdjustment: 11,
      forecastedGrowthRate: 6.8
    },
    loanRequest: {
      amount: 700000,
      existingMortgage: 900000,
      ltv: 21.88,
      purpose: 'Renovation'
    },
    borrowerDetails: {
      name: 'Peter & Jane Anderson',
      income: 320000,
      occupation: 'Medical Professionals'
    },
    underwriteScore: 72,
    applicationDate: '2024-03-08',
    expectedFundingDate: '2024-03-22',
    returns: {
      forecastedIrr: 17.6,
      yearlyProjections: [
        { year: 1, totalReturn: 123200, irr: 17.6 },
        { year: 2, totalReturn: 256000, irr: 18.2 },
        { year: 3, totalReturn: 399000, irr: 18.8 },
        { year: 4, totalReturn: 552000, irr: 19.3 },
        { year: 5, totalReturn: 716000, irr: 19.7 }
      ]
    }
  },
  {
    id: 'pipeline-009',
    propertyDetails: {
      address: '234 Woodville Road, Merrylands',
      currentValue: 880000,
      latitude: -33.8348,
      longitude: 151.0034,
      medianPriceByType: 850000,
      riskAdjustment: 20,
      forecastedGrowthRate: 3.5
    },
    loanRequest: {
      amount: 200000,
      existingMortgage: 380000,
      ltv: 22.73,
      purpose: 'Debt Consolidation'
    },
    borrowerDetails: {
      name: 'Ali & Fatima Hassan',
      income: 125000,
      occupation: 'Small Business Owners'
    },
    underwriteScore: 45,
    applicationDate: '2024-03-09',
    expectedFundingDate: '2024-03-23',
    returns: {
      forecastedIrr: 11.2,
      yearlyProjections: [
        { year: 1, totalReturn: 22400, irr: 11.2 },
        { year: 2, totalReturn: 46000, irr: 11.6 },
        { year: 3, totalReturn: 72000, irr: 12.0 },
        { year: 4, totalReturn: 100000, irr: 12.3 },
        { year: 5, totalReturn: 130000, irr: 12.6 }
      ]
    }
  },
  {
    id: 'pipeline-010',
    propertyDetails: {
      address: '77 Raglan Street, Mosman',
      currentValue: 4800000,
      latitude: -33.8279,
      longitude: 151.2412,
      medianPriceByType: 4600000,
      riskAdjustment: 9,
      forecastedGrowthRate: 7.5
    },
    loanRequest: {
      amount: 1000000,
      existingMortgage: 1500000,
      ltv: 20.83,
      purpose: 'Investment'
    },
    borrowerDetails: {
      name: 'William & Victoria Hughes',
      income: 520000,
      occupation: 'Corporate Executives'
    },
    underwriteScore: 77,
    applicationDate: '2024-03-10',
    expectedFundingDate: '2024-03-24',
    returns: {
      forecastedIrr: 18.8,
      yearlyProjections: [
        { year: 1, totalReturn: 188000, irr: 18.8 },
        { year: 2, totalReturn: 390000, irr: 19.4 },
        { year: 3, totalReturn: 608000, irr: 20.0 },
        { year: 4, totalReturn: 842000, irr: 20.5 },
        { year: 5, totalReturn: 1092000, irr: 20.9 }
      ]
    }
  },
  {
    id: 'pipeline-011',
    propertyDetails: {
      address: '25 Birrell Street, Bondi Junction',
      currentValue: 2100000,
      latitude: -33.8932,
      longitude: 151.2503,
      medianPriceByType: 2000000,
      riskAdjustment: 15,
      forecastedGrowthRate: 5.2
    },
    loanRequest: {
      amount: 450000,
      existingMortgage: 700000,
      ltv: 21.43,
      purpose: 'Renovation'
    },
    borrowerDetails: {
      name: 'Daniel & Sophie Lee',
      income: 230000,
      occupation: 'Healthcare Professionals'
    },
    underwriteScore: 68,
    applicationDate: '2024-03-11',
    expectedFundingDate: '2024-03-25',
    returns: {
      forecastedIrr: 14.2,
      yearlyProjections: [
        { year: 1, totalReturn: 63900, irr: 14.2 },
        { year: 2, totalReturn: 133000, irr: 14.7 },
        { year: 3, totalReturn: 207000, irr: 15.2 },
        { year: 4, totalReturn: 287000, irr: 15.6 },
        { year: 5, totalReturn: 372000, irr: 16.0 }
      ]
    }
  },
  {
    id: 'pipeline-012',
    propertyDetails: {
      address: '8 Cliff Street, Manly',
      currentValue: 3800000,
      latitude: -33.7969,
      longitude: 151.2887,
      medianPriceByType: 3600000,
      riskAdjustment: 12,
      forecastedGrowthRate: 6.4
    },
    loanRequest: {
      amount: 800000,
      existingMortgage: 1100000,
      ltv: 21.05,
      purpose: 'Investment'
    },
    borrowerDetails: {
      name: 'Thomas & Emily White',
      income: 380000,
      occupation: 'Legal Professionals'
    },
    underwriteScore: 71,
    applicationDate: '2024-03-12',
    expectedFundingDate: '2024-03-26',
    returns: {
      forecastedIrr: 16.8,
      yearlyProjections: [
        { year: 1, totalReturn: 134400, irr: 16.8 },
        { year: 2, totalReturn: 280000, irr: 17.4 },
        { year: 3, totalReturn: 437000, irr: 18.0 },
        { year: 4, totalReturn: 606000, irr: 18.5 },
        { year: 5, totalReturn: 787000, irr: 18.9 }
      ]
    }
  },
  {
    id: 'pipeline-013',
    propertyDetails: {
      address: '45 Beamish Street, Campsie',
      currentValue: 950000,
      latitude: -33.9147,
      longitude: 151.1036,
      medianPriceByType: 920000,
      riskAdjustment: 18,
      forecastedGrowthRate: 4.1
    },
    loanRequest: {
      amount: 220000,
      existingMortgage: 400000,
      ltv: 23.16,
      purpose: 'Home Improvement'
    },
    borrowerDetails: {
      name: 'Robert & Maria Santos',
      income: 140000,
      occupation: 'Teachers'
    },
    underwriteScore: 52,
    applicationDate: '2024-03-13',
    expectedFundingDate: '2024-03-27',
    returns: {
      forecastedIrr: 12.1,
      yearlyProjections: [
        { year: 1, totalReturn: 26620, irr: 12.1 },
        { year: 2, totalReturn: 55000, irr: 12.5 },
        { year: 3, totalReturn: 86000, irr: 12.9 },
        { year: 4, totalReturn: 119000, irr: 13.2 },
        { year: 5, totalReturn: 154000, irr: 13.5 }
      ]
    }
  },
  {
    id: 'pipeline-014',
    propertyDetails: {
      address: '18 Bundarra Road, Bellevue Hill',
      currentValue: 5200000,
      latitude: -33.8816,
      longitude: 151.2543,
      medianPriceByType: 4900000,
      riskAdjustment: 8,
      forecastedGrowthRate: 7.8
    },
    loanRequest: {
      amount: 1100000,
      existingMortgage: 1600000,
      ltv: 21.15,
      purpose: 'Investment'
    },
    borrowerDetails: {
      name: 'Andrew & Isabella Clark',
      income: 580000,
      occupation: 'Finance Executives'
    },
    underwriteScore: 76,
    applicationDate: '2024-03-14',
    expectedFundingDate: '2024-03-28',
    returns: {
      forecastedIrr: 19.0,
      yearlyProjections: [
        { year: 1, totalReturn: 209000, irr: 19.0 },
        { year: 2, totalReturn: 434000, irr: 19.6 },
        { year: 3, totalReturn: 677000, irr: 20.2 },
        { year: 4, totalReturn: 938000, irr: 20.7 },
        { year: 5, totalReturn: 1217000, irr: 21.1 }
      ]
    }
  },
  {
    id: 'pipeline-015',
    propertyDetails: {
      address: '92 Homebush Road, Strathfield',
      currentValue: 2400000,
      latitude: -33.8791,
      longitude: 151.0824,
      medianPriceByType: 2300000,
      riskAdjustment: 16,
      forecastedGrowthRate: 4.8
    },
    loanRequest: {
      amount: 520000,
      existingMortgage: 850000,
      ltv: 21.67,
      purpose: 'Renovation'
    },
    borrowerDetails: {
      name: 'Kevin & Linda Zhang',
      income: 260000,
      occupation: 'Business Owners'
    },
    underwriteScore: 65,
    applicationDate: '2024-03-15',
    expectedFundingDate: '2024-03-29',
    returns: {
      forecastedIrr: 13.8,
      yearlyProjections: [
        { year: 1, totalReturn: 71760, irr: 13.8 },
        { year: 2, totalReturn: 149000, irr: 14.3 },
        { year: 3, totalReturn: 232000, irr: 14.8 },
        { year: 4, totalReturn: 321000, irr: 15.2 },
        { year: 5, totalReturn: 416000, irr: 15.6 }
      ]
    }
  },
  {
    id: 'pipeline-016',
    propertyDetails: {
      address: '5 Waruda Street, Kirribilli',
      currentValue: 4100000,
      latitude: -33.8485,
      longitude: 151.2179,
      medianPriceByType: 3900000,
      riskAdjustment: 10,
      forecastedGrowthRate: 7.0
    },
    loanRequest: {
      amount: 880000,
      existingMortgage: 1300000,
      ltv: 21.46,
      purpose: 'Investment'
    },
    borrowerDetails: {
      name: 'Christopher & Olivia Martin',
      income: 420000,
      occupation: 'Corporate Executives'
    },
    underwriteScore: 73,
    applicationDate: '2024-03-16',
    expectedFundingDate: '2024-03-30',
    returns: {
      forecastedIrr: 17.2,
      yearlyProjections: [
        { year: 1, totalReturn: 151360, irr: 17.2 },
        { year: 2, totalReturn: 315000, irr: 17.8 },
        { year: 3, totalReturn: 491000, irr: 18.4 },
        { year: 4, totalReturn: 680000, irr: 18.9 },
        { year: 5, totalReturn: 882000, irr: 19.3 }
      ]
    }
  },
  {
    id: 'pipeline-017',
    propertyDetails: {
      address: '67 Fairlight Street, Fairlight',
      currentValue: 2900000,
      latitude: -33.7969,
      longitude: 151.2887,
      medianPriceByType: 2800000,
      riskAdjustment: 13,
      forecastedGrowthRate: 5.9
    },
    loanRequest: {
      amount: 620000,
      existingMortgage: 950000,
      ltv: 21.38,
      purpose: 'Renovation'
    },
    borrowerDetails: {
      name: 'Matthew & Grace Taylor',
      income: 290000,
      occupation: 'IT Professionals'
    },
    underwriteScore: 74,
    applicationDate: '2024-03-17',
    expectedFundingDate: '2024-03-31',
    returns: {
      forecastedIrr: 15.4,
      yearlyProjections: [
        { year: 1, totalReturn: 95480, irr: 15.4 },
        { year: 2, totalReturn: 198000, irr: 15.9 },
        { year: 3, totalReturn: 309000, irr: 16.4 },
        { year: 4, totalReturn: 428000, irr: 16.8 },
        { year: 5, totalReturn: 555000, irr: 17.2 }
      ]
    }
  },
  {
    id: 'pipeline-018',
    propertyDetails: {
      address: '123 Burwood Road, Burwood',
      currentValue: 1650000,
      latitude: -33.8791,
      longitude: 151.0824,
      medianPriceByType: 1600000,
      riskAdjustment: 17,
      forecastedGrowthRate: 4.5
    },
    loanRequest: {
      amount: 360000,
      existingMortgage: 600000,
      ltv: 21.82,
      purpose: 'Home Improvement'
    },
    borrowerDetails: {
      name: 'Paul & Jenny Kim',
      income: 180000,
      occupation: 'Small Business Owners'
    },
    underwriteScore: 58,
    applicationDate: '2024-03-18',
    expectedFundingDate: '2024-04-01',
    returns: {
      forecastedIrr: 12.8,
      yearlyProjections: [
        { year: 1, totalReturn: 46080, irr: 12.8 },
        { year: 2, totalReturn: 96000, irr: 13.3 },
        { year: 3, totalReturn: 150000, irr: 13.8 },
        { year: 4, totalReturn: 208000, irr: 14.2 },
        { year: 5, totalReturn: 270000, irr: 14.6 }
      ]
    }
  },
  {
    id: 'pipeline-019',
    propertyDetails: {
      address: '31 Wolseley Road, Point Piper',
      currentValue: 7200000,
      latitude: -33.8636,
      longitude: 151.2571,
      medianPriceByType: 6800000,
      riskAdjustment: 7,
      forecastedGrowthRate: 8.3
    },
    loanRequest: {
      amount: 1600000,
      existingMortgage: 0,
      ltv: 22.22,
      purpose: 'Investment'
    },
    borrowerDetails: {
      name: 'Jonathan & Catherine Ross',
      income: 820000,
      occupation: 'Investment Bankers'
    },
    underwriteScore: 71,
    applicationDate: '2024-03-19',
    expectedFundingDate: '2024-04-02',
    returns: {
      forecastedIrr: 19.6,
      yearlyProjections: [
        { year: 1, totalReturn: 313600, irr: 19.6 },
        { year: 2, totalReturn: 652000, irr: 20.2 },
        { year: 3, totalReturn: 1017000, irr: 20.8 },
        { year: 4, totalReturn: 1408000, irr: 21.3 },
        { year: 5, totalReturn: 1826000, irr: 21.7 }
      ]
    }
  },
  {
    id: 'pipeline-020',
    propertyDetails: {
      address: '88 Penshurst Street, Willoughby',
      currentValue: 2600000,
      latitude: -33.8021,
      longitude: 151.1957,
      medianPriceByType: 2500000,
      riskAdjustment: 14,
      forecastedGrowthRate: 5.6
    },
    loanRequest: {
      amount: 560000,
      existingMortgage: 900000,
      ltv: 21.54,
      purpose: 'Renovation'
    },
    borrowerDetails: {
      name: 'Benjamin & Rachel Wong',
      income: 270000,
      occupation: 'Healthcare Professionals'
    },
    underwriteScore: 71,
    applicationDate: '2024-03-20',
    expectedFundingDate: '2024-04-03',
    returns: {
      forecastedIrr: 14.6,
      yearlyProjections: [
        { year: 1, totalReturn: 81760, irr: 14.6 },
        { year: 2, totalReturn: 170000, irr: 15.1 },
        { year: 3, totalReturn: 265000, irr: 15.6 },
        { year: 4, totalReturn: 367000, irr: 16.0 },
        { year: 5, totalReturn: 476000, irr: 16.4 }
      ]
    }
  },
  {
    id: 'pipeline-021',
    propertyDetails: {
      address: '156 Canterbury Road, Canterbury',
      currentValue: 1100000,
      latitude: -33.9147,
      longitude: 151.1036,
      medianPriceByType: 1050000,
      riskAdjustment: 19,
      forecastedGrowthRate: 3.9
    },
    loanRequest: {
      amount: 250000,
      existingMortgage: 450000,
      ltv: 22.73,
      purpose: 'Debt Consolidation'
    },
    borrowerDetails: {
      name: 'Steven & Maria Rodriguez',
      income: 145000,
      occupation: 'Retail Workers'
    },
    underwriteScore: 47,
    applicationDate: '2024-03-21',
    expectedFundingDate: '2024-04-04',
    returns: {
      forecastedIrr: 11.8,
      yearlyProjections: [
        { year: 1, totalReturn: 29500, irr: 11.8 },
        { year: 2, totalReturn: 61000, irr: 12.2 },
        { year: 3, totalReturn: 95000, irr: 12.6 },
        { year: 4, totalReturn: 131000, irr: 12.9 },
        { year: 5, totalReturn: 169000, irr: 13.2 }
      ]
    }
  },
  {
    id: 'pipeline-022',
    propertyDetails: {
      address: '12 Seaview Street, Clovelly',
      currentValue: 3600000,
      latitude: -33.9132,
      longitude: 151.2685,
      medianPriceByType: 3400000,
      riskAdjustment: 11,
      forecastedGrowthRate: 6.9
    },
    loanRequest: {
      amount: 780000,
      existingMortgage: 1100000,
      ltv: 21.67,
      purpose: 'Investment'
    },
    borrowerDetails: {
      name: 'Marcus & Sophie Bennett',
      income: 360000,
      occupation: 'Legal Professionals'
    },
    underwriteScore: 74,
    applicationDate: '2024-03-22',
    expectedFundingDate: '2024-04-05',
    returns: {
      forecastedIrr: 17.8,
      yearlyProjections: [
        { year: 1, totalReturn: 138840, irr: 17.8 },
        { year: 2, totalReturn: 289000, irr: 18.4 },
        { year: 3, totalReturn: 451000, irr: 19.0 },
        { year: 4, totalReturn: 625000, irr: 19.5 },
        { year: 5, totalReturn: 811000, irr: 19.9 }
      ]
    }
  },
  {
    id: 'pipeline-023',
    propertyDetails: {
      address: '234 Victoria Road, Gladesville',
      currentValue: 1850000,
      latitude: -33.8347,
      longitude: 151.1319,
      medianPriceByType: 1800000,
      riskAdjustment: 16,
      forecastedGrowthRate: 4.7
    },
    loanRequest: {
      amount: 400000,
      existingMortgage: 650000,
      ltv: 21.62,
      purpose: 'Home Improvement'
    },
    borrowerDetails: {
      name: 'Adrian & Lucy Chen',
      income: 195000,
      occupation: 'Teachers'
    },
    underwriteScore: 55,
    applicationDate: '2024-03-23',
    expectedFundingDate: '2024-04-06',
    returns: {
      forecastedIrr: 12.5,
      yearlyProjections: [
        { year: 1, totalReturn: 50000, irr: 12.5 },
        { year: 2, totalReturn: 104000, irr: 13.0 },
        { year: 3, totalReturn: 162000, irr: 13.5 },
        { year: 4, totalReturn: 224000, irr: 13.9 },
        { year: 5, totalReturn: 290000, irr: 14.3 }
      ]
    }
  },
  {
    id: 'pipeline-024',
    propertyDetails: {
      address: '45 Addison Road, Manly',
      currentValue: 4400000,
      latitude: -33.7969,
      longitude: 151.2887,
      medianPriceByType: 4200000,
      riskAdjustment: 9,
      forecastedGrowthRate: 7.4
    },
    loanRequest: {
      amount: 950000,
      existingMortgage: 1400000,
      ltv: 21.59,
      purpose: 'Investment'
    },
    borrowerDetails: {
      name: 'Nicholas & Emma Stewart',
      income: 480000,
      occupation: 'Finance Executives'
    },
    underwriteScore: 79,
    applicationDate: '2024-03-24',
    expectedFundingDate: '2024-04-07',
    returns: {
      forecastedIrr: 18.6,
      yearlyProjections: [
        { year: 1, totalReturn: 176700, irr: 18.6 },
        { year: 2, totalReturn: 368000, irr: 19.2 },
        { year: 3, totalReturn: 574000, irr: 19.8 },
        { year: 4, totalReturn: 795000, irr: 20.3 },
        { year: 5, totalReturn: 1031000, irr: 20.7 }
      ]
    }
  },
  {
    id: 'pipeline-025',
    propertyDetails: {
      address: '78 Parramatta Road, Five Dock',
      currentValue: 1450000,
      latitude: -33.8642,
      longitude: 151.1259,
      medianPriceByType: 1400000,
      riskAdjustment: 17,
      forecastedGrowthRate: 4.4
    },
    loanRequest: {
      amount: 320000,
      existingMortgage: 520000,
      ltv: 22.07,
      purpose: 'Renovation'
    },
    borrowerDetails: {
      name: 'Tony & Helen Nguyen',
      income: 165000,
      occupation: 'Small Business Owners'
    },
    underwriteScore: 51,
    applicationDate: '2024-03-25',
    expectedFundingDate: '2024-04-08',
    returns: {
      forecastedIrr: 12.2,
      yearlyProjections: [
        { year: 1, totalReturn: 39040, irr: 12.2 },
        { year: 2, totalReturn: 81000, irr: 12.7 },
        { year: 3, totalReturn: 126000, irr: 13.2 },
        { year: 4, totalReturn: 174000, irr: 13.6 },
        { year: 5, totalReturn: 225000, irr: 14.0 }
      ]
    }
  },
  {
    id: 'pipeline-026',
    propertyDetails: {
      address: '9 Darling Point Road, Darling Point',
      currentValue: 6500000,
      latitude: -33.8689,
      longitude: 151.2344,
      medianPriceByType: 6200000,
      riskAdjustment: 8,
      forecastedGrowthRate: 8.0
    },
    loanRequest: {
      amount: 1400000,
      existingMortgage: 0,
      ltv: 21.54,
      purpose: 'Investment'
    },
    borrowerDetails: {
      name: 'Alexander & Victoria Palmer',
      income: 720000,
      occupation: 'Investment Bankers'
    },
    underwriteScore: 70,
    applicationDate: '2024-03-26',
    expectedFundingDate: '2024-04-09',
    returns: {
      forecastedIrr: 19.4,
      yearlyProjections: [
        { year: 1, totalReturn: 271600, irr: 19.4 },
        { year: 2, totalReturn: 565000, irr: 20.0 },
        { year: 3, totalReturn: 881000, irr: 20.6 },
        { year: 4, totalReturn: 1220000, irr: 21.1 },
        { year: 5, totalReturn: 1582000, irr: 21.5 }
      ]
    }
  },
  {
    id: 'pipeline-027',
    propertyDetails: {
      address: '112 Ramsay Street, Haberfield',
      currentValue: 2750000,
      latitude: -33.8847,
      longitude: 151.1419,
      medianPriceByType: 2650000,
      riskAdjustment: 15,
      forecastedGrowthRate: 5.1
    },
    loanRequest: {
      amount: 600000,
      existingMortgage: 950000,
      ltv: 21.82,
      purpose: 'Renovation'
    },
    borrowerDetails: {
      name: 'George & Maria Papadopoulos',
      income: 285000,
      occupation: 'Business Owners'
    },
    underwriteScore: 63,
    applicationDate: '2024-03-27',
    expectedFundingDate: '2024-04-10',
    returns: {
      forecastedIrr: 13.6,
      yearlyProjections: [
        { year: 1, totalReturn: 81600, irr: 13.6 },
        { year: 2, totalReturn: 170000, irr: 14.1 },
        { year: 3, totalReturn: 265000, irr: 14.6 },
        { year: 4, totalReturn: 367000, irr: 15.0 },
        { year: 5, totalReturn: 476000, irr: 15.4 }
      ]
    }
  },
  {
    id: 'pipeline-028',
    propertyDetails: {
      address: '55 Boundary Street, Roseville',
      currentValue: 3100000,
      latitude: -33.7841,
      longitude: 151.1757,
      medianPriceByType: 2950000,
      riskAdjustment: 12,
      forecastedGrowthRate: 6.2
    },
    loanRequest: {
      amount: 680000,
      existingMortgage: 1000000,
      ltv: 21.94,
      purpose: 'Investment'
    },
    borrowerDetails: {
      name: 'Philip & Sarah Mitchell',
      income: 310000,
      occupation: 'IT Executives'
    },
    underwriteScore: 77,
    applicationDate: '2024-03-28',
    expectedFundingDate: '2024-04-11',
    returns: {
      forecastedIrr: 15.8,
      yearlyProjections: [
        { year: 1, totalReturn: 107440, irr: 15.8 },
        { year: 2, totalReturn: 224000, irr: 16.4 },
        { year: 3, totalReturn: 349000, irr: 17.0 },
        { year: 4, totalReturn: 483000, irr: 17.5 },
        { year: 5, totalReturn: 626000, irr: 17.9 }
      ]
    }
  },
  {
    id: 'pipeline-029',
    propertyDetails: {
      address: '187 Liverpool Road, Ashfield',
      currentValue: 1350000,
      latitude: -33.8893,
      longitude: 151.1244,
      medianPriceByType: 1300000,
      riskAdjustment: 18,
      forecastedGrowthRate: 4.2
    },
    loanRequest: {
      amount: 300000,
      existingMortgage: 480000,
      ltv: 22.22,
      purpose: 'Home Improvement'
    },
    borrowerDetails: {
      name: 'David & Jenny Liu',
      income: 155000,
      occupation: 'Healthcare Workers'
    },
    underwriteScore: 49,
    applicationDate: '2024-03-29',
    expectedFundingDate: '2024-04-12',
    returns: {
      forecastedIrr: 11.9,
      yearlyProjections: [
        { year: 1, totalReturn: 35700, irr: 11.9 },
        { year: 2, totalReturn: 74000, irr: 12.4 },
        { year: 3, totalReturn: 115000, irr: 12.9 },
        { year: 4, totalReturn: 159000, irr: 13.3 },
        { year: 5, totalReturn: 206000, irr: 13.7 }
      ]
    }
  },
  {
    id: 'pipeline-030',
    propertyDetails: {
      address: '23 Shellcove Road, Neutral Bay',
      currentValue: 3900000,
      latitude: -33.8382,
      longitude: 151.2175,
      medianPriceByType: 3700000,
      riskAdjustment: 10,
      forecastedGrowthRate: 7.1
    },
    loanRequest: {
      amount: 850000,
      existingMortgage: 1200000,
      ltv: 21.79,
      purpose: 'Investment'
    },
    borrowerDetails: {
      name: 'Richard & Elizabeth Morgan',
      income: 440000,
      occupation: 'Corporate Executives'
    },
    underwriteScore: 85,
    applicationDate: '2024-03-30',
    expectedFundingDate: '2024-04-13',
    returns: {
      forecastedIrr: 17.4,
      yearlyProjections: [
        { year: 1, totalReturn: 147900, irr: 17.4 },
        { year: 2, totalReturn: 308000, irr: 18.0 },
        { year: 3, totalReturn: 481000, irr: 18.6 },
        { year: 4, totalReturn: 667000, irr: 19.1 },
        { year: 5, totalReturn: 866000, irr: 19.5 }
      ]
    }
  }
];
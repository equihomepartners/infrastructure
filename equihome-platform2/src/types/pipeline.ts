export interface PipelineDeal {
  id: string;
  propertyDetails: {
    address: string;
    suburb: string;
    currentValue: number;
    type: 'house';
    bedrooms: number;
    bathrooms: number;
    landSize: number;
    yearBuilt: number;
  };
  loanRequest: {
    amount: number;
    ltv: number;
    existingMortgage: number;
    purpose: string;
  };
  borrower: {
    name: string;
    income: number;
    occupation: string;
    creditScore: number;
  };
  marketAnalysis: {
    medianPriceByType: number;
    yearlyGrowth: number;
    forecastedGrowth: number;
    riskAdjustment: number;
    trafficLight: 'Green' | 'Orange' | 'Red';
  };
  riskAssessment: {
    overallScore: number;
    factors: {
      category: string;
      score: number;
      weight: number;
    }[];
  };
  dates: {
    applicationDate: string;
    expectedFundingDate: string;
  };
  returnsProjection: {
    yearlyBreakdown: {
      year: number;
      propertyValue: number;
      accruedInterest: number;
      appreciationShare: number;
      totalReturn: number;
      irr: number;
    }[];
  };
  status: 'pending' | 'approved' | 'rejected';
}
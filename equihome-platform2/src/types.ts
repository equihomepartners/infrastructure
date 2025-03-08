// ... existing types ...

export interface PipelineDeal {
  id: string;
  propertyDetails: {
    address: string;
    currentValue: number;
    latitude: number;
    longitude: number;
    medianPriceByType: number;
    riskAdjustment: number;
    forecastedGrowthRate: number;
  };
  loanRequest: {
    amount: number;
    existingMortgage: number;
    ltv: number;
    purpose: string;
  };
  borrowerDetails: {
    name: string;
    income: number;
    occupation: string;
  };
  underwriteScore: number;
  applicationDate: string;
  expectedFundingDate: string;
  returns: {
    forecastedIrr: number;
    yearlyProjections: Array<{
      year: number;
      totalReturn: number;
      irr: number;
    }>;
  };
}

export interface FormData {
  propertyAddress: string;
  propertyValue: number;
  loanAmount: number;
}

export interface LoanDecision {
  approved: boolean;
  loanAmount: number;
  interestRate: number;
  ltv: number;
  suburb: string;
  trafficLight: string;
  riskLevel: string;
  explanation: string;
  returns?: {
    optimalExit?: {
      year: number;
    };
    yearlyBreakdown?: Array<{
      irr: number;
      year: number;
    }>;
  };
  score?: number;
  maxLoanAmount?: number;
  recommendedTerms?: {
    rate: number;
    term: number;
  };
  riskFactors?: string[];
  analyticsData?: {
    propertyGrowth: number;
    marketCondition: string;
    comparableSales: number[];
  };
}

export interface AnalyticsEvent {
  type: string;
  data: any;
}
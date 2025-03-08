export interface PipelineDeal {
  id: string;
  address: string;
  suburb: string;
  propertyValue: number;
  loanAmount: number;
  ltv: number;
  projectedIRR: number;
  score: number;
  riskAssessment: {
    overallScore: number;
    propertyScore: number;
    locationScore: number;
    borrowerScore: number;
    marketScore: number;
  };
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
  borrower: {
    name: string;
    income: number;
    creditScore: number;
  };
  property: {
    type: string;
    bedrooms: number;
    bathrooms: number;
    landSize: number;
    yearBuilt: number;
  };
  market: {
    medianPrice: number;
    yearlyGrowth: number;
    daysOnMarket: number;
    rentalYield: number;
  };
}
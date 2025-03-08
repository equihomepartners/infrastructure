export interface Deal {
  id: string;
  suburb: string;
  propertyValue: number;
  loanAmount: number;
  ltv: number;
  location: {
    latitude: number;
    longitude: number;
  };
  loanTerms: {
    startDate: string;
    endDate: string;
    interestRate: number;
  };
  propertyDetails: {
    address: string;
    yearlyGrowth: number;
  };
} 
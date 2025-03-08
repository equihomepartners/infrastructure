export type MarketCondition = 'green' | 'yellow' | 'red';

export interface PropertyDetails {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: 'single-family' | 'multi-family' | 'condo' | 'townhouse';
  units: number;
  squareFeet: number;
  yearBuilt: number;
  purchasePrice: number;
  estimatedValue: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface FinancialDetails {
  loanAmount: number;
  loanToValue: number;
  debtServiceCoverageRatio: number;
  monthlyRent: number;
  monthlyExpenses: number;
  netOperatingIncome: number;
  capRate: number;
  cashOnCash: number;
  internalRateOfReturn: number;
}

export interface BorrowerDetails {
  firstName: string;
  lastName: string;
  creditScore: number;
  monthlyIncome: number;
  monthlyDebt: number;
  debtToIncomeRatio: number;
  liquidAssets: number;
  bankruptcies: number;
  foreclosures: number;
  employmentDetails: {
    employer: string;
    position: string;
    yearsEmployed: number;
    monthlyIncome: number;
  };
}

export interface MarketAnalysis {
  condition: MarketCondition;
  rentGrowth: number;
  vacancyRate: number;
  employmentGrowth: number;
  populationGrowth: number;
  medianHomePrice: number;
  medianRent: number;
  supplyGrowth: number;
  demandGrowth: number;
  riskScore: number;
}

export interface UnderwritingApplication {
  id?: string;
  status: 'pending' | 'in-review' | 'approved' | 'rejected';
  submissionDate: string;
  property: PropertyDetails;
  financial: FinancialDetails;
  borrower: BorrowerDetails;
  market: MarketAnalysis;
  documents: Array<{
    id: string;
    type: string;
    name: string;
    url: string;
    uploadDate: string;
  }>;
  notes: Array<{
    id: string;
    text: string;
    author: string;
    date: string;
  }>;
}

export interface UnderwritingDashboardStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  averageProcessingTime: number;
  approvalRate: number;
  portfolioMetrics: {
    totalValue: number;
    averageLoanSize: number;
    averageDSCR: number;
    averageLTV: number;
  };
}

export interface UnderwritingCriteria {
  minimumCreditScore: number;
  maximumLoanToValue: number;
  minimumDebtServiceCoverageRatio: number;
  maximumDebtToIncomeRatio: number;
  minimumLiquidity: number;
  propertyAgeLimit: number;
  marketConditionAdjustments: {
    green: number;
    yellow: number;
    red: number;
  };
  minimumCapRate: number;
  maximumVacancyRate: number;
  minimumRentGrowth: number;
  maximumRiskScore: number;
}

export type ApplicationStatus = 'pending' | 'in-review' | 'approved' | 'rejected'; 
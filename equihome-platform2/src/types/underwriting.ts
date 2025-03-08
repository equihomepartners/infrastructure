export interface FormData {
  propertyValue: number;
  location: string;
  propertyType: string;
}

export interface LoanDecision {
  approved: boolean;
  terms?: {
    amount: number;
    rate: number;
    term: number;
  };
  reason?: string;
}

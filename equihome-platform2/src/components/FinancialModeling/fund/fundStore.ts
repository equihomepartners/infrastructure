import { create } from 'zustand';

interface LTVRange {
  min: number;
  max: number;
  target: number;
  average: number;
}

interface PropertyRange {
  min: number;
  max: number;
  target: number;
  average: number;
}

interface GrowthAssumptions {
  propertyAppreciation: number;
  rentGrowth: number;
  marketVolatility: number;
  exitTimeframe: number;
}

interface FundManagerFees {
  managementFee: number;
  performanceFee: number;
  hurdleRate: number;
  catchUpRate: number;
}

interface CapitalStructure {
  preferredReturn: number;  // The minimum return LPs must receive before GP gets paid (e.g., 8%)
  catchUp: number;         // The % of profits GPs receive until they catch up to their target split
  lpSplit: number;         // The % of profits LPs receive after preferred return and catch-up
  reinvestmentRate: number; // The % of proceeds that get reinvested
}

interface DeploymentSchedule {
  annualTargets: number[];
  reserveRequirement: number;
  minimumDeployment: number;
  maximumDeployment: number;
  averageDealSize: number;
}

interface MarketConditions {
  interestRates: number[];
  propertyValueIndex: number[];
  employmentTrends: number[];
  marketCycle: 'expansion' | 'peak' | 'contraction' | 'trough';
  volatilityIndex: number;
}

interface RiskMetrics {
  concentrationRisk: number;
  marketRisk: number;
  leverageRisk: number;
  executionRisk: number;
  volatilityScore: number;
}

interface FundPerformance {
  tenYearIRR: number;
  fundManagerReturns: number;
  lpReturns: number;
  totalAUM: number;
  realizedReturns: number;
  unrealizedReturns: number;
}

export interface FundModelInputs {
  fundSize: number;
  investmentPeriod: number;
  fundTerm: number;
  ltvRange: LTVRange;
  propertyRange: PropertyRange;
  growthAssumptions: GrowthAssumptions;
  fundManagerFees: FundManagerFees;
  capitalStructure: CapitalStructure;
  deploymentSchedule: DeploymentSchedule;
  marketConditions: MarketConditions;
  riskMetrics: RiskMetrics;
  fundPerformance: FundPerformance;
  exitedDeals: number;
  reinvestedCapital: number;
  lpDistributions: number;
  gpDistributions: number;
  remainingDeals: number;
  cumulativeDeployment: number;
  reserveBalance: number;
}

interface FundStore {
  inputs: FundModelInputs;
  updateInput: (key: keyof FundModelInputs, value: any) => void;
  updateCapitalStructure: (updates: Partial<CapitalStructure>) => void;
  updateDeploymentSchedule: (updates: Partial<DeploymentSchedule>) => void;
  updateMarketConditions: (updates: Partial<MarketConditions>) => void;
  updateFundManagerFees: (updates: Partial<FundManagerFees>) => void;
  updateRiskMetrics: (updates: Partial<RiskMetrics>) => void;
  updateFundPerformance: (updates: Partial<FundPerformance>) => void;
}

const initialState: FundModelInputs = {
  fundSize: 100000000,
  investmentPeriod: 3,
  fundTerm: 7,
  ltvRange: {
    min: 0.6,
    max: 0.8,
    target: 0.7,
    average: 0.7
  },
  propertyRange: {
    min: 500000,
    max: 5000000,
    target: 2000000,
    average: 2000000
  },
  growthAssumptions: {
    propertyAppreciation: 0.03,
    rentGrowth: 0.02,
    marketVolatility: 0.15,
    exitTimeframe: 5
  },
  fundManagerFees: {
    managementFee: 0.02,
    performanceFee: 0.20,
    hurdleRate: 0.08,
    catchUpRate: 0.50
  },
  capitalStructure: {
    preferredReturn: 0.08,
    catchUp: 0.5,
    lpSplit: 0.8,
    reinvestmentRate: 0.5
  },
  deploymentSchedule: {
    annualTargets: [0.3, 0.4, 0.3],
    reserveRequirement: 0.1,
    minimumDeployment: 0.2,
    maximumDeployment: 0.4,
    averageDealSize: 2000000
  },
  marketConditions: {
    interestRates: [0.05, 0.05, 0.05, 0.05, 0.05],
    propertyValueIndex: [100, 103, 106, 109, 112],
    employmentTrends: [0.02, 0.02, 0.02, 0.02, 0.02],
    marketCycle: 'expansion',
    volatilityIndex: 0.12
  },
  riskMetrics: {
    concentrationRisk: 0.3,
    marketRisk: 0.4,
    leverageRisk: 0.5,
    executionRisk: 0.3,
    volatilityScore: 0.35
  },
  fundPerformance: {
    tenYearIRR: 0.15,
    fundManagerReturns: 0.25,
    lpReturns: 0.12,
    totalAUM: 100000000,
    realizedReturns: 0,
    unrealizedReturns: 0
  },
  exitedDeals: 0,
  reinvestedCapital: 0,
  lpDistributions: 0,
  gpDistributions: 0,
  remainingDeals: 0,
  cumulativeDeployment: 0,
  reserveBalance: 0
};

export const useFundStore = create<FundStore>((set) => ({
  inputs: initialState,
  updateInput: (key, value) => 
    set((state) => ({
      inputs: { ...state.inputs, [key]: value }
    })),
  updateCapitalStructure: (updates) =>
    set((state) => ({
      inputs: {
        ...state.inputs,
        capitalStructure: { ...state.inputs.capitalStructure, ...updates }
      }
    })),
  updateDeploymentSchedule: (updates) =>
    set((state) => ({
      inputs: {
        ...state.inputs,
        deploymentSchedule: { ...state.inputs.deploymentSchedule, ...updates }
      }
    })),
  updateMarketConditions: (updates) =>
    set((state) => ({
      inputs: {
        ...state.inputs,
        marketConditions: { ...state.inputs.marketConditions, ...updates }
      }
    })),
  updateFundManagerFees: (updates) =>
    set((state) => ({
      inputs: {
        ...state.inputs,
        fundManagerFees: { ...state.inputs.fundManagerFees, ...updates }
      }
    })),
  updateRiskMetrics: (updates) =>
    set((state) => ({
      inputs: {
        ...state.inputs,
        riskMetrics: { ...state.inputs.riskMetrics, ...updates }
      }
    })),
  updateFundPerformance: (updates) =>
    set((state) => ({
      inputs: {
        ...state.inputs,
        fundPerformance: { ...state.inputs.fundPerformance, ...updates }
      }
    }))
}));
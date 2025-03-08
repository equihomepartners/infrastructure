import { create } from 'zustand';

interface FundParameters {
  interestRate: number;
  maxLoanSize: number;
  maxLTV: number;
  maxCombinedLTV: number;
  targetIRR: number;
  minPropertyValue: number;
  maxPropertyValue: number;
  maxSuburbExposure: number;
  weeklyApprovalTarget: number;
  remainingAllocation: number;
  zoneAllocation: {
    green: number;
    orange: number;
    red: number;
  };
  setParameter: (key: keyof Omit<FundParameters, 'setParameter' | 'zoneAllocation'>, value: number) => void;
  setZoneAllocation: (zone: keyof FundParameters['zoneAllocation'], value: number) => void;
}

export const useFundParameters = create<FundParameters>((set) => ({
  interestRate: 5,
  maxLoanSize: 1000000,
  maxLTV: 75,
  maxCombinedLTV: 85,
  targetIRR: 10,
  minPropertyValue: 1000000,
  maxPropertyValue: 5000000,
  maxSuburbExposure: 25,
  weeklyApprovalTarget: 3,
  remainingAllocation: 10000000,
  zoneAllocation: {
    green: 90,
    orange: 10,
    red: 0
  },
  setParameter: (key, value) => set((state) => ({ ...state, [key]: value })),
  setZoneAllocation: (zone, value) => set((state) => ({
    ...state,
    zoneAllocation: {
      ...state.zoneAllocation,
      [zone]: value
    }
  }))
}));
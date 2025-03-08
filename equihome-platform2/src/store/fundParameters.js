import { create } from 'zustand';
export const useFundParameters = create((set) => ({
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

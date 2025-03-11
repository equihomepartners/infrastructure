import { create } from 'zustand';

const useFundParameters = create((set) => ({
  fundInfo: {
    name: 'Equihome Growth Fund I',
    status: 'active',
    startDate: new Date('2024-01-01'),
    loanMetrics: {
      totalLoans: 8,
      activeLoans: 8,
      completedLoans: 0,
      defaultedLoans: 0
    }
  },
  riskThresholds: {
    greenZoneLVR: 65,
    orangeZoneLVR: 75,
    redZoneLVR: 80,
    maxSuburbConcentration: 25,
    maxPostcodeExposure: 35
  },
  updateFundInfo: (info) => set((state) => ({ fundInfo: { ...state.fundInfo, ...info } })),
  updateRiskThresholds: (thresholds) => set((state) => ({ riskThresholds: { ...state.riskThresholds, ...thresholds } }))
}));

export { useFundParameters };

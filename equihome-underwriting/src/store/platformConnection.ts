import { create } from 'zustand';

interface PlatformConnectionState {
  platformConfig: {
    apiUrl: string;
    underwritingParameters: any;
    cioSettings: any;
  };
  setPlatformConfig: (config: any) => void;
  isConnected: boolean;
  setIsConnected: (status: boolean) => void;
}

export const usePlatformConnection = create<PlatformConnectionState>((set) => ({
  platformConfig: {
    apiUrl: 'http://localhost:3000', // Platform's actual running port
    underwritingParameters: null,
    cioSettings: null,
  },
  setPlatformConfig: (config) => set((state) => ({
    platformConfig: { ...state.platformConfig, ...config }
  })),
  isConnected: false,
  setIsConnected: (status) => set({ isConnected: status }),
})); 
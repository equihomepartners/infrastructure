import create from 'zustand';
import { getMLPrediction, MLPrediction } from '../services/mlZoning';

interface ZoningStore {
  selectedSuburb: string | null;
  prediction: MLPrediction | null;
  isLoading: boolean;
  setSelectedSuburb: (suburb: string) => void;
  clearSelection: () => void;
}

export const useZoningStore = create<ZoningStore>((set) => ({
  selectedSuburb: null,
  prediction: null,
  isLoading: false,
  setSelectedSuburb: (suburb) => {
    set({ isLoading: true, selectedSuburb: suburb });
    setTimeout(() => {
      set({ 
        prediction: getMLPrediction(suburb),
        isLoading: false 
      });
    }, 500);
  },
  clearSelection: () => set({ 
    selectedSuburb: null, 
    prediction: null 
  }),
})); 
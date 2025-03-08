import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
  UnderwritingApplication,
  UnderwritingDashboardStats,
  UnderwritingCriteria,
  MarketAnalysis
} from '../types/underwriting';
import { underwritingService } from '../api/underwritingService';

interface UnderwritingStore {
  // Application State
  applications: UnderwritingApplication[];
  currentApplication: UnderwritingApplication | null;
  totalApplications: number;
  loading: boolean;
  error: string | null;

  // Dashboard Stats
  dashboardStats: UnderwritingDashboardStats | null;
  
  // Underwriting Criteria
  criteria: UnderwritingCriteria | null;

  // Filters
  filters: {
    status?: UnderwritingApplication['status'];
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };

  // Actions
  setFilters: (filters: Partial<UnderwritingStore['filters']>) => void;
  fetchApplications: () => Promise<void>;
  fetchApplication: (id: string) => Promise<void>;
  submitApplication: (application: Omit<UnderwritingApplication, 'id' | 'status' | 'submissionDate' | 'riskAssessment'>) => Promise<void>;
  updateApplication: (id: string, updates: Partial<UnderwritingApplication>) => Promise<void>;
  approveApplication: (id: string, notes?: string) => Promise<void>;
  rejectApplication: (id: string, reason: string) => Promise<void>;
  requestMoreInfo: (id: string, requests: string[]) => Promise<void>;
  uploadDocument: (applicationId: string, file: File, type: string) => Promise<void>;
  deleteDocument: (applicationId: string, documentId: string) => Promise<void>;
  addNote: (applicationId: string, note: { text: string }) => Promise<void>;
  deleteNote: (applicationId: string, noteId: string) => Promise<void>;
  fetchDashboardStats: () => Promise<void>;
  fetchUnderwritingCriteria: () => Promise<void>;
  updateUnderwritingCriteria: (criteria: Partial<UnderwritingCriteria>) => Promise<void>;
  getMarketAnalysis: (zipCode: string) => Promise<MarketAnalysis>;
  reset: () => void;
}

export const useUnderwritingStore = create<UnderwritingStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      applications: [],
      currentApplication: null,
      totalApplications: 0,
      loading: false,
      error: null,
      dashboardStats: null,
      criteria: null,
      filters: {
        page: 1,
        limit: 10,
        sortBy: 'submissionDate',
        sortOrder: 'desc',
      },

      // Actions
      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },

      fetchApplications: async () => {
        try {
          set({ loading: true, error: null });
          const { applications, total } = await underwritingService.getApplications(get().filters);
          set({ applications, totalApplications: total, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch applications', loading: false });
          console.error('Error fetching applications:', error);
        }
      },

      fetchApplication: async (id) => {
        try {
          set({ loading: true, error: null });
          const application = await underwritingService.getApplication(id);
          set({ currentApplication: application, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch application', loading: false });
          console.error('Error fetching application:', error);
        }
      },

      submitApplication: async (application) => {
        try {
          set({ loading: true, error: null });
          const newApplication = await underwritingService.submitApplication(application);
          set((state) => ({
            applications: [newApplication, ...state.applications],
            loading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to submit application', loading: false });
          console.error('Error submitting application:', error);
        }
      },

      updateApplication: async (id, updates) => {
        try {
          set({ loading: true, error: null });
          const updatedApplication = await underwritingService.updateApplication(id, updates);
          set((state) => ({
            applications: state.applications.map((app) =>
              app.id === id ? updatedApplication : app
            ),
            currentApplication: state.currentApplication?.id === id ? updatedApplication : state.currentApplication,
            loading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to update application', loading: false });
          console.error('Error updating application:', error);
        }
      },

      approveApplication: async (id, notes) => {
        try {
          set({ loading: true, error: null });
          const updatedApplication = await underwritingService.approveApplication(id, notes);
          set((state) => ({
            applications: state.applications.map((app) =>
              app.id === id ? updatedApplication : app
            ),
            currentApplication: state.currentApplication?.id === id ? updatedApplication : state.currentApplication,
            loading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to approve application', loading: false });
          console.error('Error approving application:', error);
        }
      },

      rejectApplication: async (id, reason) => {
        try {
          set({ loading: true, error: null });
          const updatedApplication = await underwritingService.rejectApplication(id, reason);
          set((state) => ({
            applications: state.applications.map((app) =>
              app.id === id ? updatedApplication : app
            ),
            currentApplication: state.currentApplication?.id === id ? updatedApplication : state.currentApplication,
            loading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to reject application', loading: false });
          console.error('Error rejecting application:', error);
        }
      },

      requestMoreInfo: async (id, requests) => {
        try {
          set({ loading: true, error: null });
          const updatedApplication = await underwritingService.requestMoreInfo(id, requests);
          set((state) => ({
            applications: state.applications.map((app) =>
              app.id === id ? updatedApplication : app
            ),
            currentApplication: state.currentApplication?.id === id ? updatedApplication : state.currentApplication,
            loading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to request more information', loading: false });
          console.error('Error requesting more information:', error);
        }
      },

      uploadDocument: async (applicationId, file, type) => {
        try {
          set({ loading: true, error: null });
          const document = await underwritingService.uploadDocument(applicationId, file, type);
          set((state) => ({
            currentApplication: state.currentApplication
              ? {
                  ...state.currentApplication,
                  documents: [...state.currentApplication.documents, document],
                }
              : null,
            loading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to upload document', loading: false });
          console.error('Error uploading document:', error);
        }
      },

      deleteDocument: async (applicationId, documentId) => {
        try {
          set({ loading: true, error: null });
          await underwritingService.deleteDocument(applicationId, documentId);
          set((state) => ({
            currentApplication: state.currentApplication
              ? {
                  ...state.currentApplication,
                  documents: state.currentApplication.documents.filter(
                    (doc) => doc.id !== documentId
                  ),
                }
              : null,
            loading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to delete document', loading: false });
          console.error('Error deleting document:', error);
        }
      },

      addNote: async (applicationId, note) => {
        try {
          set({ loading: true, error: null });
          const newNote = await underwritingService.addNote(applicationId, note);
          set((state) => ({
            currentApplication: state.currentApplication
              ? {
                  ...state.currentApplication,
                  notes: [...state.currentApplication.notes, newNote],
                }
              : null,
            loading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to add note', loading: false });
          console.error('Error adding note:', error);
        }
      },

      deleteNote: async (applicationId, noteId) => {
        try {
          set({ loading: true, error: null });
          await underwritingService.deleteNote(applicationId, noteId);
          set((state) => ({
            currentApplication: state.currentApplication
              ? {
                  ...state.currentApplication,
                  notes: state.currentApplication.notes.filter(
                    (note) => note.id !== noteId
                  ),
                }
              : null,
            loading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to delete note', loading: false });
          console.error('Error deleting note:', error);
        }
      },

      fetchDashboardStats: async () => {
        try {
          set({ loading: true, error: null });
          const stats = await underwritingService.getDashboardStats();
          set({ dashboardStats: stats, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch dashboard stats', loading: false });
          console.error('Error fetching dashboard stats:', error);
        }
      },

      fetchUnderwritingCriteria: async () => {
        try {
          set({ loading: true, error: null });
          const criteria = await underwritingService.getUnderwritingCriteria();
          set({ criteria, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch underwriting criteria', loading: false });
          console.error('Error fetching underwriting criteria:', error);
        }
      },

      updateUnderwritingCriteria: async (criteria) => {
        try {
          set({ loading: true, error: null });
          const updatedCriteria = await underwritingService.updateUnderwritingCriteria(criteria);
          set({ criteria: updatedCriteria, loading: false });
        } catch (error) {
          set({ error: 'Failed to update underwriting criteria', loading: false });
          console.error('Error updating underwriting criteria:', error);
        }
      },

      getMarketAnalysis: async (zipCode) => {
        try {
          set({ loading: true, error: null });
          const analysis = await underwritingService.getMarketAnalysis(zipCode);
          set({ loading: false });
          return analysis;
        } catch (error) {
          set({ error: 'Failed to get market analysis', loading: false });
          console.error('Error getting market analysis:', error);
          throw error;
        }
      },

      reset: () => {
        set({
          applications: [],
          currentApplication: null,
          totalApplications: 0,
          loading: false,
          error: null,
          dashboardStats: null,
          criteria: null,
          filters: {
            page: 1,
            limit: 10,
            sortBy: 'submissionDate',
            sortOrder: 'desc',
          },
        });
      },
    })
  )
); 
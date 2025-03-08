import axios from 'axios';
import type {
  UnderwritingApplication,
  UnderwritingDashboardStats,
  UnderwritingCriteria,
  MarketAnalysis
} from '../types/underwriting';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const underwritingService = {
  // Application Management
  async submitApplication(application: Omit<UnderwritingApplication, 'id' | 'status' | 'submissionDate' | 'riskAssessment'>): Promise<UnderwritingApplication> {
    const response = await api.post('/applications', application);
    return response.data;
  },

  async getApplication(id: string): Promise<UnderwritingApplication> {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  },

  async updateApplication(id: string, updates: Partial<UnderwritingApplication>): Promise<UnderwritingApplication> {
    const response = await api.patch(`/applications/${id}`, updates);
    return response.data;
  },

  async getApplications(filters?: {
    status?: UnderwritingApplication['status'];
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ applications: UnderwritingApplication[]; total: number }> {
    const response = await api.get('/applications', { params: filters });
    return response.data;
  },

  // Document Management
  async uploadDocument(applicationId: string, file: File, type: string): Promise<UnderwritingApplication['documents'][0]> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    const response = await api.post(`/applications/${applicationId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteDocument(applicationId: string, documentId: string): Promise<void> {
    await api.delete(`/applications/${applicationId}/documents/${documentId}`);
  },

  // Notes Management
  async addNote(applicationId: string, note: { text: string }): Promise<UnderwritingApplication['notes'][0]> {
    const response = await api.post(`/applications/${applicationId}/notes`, note);
    return response.data;
  },

  async deleteNote(applicationId: string, noteId: string): Promise<void> {
    await api.delete(`/applications/${applicationId}/notes/${noteId}`);
  },

  // Risk Assessment
  async getRiskAssessment(applicationId: string): Promise<UnderwritingApplication['riskAssessment']> {
    const response = await api.get(`/applications/${applicationId}/risk-assessment`);
    return response.data;
  },

  async getMarketAnalysis(zipCode: string): Promise<MarketAnalysis> {
    const response = await api.get(`/market-analysis/${zipCode}`);
    return response.data;
  },

  // Dashboard Stats
  async getDashboardStats(): Promise<UnderwritingDashboardStats> {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  // Underwriting Criteria
  async getUnderwritingCriteria(): Promise<UnderwritingCriteria> {
    const response = await api.get('/criteria');
    return response.data;
  },

  async updateUnderwritingCriteria(criteria: Partial<UnderwritingCriteria>): Promise<UnderwritingCriteria> {
    const response = await api.patch('/criteria', criteria);
    return response.data;
  },

  // Application Actions
  async approveApplication(id: string, notes?: string): Promise<UnderwritingApplication> {
    const response = await api.post(`/applications/${id}/approve`, { notes });
    return response.data;
  },

  async rejectApplication(id: string, reason: string): Promise<UnderwritingApplication> {
    const response = await api.post(`/applications/${id}/reject`, { reason });
    return response.data;
  },

  async requestMoreInfo(id: string, requests: string[]): Promise<UnderwritingApplication> {
    const response = await api.post(`/applications/${id}/request-info`, { requests });
    return response.data;
  },
}; 
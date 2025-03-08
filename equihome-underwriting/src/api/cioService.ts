import axios from 'axios';
import type { MarketCondition } from '../types/underwriting';

const baseURL = import.meta.env.VITE_CIO_API_URL || 'http://localhost:3002/api';

const cioApi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

cioApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('cio_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const cioService = {
  async getMarketConditions(zipCode: string) {
    const response = await cioApi.get(`/market-conditions/${zipCode}`);
    return response.data;
  },

  async getUnderwritingCriteria() {
    const response = await cioApi.get('/underwriting-criteria');
    return response.data;
  },

  async getRiskAssessment(applicationData: any) {
    const response = await cioApi.post('/risk-assessment', applicationData);
    return response.data;
  },

  async getMarketAnalysis(zipCode: string) {
    const response = await cioApi.get(`/market-analysis/${zipCode}`);
    return response.data;
  },

  async getPerformanceMetrics() {
    const response = await cioApi.get('/performance-metrics');
    return response.data;
  },

  async updateUnderwritingCriteria(criteria: any) {
    const response = await cioApi.put('/underwriting-criteria', criteria);
    return response.data;
  }
}; 
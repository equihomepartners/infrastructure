import type { FormData, LoanDecision } from '../types';
import { analyzeLoanApplication as mockAnalysis } from './mockAnalysis';

export async function analyzeLoanApplication(formData: FormData): Promise<LoanDecision> {
  // Use mock analysis instead of OpenAI API
  return mockAnalysis(formData);
}
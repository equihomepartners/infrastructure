import { analyzeLoanApplication as mockAnalysis } from './mockAnalysis';
export async function analyzeLoanApplication(formData) {
    // Use mock analysis instead of OpenAI API
    return mockAnalysis(formData);
}

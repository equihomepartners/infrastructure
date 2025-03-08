import type { FormData } from '../../types';

interface Scenario extends FormData {
  title: string;
  description: string;
}

interface Scenarios {
  [key: string]: Scenario;
}

export const presetScenarios: Scenarios = {
  scenario1: {
    title: "Downsizer in Double Bay",
    description: "Empty nesters looking to unlock equity in their family home while maintaining their lifestyle in Sydney's Eastern Suburbs.",
    borrowerName: "Richard & Margaret Wilson",
    annualIncome: 380000,
    employmentStatus: "self-employed",
    propertyAddress: "28 William Street, Double Bay",
    propertyType: "house",
    currentValue: 4200000,
    mortgageBalance: 850000,
    loanAmount: 600000,
    loanPurpose: "investment",
    loanTerm: 10,
    forecastedGrowth: 8.2
  },
  scenario2: {
    title: "Young Family in Manly",
    description: "Professional couple seeking to renovate their beachside property to accommodate their growing family.",
    borrowerName: "Alex & Sophie Taylor",
    annualIncome: 420000,
    employmentStatus: "employed",
    propertyAddress: "15 Bower Street, Manly",
    propertyType: "house",
    currentValue: 2850000,
    mortgageBalance: 1200000,
    loanAmount: 450000,
    loanPurpose: "renovation",
    loanTerm: 7,
    forecastedGrowth: 7.8
  },
  scenario3: {
    title: "Professional in Kirribilli",
    description: "Senior executive looking to reduce mortgage payments on their harbourside apartment to focus on investment opportunities.",
    borrowerName: "Victoria Chang",
    annualIncome: 290000,
    employmentStatus: "employed",
    propertyAddress: "42 Upper Pitt Street, Kirribilli",
    propertyType: "apartment",
    currentValue: 1950000,
    mortgageBalance: 750000,
    loanAmount: 350000,
    loanPurpose: "refinance",
    loanTerm: 5,
    forecastedGrowth: 6.8
  }
};
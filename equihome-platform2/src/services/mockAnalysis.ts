import type { FormData, LoanDecision } from '../types';
import { trafficLightZones } from '../data/trafficLightZones';
import { useFundParameters } from '../store/fundParameters';

export async function analyzeLoanApplication(formData: FormData): Promise<LoanDecision> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Get current fund parameters
  const {
    maxLTV,
    maxCombinedLTV,
    targetIRR,
    interestRate,
    maxLoanSize,
    minPropertyValue,
    maxPropertyValue,
    zoneAllocation
  } = useFundParameters.getState();

  // Check property value limits
  if (formData.currentValue < minPropertyValue) {
    return {
      approved: false,
      loanAmount: formData.loanAmount,
      interestRate,
      ltv: 0,
      riskLevel: 'high',
      explanation: `Property value of $${formData.currentValue.toLocaleString()} is below the minimum threshold of $${minPropertyValue.toLocaleString()}.`,
      returns: {
        yearlyBreakdown: [],
        totalInterest: 0,
        totalAppreciationShare: 0,
        totalReturn: 0,
        irr: 0
      },
      trafficLight: 'Red',
      suburb: ''
    };
  }

  if (formData.currentValue > maxPropertyValue) {
    return {
      approved: false,
      loanAmount: formData.loanAmount,
      interestRate,
      ltv: 0,
      riskLevel: 'high',
      explanation: `Property value of $${formData.currentValue.toLocaleString()} exceeds the maximum threshold of $${maxPropertyValue.toLocaleString()}.`,
      returns: {
        yearlyBreakdown: [],
        totalInterest: 0,
        totalAppreciationShare: 0,
        totalReturn: 0,
        irr: 0
      },
      trafficLight: 'Red',
      suburb: ''
    };
  }

  // Check loan size limit
  if (formData.loanAmount > maxLoanSize) {
    return {
      approved: false,
      loanAmount: formData.loanAmount,
      interestRate,
      ltv: 0,
      riskLevel: 'high',
      explanation: `Requested loan amount of $${formData.loanAmount.toLocaleString()} exceeds the maximum loan size of $${maxLoanSize.toLocaleString()}.`,
      returns: {
        yearlyBreakdown: [],
        totalInterest: 0,
        totalAppreciationShare: 0,
        totalReturn: 0,
        irr: 0
      },
      trafficLight: 'Red',
      suburb: ''
    };
  }

  // Calculate total debt (existing mortgage + new loan)
  const totalDebt = formData.mortgageBalance + formData.loanAmount;
  const ltv = (formData.loanAmount / formData.currentValue) * 100;
  const combinedLtv = (totalDebt / formData.currentValue) * 100;
  
  // Check LTV limits
  if (ltv > maxLTV) {
    return {
      approved: false,
      loanAmount: formData.loanAmount,
      interestRate,
      ltv,
      riskLevel: 'high',
      explanation: `LTV ratio of ${ltv.toFixed(1)}% exceeds maximum threshold of ${maxLTV}%.`,
      returns: {
        yearlyBreakdown: [],
        totalInterest: 0,
        totalAppreciationShare: 0,
        totalReturn: 0,
        irr: 0
      },
      trafficLight: 'Red',
      suburb: ''
    };
  }

  if (combinedLtv > maxCombinedLTV) {
    return {
      approved: false,
      loanAmount: formData.loanAmount,
      interestRate,
      ltv,
      riskLevel: 'high',
      explanation: `Combined LTV ratio of ${combinedLtv.toFixed(1)}% exceeds maximum threshold of ${maxCombinedLTV}%.`,
      returns: {
        yearlyBreakdown: [],
        totalInterest: 0,
        totalAppreciationShare: 0,
        totalReturn: 0,
        irr: 0
      },
      trafficLight: 'Red',
      suburb: ''
    };
  }

  const approved = ltv <= maxLTV && combinedLtv <= maxCombinedLTV;
  const riskLevel = ltv <= maxLTV - 10 ? 'low' : ltv <= maxLTV - 5 ? 'medium' : 'high';

  // Extract suburb from address and determine traffic light zone
  const suburb = formData.propertyAddress.split(',')[1]?.trim() || '';
  
  let trafficLight: 'Green' | 'Orange' | 'Red' = 'Red';
  if (trafficLightZones.green.some(zone => suburb.includes(zone))) {
    trafficLight = 'Green';
  } else if (trafficLightZones.orange.some(zone => suburb.includes(zone))) {
    trafficLight = 'Orange';
  }

  // Check if zone allocation allows this investment
  const zoneCheck = {
    Green: zoneAllocation.green > 0,
    Orange: zoneAllocation.orange > 0,
    Red: zoneAllocation.red > 0
  }[trafficLight];

  if (!zoneCheck) {
    return {
      approved: false,
      loanAmount: formData.loanAmount,
      interestRate,
      ltv,
      riskLevel,
      explanation: `This property is in a ${trafficLight} zone which currently has 0% allocation in fund parameters.`,
      returns: {
        yearlyBreakdown: [],
        totalInterest: 0,
        totalAppreciationShare: 0,
        totalReturn: 0,
        irr: 0
      },
      trafficLight,
      suburb
    };
  }

  // Generate yearly breakdown with forecasted growth
  const yearlyBreakdown = Array.from({ length: formData.loanTerm }, (_, i) => {
    const year = i + 1;
    
    // Calculate property value growth using forecasted rate
    const propertyValue = formData.currentValue * Math.pow(1 + (formData.forecastedGrowth / 100), year);
    const propertyGrowth = propertyValue - formData.currentValue;
    
    // Calculate accrued interest at current interest rate
    const accruedInterest = formData.loanAmount * (Math.pow(1 + (interestRate / 100), year) - 1);
    
    // Calculate appreciation share based on LTV ratio
    const appreciationShare = propertyGrowth * (formData.loanAmount / formData.currentValue);
    
    // Calculate total return and IRR
    const totalReturn = accruedInterest + appreciationShare;
    const irr = (totalReturn / formData.loanAmount) * 100 / year;

    return {
      year,
      propertyValue,
      accruedInterest,
      appreciationShare,
      totalReturn,
      irr
    };
  });

  // Calculate totals
  const totalInterest = yearlyBreakdown[yearlyBreakdown.length - 1].accruedInterest;
  const totalAppreciationShare = yearlyBreakdown[yearlyBreakdown.length - 1].appreciationShare;
  const totalReturn = totalInterest + totalAppreciationShare;
  const irr = (totalReturn / formData.loanAmount) * 100 / formData.loanTerm;

  // Check if IRR meets target
  if (irr < targetIRR) {
    return {
      approved: false,
      loanAmount: formData.loanAmount,
      interestRate,
      ltv,
      riskLevel,
      explanation: `Projected IRR of ${irr.toFixed(1)}% does not meet target IRR of ${targetIRR}%.`,
      returns: {
        yearlyBreakdown,
        totalInterest,
        totalAppreciationShare,
        totalReturn,
        irr
      },
      trafficLight,
      suburb
    };
  }

  return {
    approved,
    loanAmount: formData.loanAmount,
    interestRate,
    ltv,
    riskLevel,
    explanation: approved
      ? `Analysis complete. LTV ratio of ${ltv.toFixed(1)}% and combined LTV of ${combinedLtv.toFixed(1)}% are within acceptable ranges.`
      : `Combined LTV ratio of ${combinedLtv.toFixed(1)}% exceeds maximum threshold of ${maxCombinedLTV}%.`,
    returns: {
      yearlyBreakdown,
      totalInterest,
      totalAppreciationShare,
      totalReturn,
      irr
    },
    trafficLight,
    suburb
  };
}
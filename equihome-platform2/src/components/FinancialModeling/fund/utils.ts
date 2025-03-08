import type { FundModelInputs } from './fundStore';

interface YearlyReturn {
  year: number;
  interestReturn: number;
  appreciationReturn: number;
  totalReturn: number;
  irr: number;
  exitedDeals: number;
  reinvestedCapital: number;
  lpDistributions: number;
  gpDistributions: number;
  remainingDeals: number;
  cumulativeDeployment: number;
  reserveBalance: number;
}

interface FundMetrics {
  averageDealSize: number;
  weightedLTV: number;
  weightedGrowthRate: number;
  yearlyReturns: YearlyReturn[];
  portfolioStats: {
    activeDeals: number;
    exitedDeals: number;
    totalDeployment: number;
    remainingCapital: number;
    weightedDuration: number;
    geographicExposure: Record<string, number>;
    propertyTypeExposure: Record<string, number>;
    vintageYearExposure: number[];
  };
  riskMetrics: {
    concentrationRisk: number;
    durationRisk: number;
    marketRisk: number;
    deploymentRisk: number;
  };
}

// Calculate exit probability for a specific deal and year
const calculateExitProbability = (
  inputs: FundModelInputs,
  dealAge: number,
  appreciation: number,
  month: number
): number => {
  const { exitProbabilities, marketConditions } = inputs;
  const baseProb = exitProbabilities.baseRate * Math.pow(1.2, dealAge); // Increasing probability with age
  const marketMultiplier = marketConditions.housingMarketCycle * exitProbabilities.marketMultiplier;
  const appreciationMultiplier = appreciation >= exitProbabilities.appreciationThreshold ? 1.5 : 1.0;
  const seasonality = exitProbabilities.seasonalityFactors[month];
  
  return Math.min(baseProb * marketMultiplier * appreciationMultiplier * seasonality, 1);
};

// Calculate LP/GP distributions based on waterfall structure
const calculateDistributions = (
  inputs: FundModelInputs,
  totalReturn: number,
  investedCapital: number
): { lpDistribution: number; gpDistribution: number } => {
  const { capitalStructure } = inputs;
  const preferredReturn = investedCapital * capitalStructure.preferredReturn;
  
  let lpDistribution = 0;
  let gpDistribution = 0;
  
  // First: Preferred Return to LPs
  if (totalReturn <= preferredReturn) {
    lpDistribution = totalReturn;
    return { lpDistribution, gpDistribution };
  }
  
  lpDistribution = preferredReturn;
  let remaining = totalReturn - preferredReturn;
  
  // Second: GP Catch-up
  const catchUpAmount = (preferredReturn * capitalStructure.catchUp) / (1 - capitalStructure.catchUp);
  if (remaining <= catchUpAmount) {
    gpDistribution = remaining;
    return { lpDistribution, gpDistribution };
  }
  
  gpDistribution = catchUpAmount;
  remaining -= catchUpAmount;
  
  // Third: Split remaining according to LP/GP split
  lpDistribution += remaining * capitalStructure.lpSplit;
  gpDistribution += remaining * capitalStructure.gpSplit;
  
  return { lpDistribution, gpDistribution };
};

export const calculateFundMetrics = (inputs: FundModelInputs): FundMetrics => {
  const averageDealSize = Number(inputs.targetAUM) / Number(inputs.numberOfDeals);
  const weightedLTV = Number(inputs.ltvDistribution.mean);
  const weightedGrowthRate = Number(inputs.growthDistribution.mean);
  
  let activeDeals = 0;
  let deployedCapital = 0;
  let reserveBalance = inputs.targetAUM * inputs.deploymentSchedule.reserveRequirement;
  
  const yearlyReturns: YearlyReturn[] = Array.from({ length: 10 }, (_, year) => {
    const yearNum = year + 1;
    
    // Calculate deployments for the year
    const targetDeployment = yearNum <= 5 ? 
      inputs.targetAUM * inputs.deploymentSchedule.annualTargets[year] :
      0;
    
    const actualDeployment = Math.min(
      targetDeployment,
      inputs.targetAUM * inputs.deploymentSchedule.maximumDeployment
    );
    
    deployedCapital += actualDeployment;
    activeDeals += Math.floor(actualDeployment / averageDealSize);
    
    // Calculate exits for the year
    let exitedDeals = 0;
    let exitValue = 0;
    
    // Simulate monthly exits
    for (let month = 0; month < 12; month++) {
      const monthlyExitProb = calculateExitProbability(
        inputs,
        yearNum,
        weightedGrowthRate * yearNum,
        month
      );
      
      const monthlyExits = Math.floor(activeDeals * monthlyExitProb);
      exitedDeals += monthlyExits;
      
      // Calculate exit value including appreciation
      const appreciation = Math.pow(1 + weightedGrowthRate / 100, yearNum);
      exitValue += monthlyExits * averageDealSize * appreciation;
    }
    
    activeDeals -= exitedDeals;
    
    // Calculate returns
    const interestReturn = deployedCapital * 0.05; // 5% interest rate
    const appreciationReturn = exitValue - (exitedDeals * averageDealSize);
    const totalReturn = interestReturn + appreciationReturn;
    
    // Calculate distributions
    const { lpDistribution, gpDistribution } = calculateDistributions(
      inputs,
      totalReturn,
      deployedCapital
    );
    
    // Calculate reinvestment
    const reinvestedCapital = (exitValue + interestReturn) * inputs.capitalStructure.reinvestmentRate;
    deployedCapital += reinvestedCapital;
    activeDeals += Math.floor(reinvestedCapital / averageDealSize);
    
    // Update reserve balance
    reserveBalance += reinvestedCapital * inputs.deploymentSchedule.reserveRequirement;
    
    // Calculate IRR
    const irr = (Math.pow((totalReturn + deployedCapital) / deployedCapital, 1 / yearNum) - 1) * 100;
    
    return {
      year: yearNum,
      interestReturn,
      appreciationReturn,
      totalReturn,
      irr,
      exitedDeals,
      reinvestedCapital,
      lpDistributions: lpDistribution,
      gpDistributions: gpDistribution,
      remainingDeals: activeDeals,
      cumulativeDeployment: deployedCapital,
      reserveBalance
    };
  });

  // Calculate portfolio statistics
  const portfolioStats = {
    activeDeals,
    exitedDeals: inputs.numberOfDeals - activeDeals,
    totalDeployment: deployedCapital,
    remainingCapital: inputs.targetAUM - deployedCapital,
    weightedDuration: yearlyReturns.reduce((acc, curr) => 
      acc + (curr.remainingDeals * curr.year) / inputs.numberOfDeals, 0),
    geographicExposure: {
      urban: 0.4,
      suburban: 0.45,
      rural: 0.15
    },
    propertyTypeExposure: {
      singleFamily: 0.6,
      townhouse: 0.25,
      condo: 0.15
    },
    vintageYearExposure: inputs.deploymentSchedule.annualTargets
  };

  // Calculate risk metrics
  const riskMetrics = {
    concentrationRisk: Math.max(
      ...Object.values(portfolioStats.geographicExposure),
      ...Object.values(portfolioStats.propertyTypeExposure)
    ) / inputs.geographicConcentrationLimit,
    durationRisk: portfolioStats.weightedDuration / inputs.averageExitTerm,
    marketRisk: (inputs.marketConditions.housingMarketCycle +
      inputs.marketConditions.interestRateEnvironment +
      inputs.marketConditions.employmentTrends +
      inputs.marketConditions.migrationStrength) / 4,
    deploymentRisk: Math.abs(
      deployedCapital / inputs.targetAUM - 
      yearlyReturns.length * inputs.deploymentSchedule.minimumDeployment
    )
  };

  return {
    averageDealSize,
    weightedLTV,
    weightedGrowthRate,
    yearlyReturns,
    portfolioStats,
    riskMetrics
  };
};

// Normal distribution function for generating random values
export const normalDistribution = (mean: number, stdDev: number): number => {
  let u = 0, v = 0;
  while(u === 0) u = Math.random();
  while(v === 0) v = Math.random();
  const value = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return Number(value * stdDev + mean);
};

// Generate a random deal within the given parameters
export const generateRandomDeal = (inputs: FundModelInputs) => {
  const ltv = normalDistribution(
    inputs.ltvDistribution.mean,
    inputs.ltvDistribution.standardDev
  );
  
  const growthRate = normalDistribution(
    inputs.growthDistribution.mean,
    inputs.growthDistribution.standardDev
  );
  
  const propertyValue = normalDistribution(
    inputs.propertyValueDistribution.mean,
    inputs.propertyValueDistribution.standardDev
  );

  // Apply geographic and property type multipliers
  const geography = Math.random() < 0.4 ? 'urban' : Math.random() < 0.85 ? 'suburban' : 'rural';
  const propertyType = Math.random() < 0.6 ? 'singleFamily' : Math.random() < 0.85 ? 'townhouse' : 'condo';
  
  const adjustedGrowthRate = growthRate * 
    inputs.growthDistribution.geographicMultipliers[geography] *
    inputs.growthDistribution.propertyTypeMultipliers[propertyType];

  return {
    ltv: Math.max(
      inputs.ltvDistribution.min,
      Math.min(inputs.ltvDistribution.max, ltv)
    ),
    growthRate: Math.max(
      inputs.growthDistribution.min,
      Math.min(inputs.growthDistribution.max, adjustedGrowthRate)
    ),
    propertyValue: Math.max(
      inputs.propertyValueDistribution.min,
      Math.min(inputs.propertyValueDistribution.max, propertyValue)
    ),
    geography,
    propertyType
  };
};
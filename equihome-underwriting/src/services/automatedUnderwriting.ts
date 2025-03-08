import type { UnderwritingApplication, UnderwritingCriteria, MarketCondition } from '../types/underwriting';
import { cioService } from '../api/cioService';

export class AutomatedUnderwritingService {
  private async evaluatePropertyCriteria(application: UnderwritingApplication, criteria: UnderwritingCriteria): Promise<MarketCondition> {
    const propertyAge = new Date().getFullYear() - application.property.yearBuilt;
    
    if (propertyAge > criteria.propertyAgeLimit) {
      return 'red';
    }

    const marketAnalysis = await cioService.getMarketAnalysis(application.property.zipCode);
    if (marketAnalysis.riskScore > 7) {
      return 'red';
    } else if (marketAnalysis.riskScore > 4) {
      return 'yellow';
    }
    
    return 'green';
  }

  private evaluateFinancialCriteria(application: UnderwritingApplication, criteria: UnderwritingCriteria): MarketCondition {
    // LTV Check
    if (application.financial.loanToValue > criteria.maximumLoanToValue) {
      return 'red';
    }

    // DSCR Check
    if (application.financial.debtServiceCoverageRatio < criteria.minimumDebtServiceCoverageRatio) {
      return 'red';
    }

    // Cap Rate Check
    if (application.financial.capRate < 5) {
      return 'yellow';
    }

    return 'green';
  }

  private evaluateBorrowerCriteria(application: UnderwritingApplication, criteria: UnderwritingCriteria): MarketCondition {
    // Credit Score Check
    if (application.borrower.creditScore < criteria.minimumCreditScore) {
      return 'red';
    }

    // DTI Check
    if (application.borrower.debtToIncomeRatio > criteria.maximumDebtToIncomeRatio) {
      return 'red';
    }

    // Liquidity Check
    if (application.borrower.liquidAssets < criteria.minimumLiquidity) {
      return 'yellow';
    }

    // Bankruptcy/Foreclosure Check
    if (application.borrower.bankruptcies > 0 || application.borrower.foreclosures > 0) {
      return 'red';
    }

    return 'green';
  }

  public async evaluateApplication(application: UnderwritingApplication): Promise<{
    overall: MarketCondition;
    property: MarketCondition;
    financial: MarketCondition;
    borrower: MarketCondition;
    marketCondition: MarketCondition;
    recommendations: string[];
  }> {
    const criteria = await cioService.getUnderwritingCriteria();
    const marketConditions = await cioService.getMarketConditions(application.property.zipCode);
    
    const propertyEvaluation = await this.evaluatePropertyCriteria(application, criteria);
    const financialEvaluation = this.evaluateFinancialCriteria(application, criteria);
    const borrowerEvaluation = this.evaluateBorrowerCriteria(application, criteria);
    
    const recommendations: string[] = [];
    
    if (propertyEvaluation === 'red') {
      recommendations.push('Property does not meet minimum criteria');
    }
    if (financialEvaluation === 'red') {
      recommendations.push('Financial metrics do not meet minimum requirements');
    }
    if (borrowerEvaluation === 'red') {
      recommendations.push('Borrower does not meet minimum qualifications');
    }
    if (marketConditions.condition === 'red') {
      recommendations.push('Market conditions are unfavorable');
    }

    // Determine overall evaluation
    let overall: MarketCondition = 'green';
    if ([propertyEvaluation, financialEvaluation, borrowerEvaluation, marketConditions.condition].includes('red')) {
      overall = 'red';
    } else if ([propertyEvaluation, financialEvaluation, borrowerEvaluation, marketConditions.condition].includes('yellow')) {
      overall = 'yellow';
    }

    return {
      overall,
      property: propertyEvaluation,
      financial: financialEvaluation,
      borrower: borrowerEvaluation,
      marketCondition: marketConditions.condition,
      recommendations
    };
  }

  public async getPerformanceMetrics() {
    return await cioService.getPerformanceMetrics();
  }
} 
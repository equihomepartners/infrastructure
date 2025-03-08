import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUnderwritingStore } from '../store/underwritingStore';
import { toast } from 'react-hot-toast';

const propertySchema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Valid ZIP code is required'),
  propertyType: z.enum(['single-family', 'multi-family', 'condo', 'townhouse']),
  units: z.number().min(1, 'Number of units is required'),
  squareFeet: z.number().min(1, 'Square footage is required'),
  yearBuilt: z.number().min(1800, 'Valid year is required'),
  purchasePrice: z.number().min(1, 'Purchase price is required'),
  estimatedValue: z.number().min(1, 'Estimated value is required'),
  condition: z.enum(['excellent', 'good', 'fair', 'poor']),
});

const financialSchema = z.object({
  loanAmount: z.number().min(1, 'Loan amount is required'),
  loanToValue: z.number().min(0).max(100, 'Valid LTV is required'),
  debtServiceCoverageRatio: z.number().min(0, 'Valid DSCR is required'),
  monthlyRent: z.number().min(0, 'Monthly rent is required'),
  monthlyExpenses: z.number().min(0, 'Monthly expenses is required'),
  netOperatingIncome: z.number().min(0, 'NOI is required'),
  capRate: z.number().min(0, 'Cap rate is required'),
  cashOnCash: z.number().min(0, 'Cash on cash return is required'),
  internalRateOfReturn: z.number().min(0, 'IRR is required'),
});

const borrowerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  creditScore: z.number().min(300).max(850, 'Valid credit score is required'),
  monthlyIncome: z.number().min(0, 'Monthly income is required'),
  monthlyDebt: z.number().min(0, 'Monthly debt is required'),
  debtToIncomeRatio: z.number().min(0).max(100, 'Valid DTI is required'),
  liquidAssets: z.number().min(0, 'Liquid assets is required'),
  bankruptcies: z.number().min(0, 'Number of bankruptcies is required'),
  foreclosures: z.number().min(0, 'Number of foreclosures is required'),
  employmentDetails: z.object({
    employer: z.string().min(1, 'Employer name is required'),
    position: z.string().min(1, 'Position is required'),
    yearsEmployed: z.number().min(0, 'Years employed is required'),
    monthlyIncome: z.number().min(0, 'Monthly income is required'),
  }),
});

const applicationSchema = z.object({
  property: propertySchema,
  financial: financialSchema,
  borrower: borrowerSchema,
  market: z.object({
    condition: z.enum(['green', 'yellow', 'red']),
    rentGrowth: z.number(),
    vacancyRate: z.number(),
    employmentGrowth: z.number(),
    populationGrowth: z.number(),
    medianHomePrice: z.number(),
    medianRent: z.number(),
    supplyGrowth: z.number(),
    demandGrowth: z.number(),
    riskScore: z.number(),
  }).default({
    condition: 'yellow',
    rentGrowth: 0,
    vacancyRate: 0,
    employmentGrowth: 0,
    populationGrowth: 0,
    medianHomePrice: 0,
    medianRent: 0,
    supplyGrowth: 0,
    demandGrowth: 0,
    riskScore: 0,
  }),
  documents: z.array(z.object({
    id: z.string(),
    type: z.string(),
    name: z.string(),
    url: z.string(),
    uploadDate: z.string(),
  })).default([]),
  notes: z.array(z.object({
    id: z.string(),
    text: z.string(),
    author: z.string(),
    date: z.string(),
  })).default([]),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export default function ApplicationForm() {
  const navigate = useNavigate();
  const { submitApplication } = useUnderwritingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      property: {
        propertyType: 'single-family',
        condition: 'good',
      },
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      setIsSubmitting(true);
      await submitApplication(data);
      toast.success('Application submitted successfully');
      navigate('/applications');
    } catch (error) {
      toast.error('Failed to submit application');
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 max-w-4xl mx-auto">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Property Information</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Please provide detailed information about the property.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
              Street Address
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register('property.address')}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.property?.address && (
                <p className="mt-2 text-sm text-red-600">{errors.property.address.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
              City
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register('property.city')}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.property?.city && (
                <p className="mt-2 text-sm text-red-600">{errors.property.city.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
              State
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register('property.state')}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.property?.state && (
                <p className="mt-2 text-sm text-red-600">{errors.property.state.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="zipCode" className="block text-sm font-medium leading-6 text-gray-900">
              ZIP Code
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register('property.zipCode')}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.property?.zipCode && (
                <p className="mt-2 text-sm text-red-600">{errors.property.zipCode.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="propertyType" className="block text-sm font-medium leading-6 text-gray-900">
              Property Type
            </label>
            <div className="mt-2">
              <select
                {...register('property.propertyType')}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              >
                <option value="single-family">Single Family</option>
                <option value="multi-family">Multi Family</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
              </select>
              {errors.property?.propertyType && (
                <p className="mt-2 text-sm text-red-600">{errors.property.propertyType.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="condition" className="block text-sm font-medium leading-6 text-gray-900">
              Property Condition
            </label>
            <div className="mt-2">
              <select
                {...register('property.condition')}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
              {errors.property?.condition && (
                <p className="mt-2 text-sm text-red-600">{errors.property.condition.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Financial Information</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Please provide the financial details for this property.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="loanAmount" className="block text-sm font-medium leading-6 text-gray-900">
              Loan Amount
            </label>
            <div className="mt-2">
              <input
                type="number"
                {...register('financial.loanAmount', { valueAsNumber: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.financial?.loanAmount && (
                <p className="mt-2 text-sm text-red-600">{errors.financial.loanAmount.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="loanToValue" className="block text-sm font-medium leading-6 text-gray-900">
              Loan-to-Value (LTV)
            </label>
            <div className="mt-2">
              <input
                type="number"
                {...register('financial.loanToValue', { valueAsNumber: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.financial?.loanToValue && (
                <p className="mt-2 text-sm text-red-600">{errors.financial.loanToValue.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="debtServiceCoverageRatio" className="block text-sm font-medium leading-6 text-gray-900">
              Debt Service Coverage Ratio (DSCR)
            </label>
            <div className="mt-2">
              <input
                type="number"
                {...register('financial.debtServiceCoverageRatio', { valueAsNumber: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.financial?.debtServiceCoverageRatio && (
                <p className="mt-2 text-sm text-red-600">{errors.financial.debtServiceCoverageRatio.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="monthlyRent" className="block text-sm font-medium leading-6 text-gray-900">
              Monthly Rent
            </label>
            <div className="mt-2">
              <input
                type="number"
                {...register('financial.monthlyRent', { valueAsNumber: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.financial?.monthlyRent && (
                <p className="mt-2 text-sm text-red-600">{errors.financial.monthlyRent.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="monthlyExpenses" className="block text-sm font-medium leading-6 text-gray-900">
              Monthly Expenses
            </label>
            <div className="mt-2">
              <input
                type="number"
                {...register('financial.monthlyExpenses', { valueAsNumber: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.financial?.monthlyExpenses && (
                <p className="mt-2 text-sm text-red-600">{errors.financial.monthlyExpenses.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="netOperatingIncome" className="block text-sm font-medium leading-6 text-gray-900">
              Net Operating Income (NOI)
            </label>
            <div className="mt-2">
              <input
                type="number"
                {...register('financial.netOperatingIncome', { valueAsNumber: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.financial?.netOperatingIncome && (
                <p className="mt-2 text-sm text-red-600">{errors.financial.netOperatingIncome.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="capRate" className="block text-sm font-medium leading-6 text-gray-900">
              Cap Rate
            </label>
            <div className="mt-2">
              <input
                type="number"
                {...register('financial.capRate', { valueAsNumber: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.financial?.capRate && (
                <p className="mt-2 text-sm text-red-600">{errors.financial.capRate.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="cashOnCash" className="block text-sm font-medium leading-6 text-gray-900">
              Cash on Cash Return
            </label>
            <div className="mt-2">
              <input
                type="number"
                {...register('financial.cashOnCash', { valueAsNumber: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.financial?.cashOnCash && (
                <p className="mt-2 text-sm text-red-600">{errors.financial.cashOnCash.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="internalRateOfReturn" className="block text-sm font-medium leading-6 text-gray-900">
              Internal Rate of Return (IRR)
            </label>
            <div className="mt-2">
              <input
                type="number"
                {...register('financial.internalRateOfReturn', { valueAsNumber: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.financial?.internalRateOfReturn && (
                <p className="mt-2 text-sm text-red-600">{errors.financial.internalRateOfReturn.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Borrower Information</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Please provide information about the borrower.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
              First Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register('borrower.firstName')}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.borrower?.firstName && (
                <p className="mt-2 text-sm text-red-600">{errors.borrower.firstName.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
              Last Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register('borrower.lastName')}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.borrower?.lastName && (
                <p className="mt-2 text-sm text-red-600">{errors.borrower.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="creditScore" className="block text-sm font-medium leading-6 text-gray-900">
              Credit Score
            </label>
            <div className="mt-2">
              <input
                type="number"
                {...register('borrower.creditScore', { valueAsNumber: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.borrower?.creditScore && (
                <p className="mt-2 text-sm text-red-600">{errors.borrower.creditScore.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="monthlyIncome" className="block text-sm font-medium leading-6 text-gray-900">
              Monthly Income
            </label>
            <div className="mt-2">
              <input
                type="number"
                {...register('borrower.monthlyIncome', { valueAsNumber: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.borrower?.monthlyIncome && (
                <p className="mt-2 text-sm text-red-600">{errors.borrower.monthlyIncome.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="employer" className="block text-sm font-medium leading-6 text-gray-900">
              Employer
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register('borrower.employmentDetails.employer')}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.borrower?.employmentDetails?.employer && (
                <p className="mt-2 text-sm text-red-600">{errors.borrower.employmentDetails.employer.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="position" className="block text-sm font-medium leading-6 text-gray-900">
              Position
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register('borrower.employmentDetails.position')}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.borrower?.employmentDetails?.position && (
                <p className="mt-2 text-sm text-red-600">{errors.borrower.employmentDetails.position.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="monthlyDebt" className="block text-sm font-medium leading-6 text-gray-900">
              Monthly Debt
            </label>
            <div className="mt-2">
              <input
                type="number"
                {...register('borrower.monthlyDebt', { valueAsNumber: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.borrower?.monthlyDebt && (
                <p className="mt-2 text-sm text-red-600">{errors.borrower.monthlyDebt.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="debtToIncomeRatio" className="block text-sm font-medium leading-6 text-gray-900">
              Debt-to-Income Ratio (DTI)
            </label>
            <div className="mt-2">
              <input
                type="number"
                {...register('borrower.debtToIncomeRatio', { valueAsNumber: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              {errors.borrower?.debtToIncomeRatio && (
                <p className="mt-2 text-sm text-red-600">{errors.borrower.debtToIncomeRatio.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => navigate('/applications')}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
} 
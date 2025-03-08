import { neutralBayDeal } from './icMemos/neutralBay';
import { bronteDeal } from './icMemos/bronte';
import { freshwaterDeal } from './icMemos/freshwater';
import { willoughbyDeal } from './icMemos/willoughby';
import { pymbleDeal } from './icMemos/pymble';
import { beecroftDeal } from './icMemos/beecroft';
import { mosmanDeal } from './icMemos/mosman';
import { randwickDeal } from './icMemos/randwick';
import { Deal } from '../types/deals';

export const sampleDeals: Deal[] = [
  {
    id: '1',
    suburb: 'Mosman',
    propertyValue: 2500000,
    loanAmount: 750000,
    ltv: 30,
    location: {
      latitude: -33.8292,
      longitude: 151.2442
    },
    loanTerms: {
      startDate: '2023-01-01',
      endDate: '2025-01-01',
      interestRate: 5.5
    },
    propertyDetails: {
      address: '123 Mosman St',
      yearlyGrowth: 8.5
    }
  },
  // Add more sample deals as needed...
];
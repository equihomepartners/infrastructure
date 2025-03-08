import React from 'react';
import { useParams } from 'react-router-dom';
import { sampleDeals } from '../data/sampleDeals';
import BorrowerProfile from './deal/BorrowerProfile';
import DealHeader from './deal/DealHeader';
import InvestmentThesis from './deal/InvestmentThesis';
import PropertyGallery from './deal/PropertyGallery';
import ReturnProjections from './ReturnProjections';
import SuburbReport from './deal/SuburbReport';
import TransactionSummary from './deal/TransactionSummary';
import LocationMap from './deal/LocationMap';

const DealAnalysis: React.FC = () => {
  const { id } = useParams();
  const deal = sampleDeals.find(d => d.id === id);

  if (!deal) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Deal not found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DealHeader deal={deal} />
      <InvestmentThesis thesis={deal.investmentThesis} />
      <BorrowerProfile profile={deal.borrowerProfile} />
      <TransactionSummary deal={deal} />
      <ReturnProjections deal={deal} />
      <SuburbReport deal={deal} />
      <PropertyGallery images={deal.images} address={deal.propertyDetails.address} />
      <LocationMap 
        latitude={deal.location.latitude} 
        longitude={deal.location.longitude} 
        address={deal.propertyDetails.address} 
      />
    </div>
  );
};

export default DealAnalysis;
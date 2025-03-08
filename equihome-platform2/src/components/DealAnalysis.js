import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const DealAnalysis = () => {
    const { id } = useParams();
    const deal = sampleDeals.find(d => d.id === id);
    if (!deal) {
        return (_jsx("div", { className: "text-center py-12", children: _jsx("h2", { className: "text-2xl font-semibold text-gray-900", children: "Deal not found" }) }));
    }
    return (_jsxs("div", { className: "space-y-8", children: [_jsx(DealHeader, { deal: deal }), _jsx(InvestmentThesis, { thesis: deal.investmentThesis }), _jsx(BorrowerProfile, { profile: deal.borrowerProfile }), _jsx(TransactionSummary, { deal: deal }), _jsx(ReturnProjections, { deal: deal }), _jsx(SuburbReport, { deal: deal }), _jsx(PropertyGallery, { images: deal.images, address: deal.propertyDetails.address }), _jsx(LocationMap, { latitude: deal.location.latitude, longitude: deal.location.longitude, address: deal.propertyDetails.address })] }));
};
export default DealAnalysis;

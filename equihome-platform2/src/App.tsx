import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import ConfidentialityScreen from './components/ConfidentialityScreen';
import GuidedDemo from './components/GuidedDemo';
import Navbar from './components/Navbar';
import MLEnhancedMap from './components/cio/MLEnhancedMap';
import Pipeline from './components/Pipeline';
import AssetReport from './components/AssetReport';
import UnderwriteDemo from './components/UnderwriteDemo';
import UnderwritingForm from './components/UnderwritingForm';
import UnderwriteSystemDeepDive from './components/UnderwriteSystemDeepDive';
import PropTrackDemo from './components/PropTrackDemo';
import PropTrackReport from './components/PropTrackReport';
import Resources from './components/Resources';
import FundDashboard from './components/FundDashboard';
import CIODashboard from './components/cio/CIODashboard';
import TechnicalSettings from './components/technical-settings/TechnicalSettings';
import type { FormData } from './types';

const App: React.FC = () => {
  const handleSuburbSelect = (suburb: string) => {
    console.log('Selected suburb:', suburb);
  };

  const handleUnderwritingSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };

  // Mock data for PropTrackReport
  const mockPropTrackData = {
    propertyDetails: {
      address: "123 Sample Street",
      suburb: "Test Suburb",
      postcode: "2000",
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      landSize: 450,
      propertyType: "House",
      lotPlan: "Lot 1 DP123456",
      council: "Test Council"
    },
    valuation: {
      estimatedValue: 1200000,
      lowRange: 1150000,
      highRange: 1250000,
      confidence: 0.85,
      date: "2024-03-11",
      applicationAmount: 900000,
      loanAmount: 720000
    },
    comparableSales: [
      {
        address: "125 Sample Street",
        price: 1180000,
        saleDate: "2024-02-15",
        bedrooms: 3,
        bathrooms: 2,
        parking: 1,
        landSize: 445,
        propertyType: "House"
      }
    ],
    propertyHistory: [
      {
        date: "2020-01-15",
        price: 980000,
        party: "Previous Owner"
      }
    ]
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<ConfidentialityScreen />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/guided-demo" element={<GuidedDemo />} />
          
          {/* Protected routes with Navbar */}
          <Route path="/*" element={
            <>
              <Navbar />
              <div className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/cio" element={<CIODashboard />} />
                  <Route path="/technical-settings" element={<TechnicalSettings />} />
                  <Route path="/pipeline/*" element={<Pipeline />} />
                  <Route path="/underwrite" element={<UnderwriteDemo />} />
                  <Route path="/underwrite/form" element={<UnderwritingForm onSubmit={handleUnderwritingSubmit} />} />
                  <Route path="/underwrite/deep-dive" element={<UnderwriteSystemDeepDive />} />
                  <Route path="/proptrack" element={<PropTrackDemo />} />
                  <Route path="/proptrack/report" element={
                    <PropTrackReport 
                      propertyDetails={mockPropTrackData.propertyDetails}
                      valuation={mockPropTrackData.valuation}
                      comparableSales={mockPropTrackData.comparableSales}
                      propertyHistory={mockPropTrackData.propertyHistory}
                    />
                  } />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/report" element={<AssetReport />} />
                  <Route path="/fund" element={<FundDashboard />} />
                </Routes>
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
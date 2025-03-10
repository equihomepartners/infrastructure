import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MLEnhancedMap from './components/cio/MLEnhancedMap';

const App: React.FC = () => {
  const handleSuburbSelect = (suburb: string) => {
    console.log('Selected suburb:', suburb);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="space-y-6">
                  <h1 className="text-3xl font-bold">Equihome Platform</h1>
                  <MLEnhancedMap onSuburbSelect={handleSuburbSelect} />
                </div>
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
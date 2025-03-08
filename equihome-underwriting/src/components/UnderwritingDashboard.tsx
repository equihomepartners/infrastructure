import React, { useEffect } from 'react';
import { usePlatformConnection } from '../store/platformConnection';

const UnderwritingDashboard: React.FC = () => {
  const { platformConfig, isConnected, setIsConnected } = usePlatformConnection();

  useEffect(() => {
    // Initial connection to platform
    const connectToPlatform = async () => {
      try {
        const response = await fetch(`${platformConfig.apiUrl}/api/underwriting/connect`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          setIsConnected(true);
          console.log('Successfully connected to platform');
        }
      } catch (error) {
        console.error('Failed to connect to platform:', error);
      }
    };

    connectToPlatform();
  }, [platformConfig.apiUrl, setIsConnected]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Equihome Underwriting System
            </h1>
            <div className="flex items-center space-x-2">
              <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-gray-600">
                {isConnected ? 'Connected to Platform' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Add your underwriting components here */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Underwriting Queue</h2>
          {/* Add underwriting queue component */}
        </div>
      </main>
    </div>
  );
};

export default UnderwritingDashboard; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Shield, AlertTriangle } from 'lucide-react';

const ConfidentialityScreen: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has already accepted in this session
    const hasAccepted = sessionStorage.getItem('confidentialityAccepted');
    if (hasAccepted === 'true') {
      navigate('/welcome');
    }
  }, [navigate]);

  const handleContinue = () => {
    if (accepted) {
      // Store acceptance in session storage
      sessionStorage.setItem('confidentialityAccepted', 'true');
      navigate('/welcome');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8">
        <div className="flex items-center justify-center mb-6">
          <Lock className="h-12 w-12 text-indigo-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Confidential Information
        </h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                This demo platform is strictly private and confidential, available exclusively to users 
                who have been explicitly invited by Equihome Partners.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Shield className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Confidentiality Notice</h3>
              <p className="mt-2 text-gray-600">
                By proceeding, you acknowledge that:
              </p>
              <ul className="mt-2 text-gray-600 list-disc list-inside space-y-1">
                <li>You have been explicitly invited by Equihome Partners to access this platform</li>
                <li>All information presented is confidential and proprietary</li>
                <li>The data shown is for demonstration purposes only</li>
                <li>Sharing access or information from this platform is strictly prohibited</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="accept"
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="accept" className="ml-2 block text-sm text-gray-900">
              I acknowledge that I have been invited by Equihome Partners and agree to maintain confidentiality
            </label>
          </div>

          <button
            onClick={handleContinue}
            disabled={!accepted}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Platform
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfidentialityScreen;
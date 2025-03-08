import React, { useState } from 'react';
import { HelpCircle, X, Mail } from 'lucide-react';

const HelpButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4 w-80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            Have questions about our platform? We're here to help! Contact our team for assistance.
          </p>
          <a
            href="mailto:sujay@equihome.com.au"
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Mail className="h-4 w-4 mr-2" />
            Email Support
          </a>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all ${
          isOpen ? 'rotate-180' : ''
        }`}
      >
        <HelpCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default HelpButton;
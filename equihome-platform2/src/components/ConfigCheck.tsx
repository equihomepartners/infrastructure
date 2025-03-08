import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfigCheck: React.FC = () => {
  const missingEnvVars = [];
  
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    missingEnvVars.push('VITE_OPENAI_API_KEY');
  }
  
  if (!import.meta.env.VITE_OPENAI_ASSISTANT_ID) {
    missingEnvVars.push('VITE_OPENAI_ASSISTANT_ID');
  }

  if (missingEnvVars.length === 0) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Configuration Warning
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              The following environment variables are missing:
            </p>
            <ul className="list-disc list-inside mt-1">
              {missingEnvVars.map(variable => (
                <li key={variable}>{variable}</li>
              ))}
            </ul>
            <p className="mt-2">
              Please add these to your .env file to enable full functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigCheck;
import React from 'react';

const SydneyMap: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-gray-50 rounded-lg p-4">
      {/* Harbor Line */}
      <div className="absolute left-1/4 right-1/4 top-1/3 h-px bg-gray-300" />

      {/* Eastern Suburbs */}
      <div 
        className="absolute right-[20%] top-[30%] w-32 h-32 rounded-full bg-green-100 border border-green-200 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
      >
        <span className="text-sm font-medium text-gray-700">Eastern Suburbs</span>
      </div>

      {/* North Shore */}
      <div 
        className="absolute left-[45%] top-[20%] w-32 h-32 rounded-full bg-green-100 border border-green-200 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
      >
        <span className="text-sm font-medium text-gray-700">North Shore</span>
      </div>

      {/* Inner West */}
      <div 
        className="absolute left-[35%] top-[45%] w-32 h-32 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
      >
        <span className="text-sm font-medium text-gray-700">Inner West</span>
      </div>

      {/* South West */}
      <div 
        className="absolute left-[30%] top-[65%] w-32 h-32 rounded-full bg-red-100 border border-red-200 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
      >
        <span className="text-sm font-medium text-gray-700">South West</span>
      </div>

      {/* Distribution Stats */}
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-4">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Premium</div>
          <div className="text-lg font-semibold text-green-600">45%</div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Growth</div>
          <div className="text-lg font-semibold text-orange-600">35%</div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <div className="text-sm text-gray-600">Monitoring</div>
          <div className="text-lg font-semibold text-red-600">20%</div>
        </div>
      </div>
    </div>
  );
};

export default SydneyMap; 
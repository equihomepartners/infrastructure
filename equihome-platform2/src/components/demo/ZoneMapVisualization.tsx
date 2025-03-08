import React from 'react';

const ZoneMapVisualization: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-semibold mb-8">Sydney Metro Area</h2>
      
      {/* Map Area with Zones */}
      <div className="relative flex-1 bg-gray-50/50 rounded-3xl p-8 mb-8">
        {/* North Shore */}
        <div className="absolute left-[40%] top-[10%] w-64 h-24 bg-green-50 rounded-xl border border-green-200">
          <div className="p-4 text-center">
            <div className="text-lg font-medium">North Shore</div>
            <div className="text-sm text-green-600">Premium Zone</div>
          </div>
        </div>

        {/* Inner West and Eastern Suburbs Row */}
        <div className="absolute left-[20%] top-[40%] w-64 h-24 bg-orange-50 rounded-xl border border-orange-200">
          <div className="p-4 text-center">
            <div className="text-lg font-medium">Inner West</div>
            <div className="text-sm text-orange-600">Growth Zone</div>
          </div>
        </div>

        <div className="absolute right-[10%] top-[40%] w-64 h-24 bg-green-50 rounded-xl border border-green-200">
          <div className="p-4 text-center">
            <div className="text-lg font-medium">Eastern Suburbs</div>
            <div className="text-sm text-green-600">Premium Zone</div>
          </div>
        </div>

        {/* South West */}
        <div className="absolute left-[20%] top-[70%] w-64 h-24 bg-red-50 rounded-xl border border-red-200">
          <div className="p-4 text-center">
            <div className="text-lg font-medium">South West</div>
            <div className="text-sm text-red-600">Monitoring Zone</div>
          </div>
        </div>
      </div>

      {/* Distribution Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-xl">
          <div className="text-gray-600">Premium Zones</div>
          <div className="text-3xl font-semibold text-green-600">45%</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl">
          <div className="text-gray-600">Growth Zones</div>
          <div className="text-3xl font-semibold text-orange-600">35%</div>
        </div>
        <div className="bg-red-50 p-4 rounded-xl">
          <div className="text-gray-600">Monitoring Zones</div>
          <div className="text-3xl font-semibold text-red-600">20%</div>
        </div>
      </div>
    </div>
  );
};

export default ZoneMapVisualization; 
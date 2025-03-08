import React, { useState } from 'react';
import { Settings, TrendingUp, Shield, Building, Percent } from 'lucide-react';

interface ZoneAllocation {
  green: number;
  orange: number;
  red: number;
}

const FundParameters: React.FC = () => {
  const [parameters, setParameters] = useState([
    {
      id: 'target-irr',
      name: 'Target IRR',
      value: 18,
      min: 10,
      max: 30,
      step: 0.5,
      unit: '%',
      category: 'returns'
    },
    {
      id: 'max-ltv',
      name: 'Maximum LTV',
      value: 75,
      min: 50,
      max: 85,
      step: 5,
      unit: '%',
      category: 'risk'
    },
    {
      id: 'min-property-value',
      name: 'Minimum Property Value',
      value: 1000000,
      min: 500000,
      max: 5000000,
      step: 100000,
      unit: '$',
      category: 'property'
    },
    {
      id: 'max-exposure',
      name: 'Maximum Suburb Exposure',
      value: 25,
      min: 10,
      max: 40,
      step: 5,
      unit: '%',
      category: 'risk'
    }
  ]);

  const [zoneAllocation, setZoneAllocation] = useState<ZoneAllocation>({
    green: 90,
    orange: 10,
    red: 0
  });

  const handleParameterChange = (id: string, value: number) => {
    setParameters(parameters.map(param =>
      param.id === id ? { ...param, value } : param
    ));
  };

  const handleZoneChange = (zone: keyof ZoneAllocation, value: number) => {
    const newAllocation = { ...zoneAllocation };
    const oldValue = newAllocation[zone];
    newAllocation[zone] = value;

    // Adjust other zones proportionally
    const remaining = 100 - value;
    const otherZones = Object.keys(newAllocation).filter(k => k !== zone) as Array<keyof ZoneAllocation>;
    const oldSum = otherZones.reduce((sum, key) => sum + newAllocation[key], 0);
    
    if (oldSum > 0) {
      otherZones.forEach(key => {
        newAllocation[key] = Math.round((newAllocation[key] / oldSum) * remaining);
      });
    }

    // Ensure total is 100%
    const total = Object.values(newAllocation).reduce((sum, val) => sum + val, 0);
    if (total !== 100) {
      const diff = 100 - total;
      const lastZone = otherZones[otherZones.length - 1];
      newAllocation[lastZone] += diff;
    }

    setZoneAllocation(newAllocation);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {parameters.map(param => (
          <div key={param.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {param.category === 'returns' && <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />}
                {param.category === 'risk' && <Shield className="h-5 w-5 text-red-500 mr-2" />}
                {param.category === 'property' && <Building className="h-5 w-5 text-green-500 mr-2" />}
                <h3 className="text-lg font-semibold text-gray-900">
                  {param.name}
                </h3>
              </div>
              <span className="text-lg font-bold text-indigo-600">
                {param.unit === '$' 
                  ? `$${param.value.toLocaleString()}`
                  : `${param.value}${param.unit}`}
              </span>
            </div>
            
            <input
              type="range"
              min={param.min}
              max={param.max}
              step={param.step}
              value={param.value}
              onChange={(e) => handleParameterChange(param.id, Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>{param.unit === '$' 
                ? `$${param.min.toLocaleString()}`
                : `${param.min}${param.unit}`}</span>
              <span>{param.unit === '$'
                ? `$${param.max.toLocaleString()}`
                : `${param.max}${param.unit}`}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Percent className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-semibold">Zone Allocation Targets</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-green-700">Green Zone Target</label>
              <span className="text-sm text-green-700">{zoneAllocation.green}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={zoneAllocation.green}
              onChange={(e) => handleZoneChange('green', parseInt(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-yellow-700">Orange Zone Target</label>
              <span className="text-sm text-yellow-700">{zoneAllocation.orange}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={zoneAllocation.orange}
              onChange={(e) => handleZoneChange('orange', parseInt(e.target.value))}
              className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-red-700">Red Zone Target</label>
              <span className="text-sm text-red-700">{zoneAllocation.red}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={zoneAllocation.red}
              onChange={(e) => handleZoneChange('red', parseInt(e.target.value))}
              className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Current Allocation</h4>
            <div className="h-4 rounded-full overflow-hidden flex">
              <div 
                className="bg-green-500 h-full transition-all duration-300"
                style={{ width: `${zoneAllocation.green}%` }}
              />
              <div 
                className="bg-yellow-500 h-full transition-all duration-300"
                style={{ width: `${zoneAllocation.orange}%` }}
              />
              <div 
                className="bg-red-500 h-full transition-all duration-300"
                style={{ width: `${zoneAllocation.red}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundParameters;
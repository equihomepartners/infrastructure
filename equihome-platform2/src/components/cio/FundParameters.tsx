import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Brain, Shield, TrendingUp, AlertTriangle, Settings, Database, BarChart3, FileText, Target, Zap, Activity, RefreshCw, Clock, DollarSign, Percent, CheckCircle } from 'lucide-react';
import { useFundParameters } from '@/store/fundParameters';

interface RiskThresholds {
  greenZoneLVR: number;
  orangeZoneLVR: number;
  redZoneLVR: number;
  maxSuburbConcentration: number;
  maxPostcodeExposure: number;
}

interface MLParameters {
  confidenceThreshold: number;
  marketSignalWeight: number;
  demographicWeight: number;
  infrastructureWeight: number;
  modelSensitivity: number;
}

interface InvestmentCriteria {
  minLoanSize: number;
  maxLoanSize: number;
  minPropertyValue: number;
  maxPropertyValue: number;
  minServiceability: number;
}

// Add new interface for presets
interface PresetStrategy {
  name: string;
  description: string;
  targetReturn: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  marketCycle: {
    phase: 'Early Growth' | 'Peak Growth' | 'Late Growth' | 'Stabilization';
    zoneMovement: string;
    outlook: string;
    exitWindow: {
      optimal: string;
      expectedGrowth: string;
      volatilityProfile: string;
    };
  };
  parameters: {
    loanParameters: {
      minLoanSize: number;
      maxLoanSize: number;
      minPropertyValue: number;
      maxPropertyValue: number;
      minServiceability: number;
      baseRate: number;
    };
    riskParameters: {
      greenZoneLVR: number;
      orangeZoneLVR: number;
      redZoneLVR: number;
      maxSuburbConcentration: number;
      maxPostcodeExposure: number;
      targetDeployment: number;
    };
    zoneAllocation: {
      green: number;
      orange: number;
      red: number;
    };
  };
}

// Add presets data
const presets: Record<string, PresetStrategy> = {
  conservative: {
    name: 'Conservative Growth',
    description: 'Focus on stable, low-risk properties in established areas with strong fundamentals. Conservative LTV provides additional buffer against market cycles.',
    targetReturn: 12,
    riskLevel: 'Low',
    marketCycle: {
      phase: 'Stabilization',
      zoneMovement: 'Green zones expanding in established areas',
      outlook: 'Steady appreciation in prime locations',
      exitWindow: {
        optimal: "24-36 months",
        expectedGrowth: "15-20% total appreciation",
        volatilityProfile: "Low volatility, steady growth"
      }
    },
    parameters: {
      loanParameters: {
        minLoanSize: 300000,
        maxLoanSize: 1000000,
        minPropertyValue: 500000,
        maxPropertyValue: 2000000,
        minServiceability: 1.8,
        baseRate: 5.0
      },
      riskParameters: {
        greenZoneLVR: 65,
        orangeZoneLVR: 60,
        redZoneLVR: 55,
        maxSuburbConcentration: 15,
        maxPostcodeExposure: 20,
        targetDeployment: 45000000
      },
      zoneAllocation: {
        green: 90,
        orange: 10,
        red: 0
      }
    }
  },
  balanced: {
    name: 'Balanced Opportunity',
    description: 'Mix of established and growth areas, moderate risk profile with higher return potential. Balanced LTV approach across zones.',
    targetReturn: 18,
    riskLevel: 'Medium',
    marketCycle: {
      phase: 'Late Growth',
      zoneMovement: 'Orange zones transitioning to green',
      outlook: 'Strong growth potential in emerging corridors',
      exitWindow: {
        optimal: "18-24 months",
        expectedGrowth: "25-30% total appreciation",
        volatilityProfile: "Moderate volatility, strong growth potential"
      }
    },
    parameters: {
      loanParameters: {
        minLoanSize: 300000,
        maxLoanSize: 1500000,
        minPropertyValue: 500000,
        maxPropertyValue: 2500000,
        minServiceability: 1.5,
        baseRate: 5.0
      },
      riskParameters: {
        greenZoneLVR: 70,
        orangeZoneLVR: 65,
        redZoneLVR: 60,
        maxSuburbConcentration: 20,
        maxPostcodeExposure: 25,
        targetDeployment: 45000000
      },
      zoneAllocation: {
        green: 70,
        orange: 25,
        red: 5
      }
    }
  },
  highGrowth: {
    name: 'High Growth',
    description: 'Target emerging areas with significant appreciation potential. Higher LTVs in strong growth corridors while maintaining risk controls.',
    targetReturn: 25,
    riskLevel: 'High',
    marketCycle: {
      phase: 'Early Growth',
      zoneMovement: 'Rapid zone improvements expected',
      outlook: 'High appreciation potential in growth corridors',
      exitWindow: {
        optimal: "12-18 months",
        expectedGrowth: "35-40% total appreciation",
        volatilityProfile: "Higher volatility, maximum growth potential"
      }
    },
    parameters: {
      loanParameters: {
        minLoanSize: 300000,
        maxLoanSize: 2000000,
        minPropertyValue: 500000,
        maxPropertyValue: 3000000,
        minServiceability: 1.3,
        baseRate: 5.0
      },
      riskParameters: {
        greenZoneLVR: 75,
        orangeZoneLVR: 70,
        redZoneLVR: 65,
        maxSuburbConcentration: 25,
        maxPostcodeExposure: 30,
        targetDeployment: 45000000
      },
      zoneAllocation: {
        green: 50,
        orange: 35,
        red: 15
      }
    }
  },
  aiRecommended: {
    name: 'AI Recommended',
    description: 'ML-optimized parameters based on current market conditions and risk analytics. Data-driven LTV and zone allocation strategy.',
    targetReturn: 20,
    riskLevel: 'Medium',
    marketCycle: {
      phase: 'Peak Growth',
      zoneMovement: 'Optimal mix of zone transitions',
      outlook: 'ML-identified growth opportunities',
      exitWindow: {
        optimal: "18-24 months",
        expectedGrowth: "30-35% total appreciation",
        volatilityProfile: "ML-optimized risk/growth balance"
      }
    },
    parameters: {
      loanParameters: {
        minLoanSize: 300000,
        maxLoanSize: 1800000,
        minPropertyValue: 500000,
        maxPropertyValue: 3000000,
        minServiceability: 1.6,
        baseRate: 5.0
      },
      riskParameters: {
        greenZoneLVR: 72,
        orangeZoneLVR: 67,
        redZoneLVR: 62,
        maxSuburbConcentration: 18,
        maxPostcodeExposure: 23,
        targetDeployment: 45000000
      },
      zoneAllocation: {
        green: 75,
        orange: 20,
        red: 5
      }
    }
  },
  custom: {
    name: 'Custom',
    description: 'Manually configured parameters for specific requirements. Custom risk settings within standard term structure.',
    targetReturn: 15,
    riskLevel: 'Medium',
    marketCycle: {
      phase: 'Stabilization',
      zoneMovement: 'Green zones expanding in established areas',
      outlook: 'Steady appreciation in prime locations',
      exitWindow: {
        optimal: "24-36 months",
        expectedGrowth: "15-20% total appreciation",
        volatilityProfile: "Low volatility, steady growth"
      }
    },
    parameters: {
      loanParameters: {
        minLoanSize: 500000,
        maxLoanSize: 3000000,
        minPropertyValue: 750000,
        maxPropertyValue: 4000000,
        minServiceability: 1.5,
        baseRate: 9.5
      },
      riskParameters: {
        greenZoneLVR: 70,
        orangeZoneLVR: 65,
        redZoneLVR: 60,
        maxSuburbConcentration: 15,
        maxPostcodeExposure: 25,
        targetDeployment: 45000000
      },
      zoneAllocation: {
        green: 80,
        orange: 15,
        red: 5
      }
    }
  }
};

interface FundInfo {
  name: string;
  size: number;
  startDate: Date;
  targetIRR: number;
  investmentType: string;
  status: 'active' | 'pending' | 'closed';
  deployed: number;
  remaining: number;
  duration: string;
  manager: string;
  strategy: string;
  loanMetrics: {
    totalLoans: number;
    averageLoanSize: number;
    activeLoans: number;
    completedLoans: number;
  };
}

// Update the parameterRecommendations object to consistently point towards AI recommended settings
const parameterRecommendations = {
  loanSize: {
    conservative: {
      value: "Up to $1M",
      impact: "AI models suggest $1.8M optimal",
      reason: "Current data shows optimal returns at $1.8M cap"
    },
    balanced: {
      value: "Up to $1.5M",
      impact: "AI recommends $1.8M cap",
      reason: "ML analysis shows $1.8M as optimal ceiling"
    },
    highGrowth: {
      value: "Up to $2M",
      impact: "AI suggests adjusting to $1.8M",
      reason: "Risk-adjusted returns optimal at $1.8M"
    }
  },
  ltv: {
    conservative: {
      value: "65%",
      impact: "AI suggests 72% optimal",
      reason: "ML models show 72% as optimal LTV point"
    },
    balanced: {
      value: "70%",
      impact: "AI recommends 72%",
      reason: "Data indicates 72% LTV for best returns"
    },
    highGrowth: {
      value: "75%",
      impact: "AI suggests moderating to 72%",
      reason: "Risk analysis shows 72% as optimal point"
    }
  },
  zoneAllocation: {
    conservative: {
      green: "90% current",
      orange: "10% current",
      red: "0% current",
      reason: "AI recommends 75/20/5 split for optimal balance"
    },
    balanced: {
      green: "70% current",
      orange: "25% current",
      red: "5% current",
      reason: "ML suggests 75/20/5 allocation for best returns"
    },
    highGrowth: {
      green: "50% current",
      orange: "35% current",
      red: "15% current",
      reason: "Data shows 75/20/5 as optimal risk-return mix"
    }
  }
};

// Add new interfaces for portfolio impact
interface PortfolioMetrics {
  currentIRR: number;
  forecastedIRR: number;
  averageExitPeriod: number;
  zoneTransitions: {
    orangeToGreen: number;
    redToOrange: number;
  };
  portfolioComposition: {
    greenZone: number;
    orangeZone: number;
    redZone: number;
  };
  riskMetrics: {
    weightedLTV: number;
    concentrationRisk: number;
    marketVolatility: number;
  };
}

// Update the interface for calculation parameters
interface CalculationParams {
  currentPortfolio: {
    size: number;
    deployed: number;
    remaining: number;
    currentIRR: number;
  };
  newSettings: {
    targetIRR: number;
    zoneAllocation: {
      green: number;
      orange: number;
      red: number;
    };
    maxLTV: number;
  };
}

// Fix the calculation utility
const calculatePortfolioImpact = ({
  currentPortfolio,
  newSettings
}: CalculationParams) => {
  const deployedPercentage = (currentPortfolio.deployed / currentPortfolio.size) * 100; // 10%
  const remainingPercentage = (currentPortfolio.remaining / currentPortfolio.size) * 100; // 90%

  const currentIRR = 16.61; // From Fund Dashboard
  const targetIRR = 24.2;   // Future target
  
  // Calculate blended IRR properly
  const blendedIRR = (
    (currentIRR * (deployedPercentage/100)) + 
    (targetIRR * (remainingPercentage/100))
  ).toFixed(1);

  return {
    currentIRR: currentIRR,
    maxPotentialIRR: targetIRR,
    blendedIRR: Number(blendedIRR),
    irrImprovement: (Number(blendedIRR) - currentIRR).toFixed(1),
    portfolioMix: {
      current: { 
        green: 62,    // Based on actual loan distribution
        orange: 38,   // Based on actual loan distribution
        red: 0        // Based on actual loan distribution
      },
      new: {
        green: ((newSettings.zoneAllocation.green * remainingPercentage + 62 * deployedPercentage) / 100).toFixed(1),
        orange: ((newSettings.zoneAllocation.orange * remainingPercentage + 38 * deployedPercentage) / 100).toFixed(1),
        red: ((newSettings.zoneAllocation.red * remainingPercentage + 0 * deployedPercentage) / 100).toFixed(1)
      }
    },
    ltv: {
      current: 29.24,  // Actual weighted average LTV from Fund Dashboard
      new: ((29.24 * deployedPercentage + newSettings.maxLTV * remainingPercentage) / 100).toFixed(1),
      change: ((newSettings.maxLTV - 29.24) * remainingPercentage / 100).toFixed(1)
    },
    deployedPercentage,
    remainingPercentage,
    growth: {
      current: 44.51,  // Actual portfolio growth rate
      projected: 44.51 * (1 + (Number(blendedIRR) - currentIRR) / 100)
    }
  };
};

const FundParameters: React.FC = () => {
  // Use the store for fund parameters
  const { 
    interestRate, maxLoanSize, maxLTV, maxCombinedLTV, targetIRR,
    minPropertyValue, maxPropertyValue, maxSuburbExposure,
    weeklyApprovalTarget, remainingAllocation, zoneAllocation,
    setParameter, setZoneAllocation
  } = useFundParameters();

  // Risk Thresholds
  const [riskThresholds, setRiskThresholds] = useState<RiskThresholds>({
    greenZoneLVR: 80,
    orangeZoneLVR: 75,
    redZoneLVR: 70,
    maxSuburbConcentration: 15,
    maxPostcodeExposure: 25
  });

  // ML Model Parameters
  const [mlParameters, setMLParameters] = useState<MLParameters>({
    confidenceThreshold: 85,
    marketSignalWeight: 40,
    demographicWeight: 30,
    infrastructureWeight: 30,
    modelSensitivity: 75
  });

  // Investment Criteria
  const [investmentCriteria, setInvestmentCriteria] = useState<InvestmentCriteria>({
    minLoanSize: 500000,
    maxLoanSize: 3000000,
    minPropertyValue: 750000,
    maxPropertyValue: 4000000,
    minServiceability: 1.5
  });

  // Auto-Adjustment Settings
  const [autoAdjust, setAutoAdjust] = useState({
    marketCycle: true,
    riskLevels: true,
    concentrationLimits: true
  });

  // Add system health monitoring
  const [systemHealth, setSystemHealth] = useState({
    mlSystem: {
      status: 'optimal',
      uptime: 99.9,
      lastUpdate: new Date(),
      dataPoints: 1200000
    },
    underwriting: {
      status: 'active',
      processedToday: 127,
      averageTime: '3.2s',
      automationRate: 92
    }
  });

  // Add state for selected preset
  const [selectedPreset, setSelectedPreset] = useState<string>('custom');

  // Add function to apply preset
  const applyPreset = (presetKey: string) => {
    const preset = presets[presetKey];
    setSelectedPreset(presetKey);
    
    if (presetKey === 'custom') return;

    // Update all parameters based on preset
    setParameter('maxLoanSize', preset.parameters.loanParameters.maxLoanSize);
    setParameter('maxLTV', preset.parameters.riskParameters.greenZoneLVR);
    setParameter('maxCombinedLTV', preset.parameters.riskParameters.greenZoneLVR + 10);
    setParameter('maxSuburbExposure', preset.parameters.riskParameters.maxSuburbConcentration);
    setParameter('targetIRR', preset.targetReturn);
    setParameter('interestRate', preset.parameters.loanParameters.baseRate || 5.5);
    
    // Update zone allocations
    Object.entries(preset.parameters.zoneAllocation).forEach(([zone, value]) => {
      setZoneAllocation(zone as keyof typeof preset.parameters.zoneAllocation, value);
    });
  };

  // Update the fundInfo state with actual loan data
  const [fundInfo, setFundInfo] = useState<FundInfo>({
    name: "Equihome Fund I",
    size: 50000000,
    startDate: new Date('2024-01-01'),
    targetIRR: 18,
    investmentType: "Single Family Homes",
    status: 'active',
    deployed: 5000000,
    remaining: 45000000,
    duration: "5 years",
    manager: "Equihome Partners",
    strategy: "Conservative Growth",
    loanMetrics: {
      totalLoans: 8,         // Actual number of loans
      averageLoanSize: 625000, // $5M / 8 loans
      activeLoans: 8,
      completedLoans: 0
    }
  });

  // Update the suburb exposure data to match actual portfolio distribution
  const suburbExposure = [
    { 
      name: 'Neutral Bay', 
      exposure: 12.6, // Actual percentage from portfolio
      trend: 'stable',
      value: 630000 // 12.6% of $5M deployed
    },
    { 
      name: 'Bronte', 
      exposure: 9.7,
      trend: 'stable',
      value: 485000
    },
    { 
      name: 'Freshwater', 
      exposure: 15.5,
      trend: 'stable',
      value: 775000
    },
    {
      name: 'Willoughby', 
      exposure: 14.6,
      trend: 'stable',
      value: 730000
    },
    {
      name: 'Pymble', 
      exposure: 12.6,
      trend: 'stable',
      value: 630000
    },
    {
      name: 'Beecroft', 
      exposure: 12.6,
      trend: 'stable',
      value: 630000
    },
    {
      name: 'Mosman', 
      exposure: 9.7,
      trend: 'stable',
      value: 485000
    },
    {
      name: 'Randwick', 
      exposure: 12.6,
      trend: 'stable',
      value: 630000
    }
  ];

  // Update the zone distribution to match actual portfolio
  const currentZoneDistribution = {
    green: 100,    // All suburbs are premium/green zones
    orange: 0,     // No orange zone exposure
    red: 0         // No red zone exposure
  };

  // Update LTV metrics to match actual loans
  const portfolioMetrics = {
    currentLTV: 29.24,        // From Fund Dashboard
    weightedAvgLTV: 29.24,    // From Fund Dashboard
    maxCurrentLTV: 35,        // Based on actual loan data
    minCurrentLTV: 25,        // Based on actual loan data
    totalValue: 27756579,     // Current Portfolio Value from Fund Dashboard
    totalGrowth: 44.51,       // Portfolio Growth Rate from Fund Dashboard
    monthlyIRR: 16.61        // Monthly IRR from Fund Dashboard
  };

  // Add this function near the top of the component
  const handleZoneChange = (zone: 'green' | 'orange' | 'red', value: number) => {
    // Adjust other zones proportionally
    const remaining = 100 - value;
    const otherZones = Object.keys(zoneAllocation).filter(k => k !== zone) as Array<'green' | 'orange' | 'red'>;
    const oldSum = otherZones.reduce((sum, key) => sum + zoneAllocation[key], 0);
    
    otherZones.forEach(key => {
      const newValue = oldSum > 0 ? Math.round((zoneAllocation[key] / oldSum) * remaining) : 0;
      setZoneAllocation(key, newValue);
    });
    
    setZoneAllocation(zone, value);
  };

  // Calculate impact with proper parameter structure
  const impact = calculatePortfolioImpact({
    currentPortfolio: {
      size: fundInfo.size,
      deployed: fundInfo.deployed,
      remaining: fundInfo.remaining,
      currentIRR: 18.5
    },
    newSettings: {
      targetIRR,
      zoneAllocation,
      maxLTV
    }
  });

  return (
    <div className="space-y-6">
      {/* Header with System Status */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Fund Control Center</h2>
            <p className="text-gray-600">Master control for ML/AI and Underwriting systems</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">ML Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Underwriting Active</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">ML Confidence</div>
            <div className="text-2xl font-bold text-green-600">94.3%</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">Risk Score</div>
            <div className="text-2xl font-bold text-blue-600">Low</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">Active Deals</div>
            <div className="text-2xl font-bold">{fundInfo.loanMetrics.totalLoans}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">System Health</div>
            <div className="text-2xl font-bold text-green-600">Optimal</div>
          </div>
        </div>
      </div>

      {/* Main Control Tabs */}
      <Tabs defaultValue="underwriting" className="bg-white rounded-lg shadow-sm p-6">
        <TabsList className="grid grid-cols-4 gap-4 mb-6">
          <TabsTrigger value="underwriting">
            <Shield className="h-4 w-4 mr-2" />
            Underwriting
          </TabsTrigger>
          <TabsTrigger value="ml-controls">
            <Brain className="h-4 w-4 mr-2" />
            ML Controls
          </TabsTrigger>
          <TabsTrigger value="data-config">
            <Database className="h-4 w-4 mr-2" />
            Data Configuration
          </TabsTrigger>
          <TabsTrigger value="system-settings">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="underwriting">
          {/* Fund Overview */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{fundInfo.name}</h2>
                <p className="text-gray-600">Active since {fundInfo.startDate.toLocaleDateString()}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`px-3 py-1 rounded-full text-sm font-medium
                  ${fundInfo.status === 'active' ? 'bg-green-100 text-green-800' : 
                    fundInfo.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'}
                `}>
                  {fundInfo.status.charAt(0).toUpperCase() + fundInfo.status.slice(1)}
                </div>
              </div>
            </div>

            {/* Fund Metrics */}
            <div className="grid grid-cols-4 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600">Fund Size</label>
                <div className="text-2xl font-bold">${(fundInfo.size / 1000000).toFixed(0)}M</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Deployed</label>
                <div className="text-2xl font-bold">${(fundInfo.deployed / 1000000).toFixed(1)}M</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Remaining</label>
                <div className="text-2xl font-bold">${(fundInfo.remaining / 1000000).toFixed(1)}M</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Investment Type</label>
                <div className="text-2xl font-bold">Single Family</div>
              </div>
            </div>

            {/* Target IRR Slider */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">Target IRR</label>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-indigo-600">{targetIRR}%</span>
                  <span className="ml-2 text-sm text-gray-500">target</span>
                </div>
              </div>
              <Slider
                value={[targetIRR]}
                max={30}
                min={10}
                step={0.5}
                onValueChange={([value]) => {
                  setParameter('targetIRR', value);
                  if (selectedPreset === 'aiRecommended') {
                    setSelectedPreset('custom');
                  }
                }}
              />
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>Conservative: 10%</span>
                <span>Aggressive: 30%</span>
              </div>
            </div>
          </div>

          {/* Strategy Presets */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Investment Strategy</h3>
            <div className="grid grid-cols-5 gap-4">
              {Object.entries(presets).map(([key, preset]) => (
                <div
                  key={key}
                  className={`bg-white rounded-lg border-2 p-4 cursor-pointer transition-colors relative
                    ${selectedPreset === key ? 'border-indigo-500' : 'border-gray-200 hover:border-gray-300'}
                    ${key === 'aiRecommended' ? 'ring-2 ring-blue-100' : ''}
                  `}
                  onClick={() => applyPreset(key)}
                >
                  {/* Add Recommended badge for AI preset */}
                  {key === 'aiRecommended' && (
                    <div className="absolute -top-3 -right-3 flex items-center">
                      <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                        <Brain className="h-3 w-3 mr-1" />
                        RECOMMENDED
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {key === 'aiRecommended' && <Brain className="h-4 w-4 text-blue-600 mr-2" />}
                      <h3 className={`font-semibold ${key === 'aiRecommended' ? 'text-blue-900' : ''}`}>
                        {preset.name}
                      </h3>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium
                      ${selectedPreset === key ? 
                        key === 'aiRecommended' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700' 
                        : 'bg-gray-100 text-gray-700'}
                    `}>
                      {selectedPreset === key ? 'Active' : 'Select'}
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-2 ${key === 'aiRecommended' ? 'text-blue-700' : 'text-gray-600'}`}>
                    {preset.description}
                  </p>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Target Return</span>
                      <span className="font-medium">{preset.targetReturn}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level</span>
                      <span className={`font-medium ${
                        preset.riskLevel === 'Low' ? 'text-green-600' :
                        preset.riskLevel === 'Medium' ? 'text-orange-600' :
                        'text-red-600'
                      }`}>{preset.riskLevel}</span>
                    </div>
                    <div className="flex justify-between group relative">
                      <span>Market Phase</span>
                      <span className="font-medium text-indigo-600">{preset.marketCycle.phase}</span>
                      <div className="absolute bottom-full left-0 w-64 bg-gray-800 text-white text-xs rounded p-2 mb-2 hidden group-hover:block">
                        <div className="font-medium mb-1">{preset.marketCycle.phase}</div>
                        <div>{preset.marketCycle.outlook}</div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Optimal Exit Window</span>
                        <span className="text-sm text-indigo-600">{preset.marketCycle.exitWindow.optimal}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-gray-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Expected Growth: {preset.marketCycle.exitWindow.expectedGrowth}
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <Activity className="h-3 w-3 mr-1" />
                          {preset.marketCycle.exitWindow.volatilityProfile}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add AI confidence indicator for AI preset */}
                  {key === 'aiRecommended' && (
                    <div className="mt-3 pt-3 border-t border-blue-100">
                      <div className="flex items-center justify-between text-xs text-blue-700">
                        <span>AI Confidence</span>
                        <span className="font-medium">94.3%</span>
                      </div>
                      <div className="mt-1 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '94.3%' }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Parameters Grid */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            {/* Left Column - Combined Parameters */}
            <div className="space-y-6">
              {/* Loan Parameters Card */}
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <DollarSign className="h-5 w-5 text-indigo-600 mr-2" />
                  Loan Parameters
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Maximum Loan Size</label>
                      <span className="text-sm text-indigo-600 font-medium">
                        ${(maxLoanSize / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <Slider
                      value={[maxLoanSize]}
                      max={2000000}
                      min={300000}
                      step={100000}
                      onValueChange={([value]) => setParameter('maxLoanSize', value)}
                    />
                    <div className="mt-1 text-xs text-gray-600">
                      {selectedPreset !== 'custom' && selectedPreset !== 'aiRecommended' && (
                        <>
                          <span className="font-medium">AI Analysis: </span>
                          {parameterRecommendations.loanSize[selectedPreset as keyof typeof parameterRecommendations.loanSize].value}
                          <span className="block mt-1">
                            {parameterRecommendations.loanSize[selectedPreset as keyof typeof parameterRecommendations.loanSize].reason}
                            <span className="text-green-600 ml-1">
                              ({parameterRecommendations.loanSize[selectedPreset as keyof typeof parameterRecommendations.loanSize].impact})
                            </span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Interest Rate</label>
                      <span className="text-sm text-indigo-600 font-medium">5.0%</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Fixed at 5.0% as per current fund strategy
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Parameters Card */}
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <Shield className="h-5 w-5 text-indigo-600 mr-2" />
                  Risk Parameters
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Maximum LTV</label>
                      <span className="text-sm text-indigo-600 font-medium">{maxLTV}%</span>
                    </div>
                    <Slider
                      value={[maxLTV]}
                      max={75}
                      min={50}
                      step={5}
                      onValueChange={([value]) => setParameter('maxLTV', value)}
                    />
                    <div className="mt-1 text-xs text-gray-600">
                      {selectedPreset !== 'custom' && selectedPreset !== 'aiRecommended' && parameterRecommendations.ltv[selectedPreset as keyof typeof parameterRecommendations.ltv] && (
                        <>
                          <span className="font-medium">AI Analysis: </span>
                          {parameterRecommendations.ltv[selectedPreset as keyof typeof parameterRecommendations.ltv].value}
                          <span className="block mt-1">
                            {parameterRecommendations.ltv[selectedPreset as keyof typeof parameterRecommendations.ltv].reason}
                            <span className="text-green-600 ml-1">
                              ({parameterRecommendations.ltv[selectedPreset as keyof typeof parameterRecommendations.ltv].impact})
                            </span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Maximum Combined LTV</label>
                      <span className="text-sm text-indigo-600 font-medium">{maxCombinedLTV}%</span>
                    </div>
                    <Slider
                      value={[maxCombinedLTV]}
                      max={75}
                      min={50}
                      step={5}
                      onValueChange={([value]) => setParameter('maxCombinedLTV', value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Zone Allocation and Metrics */}
            <div className="space-y-6">
              {/* Zone Allocation Card */}
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <Target className="h-5 w-5 text-indigo-600 mr-2" />
                  Zone Allocation
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-green-700">Green Zone</label>
                      <span className="text-sm text-green-700 font-medium">{zoneAllocation.green}%</span>
                    </div>
                    <Slider
                      value={[zoneAllocation.green]}
                      max={100}
                      min={0}
                      step={5}
                      className="bg-green-100"
                      onValueChange={([value]) => handleZoneChange('green', value)}
                    />
                    <div className="mt-1 text-xs text-gray-600">
                      {selectedPreset !== 'custom' && selectedPreset !== 'aiRecommended' && parameterRecommendations.zoneAllocation[selectedPreset as keyof typeof parameterRecommendations.zoneAllocation] && (
                        <>
                          <span className="font-medium">ML Recommendation: </span>
                          <span className="block mt-1">
                            {parameterRecommendations.zoneAllocation[selectedPreset as keyof typeof parameterRecommendations.zoneAllocation].reason}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-orange-700">Orange Zone</label>
                      <span className="text-sm text-orange-700 font-medium">{zoneAllocation.orange}%</span>
                    </div>
                    <Slider
                      value={[zoneAllocation.orange]}
                      max={100}
                      min={0}
                      step={5}
                      className="bg-orange-100"
                      onValueChange={([value]) => handleZoneChange('orange', value)}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-red-700">Red Zone</label>
                      <span className="text-sm text-red-700 font-medium">{zoneAllocation.red}%</span>
                    </div>
                    <Slider
                      value={[zoneAllocation.red]}
                      max={100}
                      min={0}
                      step={5}
                      className="bg-red-100"
                      onValueChange={([value]) => handleZoneChange('red', value)}
                    />
                  </div>
                </div>
              </div>

              {/* Fund Metrics Card */}
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <BarChart3 className="h-5 w-5 text-indigo-600 mr-2" />
                  Fund Metrics
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm text-gray-600">Deployed</label>
                    <div className="text-xl font-bold text-indigo-600">
                      ${(fundInfo.deployed / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Remaining</label>
                    <div className="text-xl font-bold text-indigo-600">
                      ${(fundInfo.remaining / 1000000).toFixed(1)}M
                    </div>
                  </div>
                </div>

                {/* Add Loan Metrics Section */}
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Loan Portfolio</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Active Loans</label>
                      <div className="text-lg font-bold text-indigo-600">
                        {fundInfo.loanMetrics.totalLoans}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Avg. Loan Size</label>
                      <div className="text-lg font-bold text-indigo-600">
                        ${(fundInfo.loanMetrics.averageLoanSize / 1000).toFixed(1)}K
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Total Loans</label>
                      <div className="text-lg font-bold text-indigo-600">
                        {fundInfo.loanMetrics.totalLoans}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Completed</label>
                      <div className="text-lg font-bold text-indigo-600">
                        {fundInfo.loanMetrics.completedLoans}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add visual representation */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Deployment Progress</span>
                    <span>{((fundInfo.deployed / fundInfo.size) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${(fundInfo.deployed / fundInfo.size) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations Panel */}
          <div className="mt-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Brain className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-blue-900">AI Recommendations</h3>
                </div>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => applyPreset('aiRecommended')}
                >
                  Apply AI Settings
                </button>
              </div>
              
              {selectedPreset === 'aiRecommended' ? (
                <div className="text-sm text-blue-700">
                  <p className="mb-2">ML-Optimized Market Positioning:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-green-600" />
                      Optimal exit window: {presets['aiRecommended'].marketCycle.exitWindow.optimal}
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                      Expected appreciation: {presets['aiRecommended'].marketCycle.exitWindow.expectedGrowth}
                    </li>
                    <li className="flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-green-600" />
                      {presets['aiRecommended'].marketCycle.exitWindow.volatilityProfile}
                    </li>
                  </ul>
                </div>
              ) : (
                // Existing recommendations grid with updated content pointing to AI settings
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-800">Risk Optimization</h4>
                    <ul className="space-y-1 text-sm text-blue-700">
                      <li className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        AI suggests optimal LTV of 72%
                      </li>
                      <li className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Current settings sub-optimal
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-800">Portfolio Enhancement</h4>
                    <ul className="space-y-1 text-sm text-blue-700">
                      <li className="flex items-center">
                        <Target className="h-4 w-4 mr-2" />
                        ML recommends 75/20/5 zone split
                      </li>
                      <li className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        $1.8M loan size cap optimal
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-800">Return Potential</h4>
                    <ul className="space-y-1 text-sm text-blue-700">
                      <li className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        +1.5% IRR with AI settings
                      </li>
                      <li className="flex items-center">
                        <Brain className="h-4 w-4 mr-2" />
                        ML-optimized risk/return
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Add new interfaces for portfolio impact */}
          <div className="mt-6">
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <BarChart3 className="h-6 w-6 text-indigo-600 mr-2" />
                  <h3 className="text-xl font-semibold">Portfolio Impact Analysis</h3>
                </div>
                <div className="text-sm text-gray-600">
                  Based on remaining allocation: ${(fundInfo.remaining / 1000000).toFixed(1)}M (10% of fund)
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {/* Return Projections - Keep only one version */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">Return Projections</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between mb-3">
                      <span className="text-sm text-gray-600">Current Portfolio IRR</span>
                      <span className="font-medium">16.61%</span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-sm text-gray-600">Future Deployment</span>
                      <span className="font-medium text-green-600">{presets[selectedPreset].targetReturn}%</span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-sm text-gray-600">Blended Result</span>
                      <span className="font-medium text-green-600">
                        {((16.61 * 0.1) + (presets[selectedPreset].targetReturn * 0.9)).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all duration-500" 
                        style={{ width: `${((16.61 * 0.1) + (presets[selectedPreset].targetReturn * 0.9)) / 25 * 100}%` }}
                      />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Based on {presets[selectedPreset].name} strategy with 90% remaining allocation
                    </div>
                  </div>

                  {/* Replace the Exit Timing Analysis with Portfolio Strategy Insights */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-2">Strategy Insights</div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Market Focus</span>
                          <span className="font-medium">
                            {presets[selectedPreset].marketCycle.phase}
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }} />
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {presets[selectedPreset].marketCycle.outlook}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Growth Potential</span>
                          <span className="font-medium text-green-600">
                            {presets[selectedPreset].marketCycle.zoneMovement}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600">
                          Based on traffic light analysis and market data
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-200">
                        <div className="text-xs text-gray-600">
                          <span className="font-medium">Key Strategy Points:</span>
                          <ul className="mt-1 space-y-1">
                            <li>• {presets[selectedPreset].riskLevel} risk profile</li>
                            <li>• Focus on {presets[selectedPreset].parameters.zoneAllocation.green}% green zone allocation</li>
                            <li>• Target IRR: {presets[selectedPreset].targetReturn}%</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Zone Transition Forecast - Marginal Impact */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">Portfolio Composition Impact</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-3">Initial Portfolio Mix (10% Deployed)</div>
                    <div className="flex h-4 rounded-full overflow-hidden mb-2">
                      <div className="bg-green-500" style={{ width: '100%' }} /> {/* Updated to 100% green */}
                      <div className="bg-orange-500" style={{ width: '0%' }} />   {/* No orange zone exposure */}
                      <div className="bg-red-500" style={{ width: '0%' }} />      {/* No red zone exposure */}
                    </div>
                    <div className="text-sm text-gray-600 mt-4 mb-3">Projected Final Mix</div>
                    <div className="flex h-4 rounded-full overflow-hidden">
                      <div className="bg-green-500" style={{ width: `${impact.portfolioMix.new.green}%` }} />
                      <div className="bg-orange-500" style={{ width: `${impact.portfolioMix.new.orange}%` }} />
                      <div className="bg-red-500" style={{ width: `${impact.portfolioMix.new.red}%` }} />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Parameter changes will significantly shape final portfolio composition
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-2">New Allocation Strategy</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Target Green Zone</span>
                        <span className="font-medium text-green-600">75%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Achievable Shift</span>
                        <span className="font-medium">+1% (limited by allocation)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk Analysis - Minimal Change */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">Portfolio Risk Impact</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Overall Portfolio LTV</span>
                          <div>
                            <span className="font-medium text-gray-600">{impact.ltv.current}%</span>
                            <span className="text-xs text-gray-500 ml-1">→</span>
                            <span className="font-medium text-green-600 ml-1">{impact.ltv.new}%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${impact.ltv.new}%` }} />
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          Limited LTV impact due to 10% allocation
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-2">Risk Change Potential</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Concentration Risk</span>
                        <span className="text-xs font-medium text-green-600">Minimal Change</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Portfolio Volatility</span>
                        <span className="text-xs font-medium text-green-600">±0.2%</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Parameter changes have limited portfolio-wide impact
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add a note about limited impact */}
              <div className="mt-6 bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span className="font-medium">High Impact Potential:</span>
                </div>
                <p className="mt-1">
                  With 90% of the fund ($45M) still available for deployment, current parameter adjustments 
                  will have a significant impact on the final portfolio composition and returns. These settings 
                  will guide the majority of our future investments.
                </p>
              </div>
            </div>
          </div>

          {/* Geographic Concentration Analysis */}
          <div className="bg-white rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <Target className="h-5 w-5 text-indigo-600 mr-2" />
              Geographic Concentration Analysis
            </h3>
            
            <div className="grid grid-cols-3 gap-6">
              {/* Current Exposure */}
              <div>
                <h4 className="text-sm font-medium mb-3">Top Suburb Exposure</h4>
                <div className="space-y-3">
                  {suburbExposure.map(suburb => (
                    <div key={suburb.name} className="bg-gray-50 rounded p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{suburb.name}</div>
                          <div className="text-xs text-gray-600">
                            {suburb.exposure}% of portfolio
                          </div>
                        </div>
                        <div className={`text-xs ${
                          suburb.trend === 'stable' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {suburb.trend === 'stable' ? '→ Stable' : '→ Emerging'}
                        </div>
                      </div>
                      <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            suburb.exposure > 10 ? 'bg-orange-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(suburb.exposure / 15) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concentration Limits */}
              <div>
                <h4 className="text-sm font-medium mb-3">Concentration Controls</h4>
                <div className="bg-gray-50 rounded p-4 space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Max Suburb Exposure</span>
                      <span className="font-medium">{maxSuburbExposure}%</span>
                    </div>
                    <Slider
                      value={[maxSuburbExposure]}
                      max={25}
                      min={10}
                      step={5}
                      onValueChange={([value]) => setParameter('maxSuburbExposure', value)}
                    />
                    <div className="mt-1 text-xs text-gray-600">
                      Recommended: 15% for optimal diversification
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm font-medium mb-2">Zone Distribution</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Green Zones</span>
                        <span>{currentZoneDistribution.green}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Orange Zones</span>
                        <span>{currentZoneDistribution.orange}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Red Zones</span>
                        <span>{currentZoneDistribution.red}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Analysis */}
              <div>
                <h4 className="text-sm font-medium mb-3">Geographic Risk Analysis</h4>
                <div className="bg-gray-50 rounded p-4 space-y-4">
                  <div>
                    <div className="text-sm mb-2">Concentration Risk Level</div>
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl font-bold text-green-600">Low</div>
                      <div className="text-xs text-gray-600">
                        Based on current exposure
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm mb-2">Risk Factors</div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Geographic Spread</span>
                          <span className="text-green-600">Optimal</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Zone Balance</span>
                          <span className="text-green-600">Well Distributed</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-600">
                      ML Recommendation: Current geographic distribution shows concentration 
                      in premium North Shore and Eastern Suburbs locations. With $45M remaining allocation, recommend:
                      1. Maximum 15% exposure per suburb going forward
                      2. Maintain focus on premium suburbs while considering emerging areas
                      3. Consider selective opportunities in high-potential orange zones for higher returns
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ml-controls">
          <div className="grid grid-cols-2 gap-6">
            {/* ML Model Parameters */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center">
                <Brain className="h-5 w-5 text-indigo-600 mr-2" />
                Model Parameters
              </h3>
              
              {/* Confidence Controls */}
              <div>
                <label className="text-sm font-medium">Confidence Threshold</label>
                <Slider 
                  value={[mlParameters.confidenceThreshold]}
                  max={100}
                  min={50}
                  step={1}
                  onValueChange={([value]: number[]) => setMLParameters({
                    ...mlParameters,
                    confidenceThreshold: value
                  })}
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{mlParameters.confidenceThreshold}%</span>
                  <span>Recommended: 85%</span>
                </div>
              </div>

              {/* Weight Controls */}
              <div>
                <label className="text-sm font-medium">Signal Weights</label>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Market Signals</span>
                      <span>{mlParameters.marketSignalWeight}%</span>
                    </div>
                    <Slider
                      value={[mlParameters.marketSignalWeight]}
                      max={100}
                      step={5}
                      onValueChange={(values: number[]) => setMLParameters({
                        ...mlParameters,
                        marketSignalWeight: values[0]
                      })}
                    />
                  </div>
                  {/* Similar sliders for demographic and infrastructure weights */}
                </div>
              </div>

              {/* Add real-time monitoring */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h4 className="font-medium">Real-time Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Processing Rate</div>
                    <div className="font-medium">1,243/hour</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Response Time</div>
                    <div className="font-medium">234ms</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Model Version</div>
                    <div className="font-medium">3.2.1</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Last Update</div>
                    <div className="font-medium">2m ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ML System Controls */}
            <div className="space-y-6">
              {/* Add performance metrics */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h4 className="font-medium">Performance Metrics</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Accuracy</span>
                      <span className="font-medium">94.3%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '94.3%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Precision</span>
                      <span className="font-medium">92.8%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '92.8%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="data-config">
          <div className="grid grid-cols-2 gap-6">
            {/* Data Sources */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center">
                <Database className="h-5 w-5 text-indigo-600 mr-2" />
                Data Sources
              </h3>

              {/* Data Integration Status */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">PropTrack Integration</p>
                    <p className="text-sm text-gray-600">Property data and analytics</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-green-600">Connected</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">CoreLogic Feed</p>
                    <p className="text-sm text-gray-600">Market analytics</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-green-600">Connected</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">ABS Data</p>
                    <p className="text-sm text-gray-600">Demographic insights</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-green-600">Connected</span>
                  </div>
                </div>
              </div>

              {/* Data Quality Metrics */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h4 className="font-medium">Data Quality Metrics</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Completeness</span>
                      <span className="font-medium">98.7%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '98.7%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Accuracy</span>
                      <span className="font-medium">99.2%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '99.2%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Update Settings */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center">
                <RefreshCw className="h-5 w-5 text-indigo-600 mr-2" />
                Update Settings
              </h3>

              {/* Update Frequency */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Real-time Updates</p>
                    <p className="text-sm text-gray-600">Live data processing</p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Batch Processing</p>
                    <p className="text-sm text-gray-600">Daily data aggregation</p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Historical Analysis</p>
                    <p className="text-sm text-gray-600">Weekly trend analysis</p>
                  </div>
                  <Switch checked={true} />
                </div>
              </div>

              {/* Processing Stats */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h4 className="font-medium">Processing Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Processing Rate</div>
                    <div className="font-medium">1,243/hour</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Last Update</div>
                    <div className="font-medium">2m ago</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Data Points</div>
                    <div className="font-medium">1.2M</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                    <div className="font-medium">99.9%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="system-settings">
          <div className="grid grid-cols-2 gap-6">
            {/* System Configuration */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center">
                <Settings className="h-5 w-5 text-indigo-600 mr-2" />
                System Configuration
              </h3>

              {/* Performance Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">High Performance Mode</p>
                    <p className="text-sm text-gray-600">Optimize for speed</p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Debug Mode</p>
                    <p className="text-sm text-gray-600">Enhanced logging</p>
                  </div>
                  <Switch checked={false} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto Recovery</p>
                    <p className="text-sm text-gray-600">Self-healing system</p>
                  </div>
                  <Switch checked={true} />
                </div>
              </div>

              {/* System Health */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h4 className="font-medium">System Health</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">CPU Usage</div>
                    <div className="font-medium">23%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Memory</div>
                    <div className="font-medium">45%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Response Time</div>
                    <div className="font-medium">234ms</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Uptime</div>
                    <div className="font-medium">99.9%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monitoring & Alerts */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center">
                <Activity className="h-5 w-5 text-indigo-600 mr-2" />
                Monitoring & Alerts
              </h3>

              {/* Alert Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Alerts</p>
                    <p className="text-sm text-gray-600">Critical notifications</p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Performance Alerts</p>
                    <p className="text-sm text-gray-600">Degradation warnings</p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Quality Alerts</p>
                    <p className="text-sm text-gray-600">Validation issues</p>
                  </div>
                  <Switch checked={true} />
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h4 className="font-medium">Recent Alerts</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Data quality threshold met</span>
                    <span className="text-green-600">2m ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">System update completed</span>
                    <span className="text-green-600">1h ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Performance optimization</span>
                    <span className="text-green-600">3h ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Panel */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="font-semibold">System Changes</h3>
            <p className="text-sm text-gray-600">3 pending changes to be applied</p>
          </div>
          <div className="space-x-4">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
              Reset
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundParameters;
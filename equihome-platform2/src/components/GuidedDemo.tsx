import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Shield, Target, BarChart2, ArrowRight, ArrowLeft, Zap, LineChart, Settings, GitBranch, Search, Users, TrendingUp, Cog, Home } from 'lucide-react';
import html2canvas from 'html2canvas';
import FundParameters from './cio/FundParameters';
import TrafficLightZones from './cio/TrafficLightZones';
import Pipeline from './Pipeline';
import StrategyControls from './demo/StrategyControls';
import ZoneMapVisualization from './demo/ZoneMapVisualization';
import SydneyMap from './demo/SydneyMap';
import Map, { Source, Layer, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface DemoSlide {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  visual: {
    type: 'flow-diagram' | 'chart' | 'zone-map' | 'process' | 'screenshot';
    config: VisualConfig;
  };
  route: string;
  theme: 'blue' | 'green' | 'purple' | 'orange';
}

interface VisualConfig {
  animate: boolean;
  component?: 'FundParameters' | 'TrafficLightZones' | 'Pipeline' | 'Portfolio' | 'PropTrackDemo' | 'CIODashboard' | 'FundPresets' | 'SydneyZones' | 'UnderwritingOutput' | 'DataProcessing' | 'ScenarioTesting' | 'Portfolio' | 'PortfolioAnalytics' | 'ImpactMetrics';
  chartType?: 'hub' | 'bar' | 'line';
  steps?: Array<{
    title: string;
    icon: string;
    description: string;
  }>;
  data?: {
    modules?: Array<{
      id: string;
      title: string;
      icon: string;
      color: string;
      description: string;
    }>;
    metrics?: Array<{  // Add this
      category: string;
      improvements: Array<{
        label: string;
        value?: string;
        from?: string;
        to?: string;
        reduction?: string;
      }>;
    }>;
    presets?: Array<{
      name: string;
      color: string;
      description: string;
      settings: {
        targetIRR: string;
        maxLTV: string;
        riskProfile: string;
        volatility: string;
        investmentHorizon: string;
        zoneAllocation: {
          premium: string;
          growth: string;
          monitoring: string;
        };
        keyFeatures: string[];
      };
    }>;
    zones?: Array<{
      name: string;
      type: string;
      color: string;
      metrics?: {
        growth: string;
        risk: string;
        confidence: string;
      };
    }>;
    steps?: Array<{
      title: string;
      icon: string;
      description: string;
    }>;
    title?: string;
    center?: {
      title: string;
      icon: string;
    };
    scenarios?: Array<{
      name: string;
      irr: string;
      risk: string;
      confidence: string;
      color: string;
      description: string;
      settings: {
        maxLTV: string;
      };
      zoneAllocation: {
        premium: string;
        growth: string;
        monitoring: string;
      };
      keyFeatures: string[];
    }>;
  };
  colors?: string[];
  imagePath?: string;
  description?: string;
  showSection?: string;
  cropTop?: boolean;
  showControls?: boolean;
}

// Add screenshot paths
const screenshots = {
  cio: {
    dashboard: '/screenshots/cio-dashboard.png',
    fundParameters: '/screenshots/fund-parameters.png',
    trafficLight: '/screenshots/traffic-light.png',
    suburbTransition: '/screenshots/suburb-transition.png'
  },
  underwriting: {
    process: '/screenshots/underwriting-process.png',
    analysis: '/screenshots/risk-analysis.png',
    results: '/screenshots/underwriting-results.png'
  },
  pipeline: {
    overview: '/screenshots/pipeline-overview.png',
    analytics: '/screenshots/pipeline-analytics.png',
    dealflow: '/screenshots/pipeline-dealflow.png'
  },
  portfolio: {
    overview: '/screenshots/portfolio-overview.png',
    analytics: '/screenshots/portfolio-analytics.png',
    metrics: '/screenshots/portfolio-metrics.png'
  }
};

const demoSlides: DemoSlide[] = [
  {
    id: 'intro',
    title: 'Welcome to Equihome Platform',
    subtitle: 'The Future of Property Investment Management',
    content: (
      <div className="col-span-2 px-8">
        <p className="text-lg text-gray-700 text-center mb-8">
          Equihome revolutionizes residential property investment by combining artificial intelligence 
          with institutional-grade portfolio management:
        </p>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white/50 p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <Brain className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="font-semibold text-lg">AI-Powered Intelligence</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li>• 5-minute automated underwriting</li>
              <li>• PropTrack AVM integration</li>
              <li>• Predictive market analysis</li>
              <li>• Risk-optimized deal selection</li>
            </ul>
          </div>
          
          <div className="bg-white/50 p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <Target className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="font-semibold text-lg">Portfolio Excellence</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li>• Traffic light zoning system</li>
              <li>• Geographic risk management</li>
              <li>• Return optimization</li>
              <li>• Strategic suburb selection</li>
            </ul>
          </div>
          
          <div className="bg-white/50 p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <LineChart className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="font-semibold text-lg">Investment Strategy Control</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li>• Full control over risk parameters</li>
              <li>• Strategic return targeting</li>
              <li>• Real-time strategy adjustment</li>
              <li>• Dynamic portfolio rebalancing</li>
            </ul>
          </div>
          
          <div className="bg-white/50 p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <Settings className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="font-semibold text-lg">Operational Excellence</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li>• End-to-end deal management</li>
              <li>• Pipeline optimization</li>
              <li>• Automated due diligence</li>
              <li>• Compliance monitoring</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-blue-50/50 p-4 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            <strong>Why did we create this platform?</strong> We built this proprietary system to transform our 
            internal investment operations, reducing our analysis process from 30 days to 5 minutes. 
            By combining institutional-grade technology with AI, we've created a system that maximizes 
            our returns while maintaining strict risk controls across our Australian residential property 
            portfolio. This platform represents our commitment to data-driven decision making and 
            operational excellence.
          </p>
        </div>
      </div>
    ),
    visual: {
      type: 'flow-diagram',
      config: {
        animate: true,
        steps: [
          {
            title: 'Market Analysis',
            icon: 'Search',
            description: 'AI-powered market screening'
          },
          {
            title: 'Risk Assessment',
            icon: 'Shield',
            description: 'Traffic light zoning system'
          },
          {
            title: 'Portfolio Management',
            icon: 'BarChart',
            description: 'Dynamic optimization'
          }
        ]
      }
    },
    route: '/welcome',
    theme: 'blue'
  },

  {
    id: 'data-sources',
    title: 'Enterprise Data Integration',
    subtitle: 'Multi-Source Market Intelligence Platform',
    content: (
      <div className="space-y-6">
        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Comprehensive Data Architecture
          </h3>
          <p className="text-gray-600">
            Our ML engine integrates Australia's leading property data providers, processing over 
            30 million daily data points to deliver unbiased, institutional-grade market intelligence 
            across every suburb.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">PropTrack Enterprise</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Property Data</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Real-time valuations</li>
                      <li>• Listing analytics</li>
                      <li>• Buyer demand metrics</li>
                      <li>• Market sentiment</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Coverage</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 12M+ properties</li>
                      <li>• 40+ year history</li>
                      <li>• Daily updates</li>
                      <li>• 98% accuracy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <LineChart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">CoreLogic Analytics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Market Metrics</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Sales histories</li>
                      <li>• Rental yields</li>
                      <li>• Suburb trends</li>
                      <li>• Market cycles</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Risk Analysis</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Volatility metrics</li>
                      <li>• Market liquidity</li>
                      <li>• Price stability</li>
                      <li>• Growth patterns</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <BarChart2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Government Data (ABS)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Demographics</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Population growth</li>
                      <li>• Income statistics</li>
                      <li>• Employment data</li>
                      <li>• Age distribution</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Economic</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Business growth</li>
                      <li>• Local GDP metrics</li>
                      <li>• Industry trends</li>
                      <li>• Economic health</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Infrastructure & Planning</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Development</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Council DA data</li>
                      <li>• Zoning changes</li>
                      <li>• Major projects</li>
                      <li>• Urban planning</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Transport</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Infrastructure plans</li>
                      <li>• Transport projects</li>
                      <li>• Accessibility scores</li>
                      <li>• Network changes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    visual: {
      type: 'chart',
      config: {
        animate: true,
        component: 'DataProcessing',
        data: {
          title: 'ML Data Processing Pipeline',
          steps: [
            {
              title: 'Data Integration',
              icon: 'Brain',
              description: 'Real-time data ingestion from multiple sources'
            },
            {
              title: 'Bias Removal',
              icon: 'Shield',
              description: 'ML algorithms detect and correct data anomalies'
            },
            {
              title: 'Market Analysis',
              icon: 'LineChart',
              description: 'Deep learning models identify patterns and trends'
            },
            {
              title: 'Risk Assessment',
              icon: 'Target',
              description: 'Multi-factor risk scoring and classification'
            }
          ]
        }
      }
    },
    route: '/data',
    theme: 'blue'
  },

  {
    id: 'cio-overview',
    title: 'CIO Dashboard',
    subtitle: 'Central Command for Investment Strategy',
    content: (
      <div className="space-y-6">
        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Institutional-Grade Investment Control
          </h3>
          <p className="text-gray-600 mb-4">
            Our proprietary CIO Dashboard represents the culmination of our investment expertise, 
            combining institutional-grade controls with advanced AI technology. This central command 
            system powers our entire investment operation, ensuring precision and consistency across 
            our portfolio management process.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="bg-white/80 p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-1">
                  Advanced Strategy Controls
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  Our sophisticated investment framework allows precise control over capital allocation, 
                  risk parameters, and return targets. The system continuously optimizes our portfolio 
                  strategy based on real-time market conditions and our strict investment criteria.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-1">
                  Systematic Risk Management
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  Our proprietary traffic light system implements institutional-grade risk management 
                  across our portfolio. This systematic approach ensures consistent evaluation of 
                  opportunities while maintaining strict compliance with our investment mandate.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-1">
                  ML-Powered Intelligence
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  Our advanced machine learning systems analyze thousands of data points to power 
                  our investment decisions. This proprietary technology enables us to identify 
                  opportunities and optimize returns while maintaining institutional-grade risk controls.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-pink-50 rounded-lg">
                <BarChart2 className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-1">
                  Dynamic Portfolio Analytics
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  Our real-time analytics platform provides comprehensive oversight of portfolio 
                  performance and risk exposure. This enables proactive strategy adjustments and 
                  ensures alignment with our investment objectives at all times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    visual: {
      type: 'chart',
      config: {
        animate: true,
        component: 'CIODashboard',
        data: {
          modules: [
            {
              id: 'fund-parameters',
              title: 'Fund Parameters',
              icon: 'Settings',
              color: '#4F46E5',
              description: 'Adjust Capital Allocation Guidelines'
            },
            {
              id: 'traffic-light',
              title: 'Traffic Light Zones',
              icon: 'Target',
              color: '#10B981',
              description: 'Configure Risk/Return Criteria'
            },
            {
              id: 'underwriting',
              title: 'Underwriting',
              icon: 'Brain',
              color: '#8B5CF6',
              description: 'Set Deal Assessment Guidelines'
            },
            {
              id: 'portfolio',
              title: 'Portfolio',
              icon: 'BarChart',
              color: '#EC4899',
              description: 'Dynamic Strategy Adjustments'
            }
          ]
        }
      }
    },
    route: '/cio',
    theme: 'blue'
  },

  {
    id: 'investment-zones',
    title: 'Suburb-Level Intelligence',
    subtitle: 'Comprehensive Analysis Across 650+ Sydney Suburbs',
    content: (
      <div className="space-y-6">
        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Hyper-Local Market Intelligence
          </h3>
          <p className="text-gray-600">
            Our AI engine continuously analyzes over 300 data points across all 650+ Sydney suburbs, 
            providing granular insights and predictions at unprecedented detail. Each suburb is 
            monitored in real-time, ensuring our investment decisions are based on the most 
            current market dynamics.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Suburb-Level Analysis</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Local Metrics</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Property values</li>
                      <li>• Sales patterns</li>
                      <li>• Rental dynamics</li>
                      <li>• Stock levels</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Growth Indicators</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Demographic shifts</li>
                      <li>• Local employment</li>
                      <li>• Development activity</li>
                      <li>• Business growth</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Predictive Analytics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">12-Month Forecast</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Price movements</li>
                      <li>• Rental growth</li>
                      <li>• Supply changes</li>
                      <li>• Demand trends</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">5-Year Projections</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Growth corridors</li>
                      <li>• Infrastructure impact</li>
                      <li>• Gentrification patterns</li>
                      <li>• Value uplift potential</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <LineChart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Competitive Advantage</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Data Coverage</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 650+ suburbs</li>
                      <li>• 300+ data points</li>
                      <li>• 15-year history</li>
                      <li>• Real-time updates</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">ML Capabilities</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 92% accuracy rate</li>
                      <li>• Daily recalibration</li>
                      <li>• Pattern recognition</li>
                      <li>• Anomaly detection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    visual: {
      type: 'zone-map',
      config: {
        animate: true,
        component: 'SydneyZones',
        data: {
          title: 'Sydney Metropolitan Area',
          zones: [
            {
              name: 'Northern Beaches',
              type: 'premium',
              color: '#22C55E',
              metrics: {
                growth: '6-8%',
                risk: 'Low',
                confidence: '92%'
              }
            },
            {
              name: 'Eastern Suburbs',
              type: 'premium',
              color: '#22C55E',
              metrics: {
                growth: '5-7%',
                risk: 'Low',
                confidence: '94%'
              }
            },
            {
              name: 'Inner West',
              type: 'growth',
              color: '#F97316',
              metrics: {
                growth: '8-12%',
                risk: 'Medium',
                confidence: '87%'
              }
            },
            {
              name: 'South West',
              type: 'monitoring',
              color: '#EF4444',
              metrics: {
                growth: '10-15%',
                risk: 'High',
                confidence: '82%'
              }
            }
          ]
        }
      }
    },
    route: '/cio',
    theme: 'green'
  },

  {
    id: 'fund-parameters',
    title: 'Fund Strategy Configuration',
    subtitle: 'Complete Control Over Risk and Return Parameters',
    content: (
      <div className="space-y-6">
        <p className="text-lg text-gray-700">
          Our ML-optimized strategy provides unprecedented control over every aspect of our investment approach:
        </p>
        <div className="space-y-4">
          <div className="bg-white/50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Target className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-semibold">Dynamic Return Optimization</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>• ML-driven IRR targeting (15-28%)</li>
              <li>• Real-time portfolio rebalancing</li>
              <li>• Automated zone reallocation</li>
              <li>• Exit timing optimization</li>
            </ul>
          </div>

          <div className="bg-white/50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Shield className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-semibold">Precision Risk Control</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>• Zone-specific LTV ratios (55-75%)</li>
              <li>• Geographic concentration limits</li>
              <li>• Dynamic risk scoring</li>
              <li>• Market cycle positioning</li>
            </ul>
          </div>

          <div className="bg-white/50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Brain className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-semibold">AI Portfolio Predictions</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>• Zone transition forecasting</li>
              <li>• Growth corridor identification</li>
              <li>• Market timing signals</li>
              <li>• Risk-return optimization</li>
            </ul>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-lg mt-4">
            <p className="text-sm text-blue-800">
              <strong>ML-Driven Strategy:</strong> Our AI system continuously analyzes market conditions 
              to recommend optimal parameter adjustments. It predicts zone transitions, forecasts returns, 
              and suggests portfolio rebalancing to maintain the perfect balance between risk and return. 
              This allows us to dynamically adjust our strategy while maintaining strict risk controls.
            </p>
          </div>
        </div>
      </div>
    ),
    visual: {
      type: 'chart',
      config: {
        animate: true,
        component: 'FundPresets',
        data: {
          presets: [
            {
              name: 'Conservative Growth',
              color: '#4F46E5',
              description: 'Focus on capital preservation with stable returns',
              settings: {
                targetIRR: '15-18%',
                maxLTV: '55%',
                riskProfile: 'Low',
                volatility: '5-8%',
                investmentHorizon: '5-7 years',
                zoneAllocation: {
                  premium: '70%',
                  growth: '30%',
                  monitoring: '0%'
                },
                keyFeatures: [
                  'Premium suburb focus',
                  'Lower leverage strategy',
                  'Strong cash flow emphasis',
                  'Defensive positioning'
                ]
              }
            },
            {
              name: 'Balanced Growth',
              color: '#10B981',
              description: 'Optimal balance of growth and stability',
              settings: {
                targetIRR: '18-22%',
                maxLTV: '65%',
                riskProfile: 'Medium',
                volatility: '8-12%',
                investmentHorizon: '4-6 years',
                zoneAllocation: {
                  premium: '50%',
                  growth: '40%',
                  monitoring: '10%'
                },
                keyFeatures: [
                  'Diversified zone exposure',
                  'Moderate leverage',
                  'Growth + income blend',
                  'Strategic positioning'
                ]
              }
            },
            {
              name: 'High Growth',
              color: '#8B5CF6',
              description: 'Maximizing returns through strategic opportunities',
              settings: {
                targetIRR: '22-28%',
                maxLTV: '75%',
                riskProfile: 'High',
                volatility: '12-15%',
                investmentHorizon: '3-5 years',
                zoneAllocation: {
                  premium: '30%',
                  growth: '50%',
                  monitoring: '20%'
                },
                keyFeatures: [
                  'Growth zone focus',
                  'Higher leverage strategy',
                  'Capital growth emphasis',
                  'Opportunistic positioning'
                ]
              }
            }
          ]
        }
      }
    },
    route: '/cio',
    theme: 'green'
  },

  {
    id: 'ai-underwriting',
    title: '5-Second Automated Underwriting',
    subtitle: 'Instant Property & Borrower Assessment',
    content: (
      <div className="space-y-6">
        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Instant Decision Engine
          </h3>
          <p className="text-gray-600">
            Our AI instantly analyzes both the property and homeowner, combining PropTrack's 
            valuation data with our fund criteria and traffic light zones to make immediate 
            lending decisions.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Instant Property Analysis</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Real-Time Valuation</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• PropTrack AVM integration</li>
                      <li>• Current market value</li>
                      <li>• Recent comparable sales</li>
                      <li>• Local market trends</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Growth Analysis</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 12-month forecast</li>
                      <li>• Historical performance</li>
                      <li>• Growth drivers</li>
                      <li>• Risk factors</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">ML Decision Making</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Fund Alignment</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Traffic light zone check</li>
                      <li>• LTV ratio analysis</li>
                      <li>• Return calculation</li>
                      <li>• Risk assessment</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Portfolio Impact</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Concentration check</li>
                      <li>• Strategy alignment</li>
                      <li>• Diversification impact</li>
                      <li>• Risk contribution</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Instant Results</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Decision Output</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Approval status</li>
                      <li>• Maximum loan amount</li>
                      <li>• Interest rate range</li>
                      <li>• Key conditions</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Return Metrics</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Expected IRR</li>
                      <li>• Risk-adjusted return</li>
                      <li>• Confidence score</li>
                      <li>• Growth potential</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    visual: {
      type: 'screenshot',
      config: {
        animate: true,
        component: 'UnderwritingOutput',
        imagePath: '/screenshots/underwriting-results.png'
      }
    },
    route: '/underwrite',
    theme: 'purple'
  },

  {
    id: 'pipeline-management',
    title: 'Dynamic Pipeline Management',
    subtitle: 'AI-Driven Deal Flow Optimization',
    content: (
      <div className="space-y-6">
        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Intelligent Deal Flow Management
          </h3>
          <p className="text-gray-600">
            Our pipeline management system continuously analyzes and ranks potential deals based on 
            our current portfolio composition and strategic targets. The ML engine automatically 
            adjusts deal priorities as market conditions and portfolio requirements evolve.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Dynamic Deal Ranking</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Portfolio Alignment</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Zone distribution</li>
                      <li>• Risk balancing</li>
                      <li>• Return optimization</li>
                      <li>• Geographic exposure</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Strategic Fit</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Fund parameters</li>
                      <li>• Growth targets</li>
                      <li>• Risk tolerance</li>
                      <li>• Market timing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">CIO Dashboard Integration</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Real-Time Adjustments</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Strategy updates</li>
                      <li>• Risk thresholds</li>
                      <li>• Return targets</li>
                      <li>• Zone preferences</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Portfolio Impact</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Allocation tracking</li>
                      <li>• Risk contribution</li>
                      <li>• Return projection</li>
                      <li>• Diversification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Automated Prioritization</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Deal Scoring</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• ML-driven ranking</li>
                      <li>• Risk assessment</li>
                      <li>• Return potential</li>
                      <li>• Strategic value</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Optimization</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Portfolio balance</li>
                      <li>• Resource allocation</li>
                      <li>• Processing priority</li>
                      <li>• Market timing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <LineChart className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Performance Analytics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Pipeline Metrics</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Conversion rates</li>
                      <li>• Processing time</li>
                      <li>• Deal velocity</li>
                      <li>• Success factors</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Market Analysis</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Opportunity flow</li>
                      <li>• Zone distribution</li>
                      <li>• Market coverage</li>
                      <li>• Trend analysis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    visual: {
      type: 'screenshot',
      config: {
        animate: true,
        component: 'Pipeline',
        imagePath: '/screenshots/pipeline-analytics.png'
      }
    },
    route: '/pipeline',
    theme: 'purple'
  },

  {
    id: 'financial-modeling',
    title: 'Advanced Scenario Testing',
    subtitle: 'ML-Powered Portfolio Optimization',
    content: (
      <div className="space-y-6">
        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Portfolio Stress Testing
          </h3>
          <p className="text-gray-600">
            Our ML engine continuously simulates different market scenarios to optimize portfolio 
            performance and identify potential risks. This allows us to proactively adjust our 
            strategy based on changing market conditions.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Scenario Analysis</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Base case projections</li>
                  <li>• Growth opportunity testing</li>
                  <li>• Conservative positioning</li>
                  <li>• Market stress scenarios</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Risk Assessment</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Interest rate impacts</li>
                  <li>• Market cycle positioning</li>
                  <li>• Geographic exposure</li>
                  <li>• Portfolio concentration</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Settings className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Strategy Optimization</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Zone allocation adjustments</li>
                  <li>• Risk parameter updates</li>
                  <li>• Return target calibration</li>
                  <li>• Portfolio rebalancing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    visual: {
      type: 'chart',
      config: {
        animate: true,
        component: 'ScenarioTesting',
        data: {
          scenarios: [
            {
              name: 'Base Case',
              irr: '18.5%',
              risk: 'Medium',
              confidence: '92%',
              color: '#4F46E5',
              description: 'A typical market scenario with moderate growth and risk',
              settings: {
                maxLTV: '65%'
              },
              zoneAllocation: {
                premium: '70%',
                growth: '30%',
                monitoring: '0%'
              },
              keyFeatures: [
                'Stable returns',
                'Low risk',
                'Consistent growth'
              ]
            },
            {
              name: 'Growth Scenario',
              irr: '22.3%',
              risk: 'Medium-High',
              confidence: '85%',
              color: '#10B981',
              description: 'A scenario with higher growth potential but increased risk',
              settings: {
                maxLTV: '65%'
              },
              zoneAllocation: {
                premium: '50%',
                growth: '40%',
                monitoring: '10%'
              },
              keyFeatures: [
                'Higher returns',
                'Medium risk',
                'Growth-oriented'
              ]
            },
            {
              name: 'Conservative',
              irr: '15.8%',
              risk: 'Low',
              confidence: '94%',
              color: '#8B5CF6',
              description: 'A low-risk, low-growth scenario',
              settings: {
                maxLTV: '55%'
              },
              zoneAllocation: {
                premium: '70%',
                growth: '30%',
                monitoring: '0%'
              },
              keyFeatures: [
                'Stable returns',
                'Low risk',
                'Consistent growth'
              ]
            },
            {
              name: 'Stress Test',
              irr: '12.4%',
              risk: 'High',
              confidence: '88%',
              color: '#EF4444',
              description: 'A scenario with extreme market volatility',
              settings: {
                maxLTV: '55%'
              },
              zoneAllocation: {
                premium: '30%',
                growth: '50%',
                monitoring: '20%'
              },
              keyFeatures: [
                'High risk',
                'Low returns',
                'Market uncertainty'
              ]
            }
          ]
        }
      }
    },
    route: '/model',
    theme: 'purple'
  },

  {
    id: 'portfolio-analytics',
    title: 'Portfolio Analytics & Reporting',
    subtitle: 'Real-Time Portfolio Intelligence',
    content: (
      <div className="space-y-6">
        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Institutional-Grade Portfolio Reporting
          </h3>
          <p className="text-gray-600">
            Our comprehensive reporting system provides real-time visibility into portfolio 
            performance, risk exposure, and strategic alignment. Advanced analytics enable 
            data-driven portfolio optimization and risk management.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <BarChart2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Performance Analytics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Return Metrics</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Portfolio IRR tracking</li>
                      <li>• Cash flow analysis</li>
                      <li>• Value appreciation</li>
                      <li>• Return attribution</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Growth Analysis</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Capital growth rates</li>
                      <li>• Income performance</li>
                      <li>• Market benchmarking</li>
                      <li>• Historical trends</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Risk Management</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Exposure Analysis</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Geographic distribution</li>
                      <li>• Zone allocation</li>
                      <li>• Risk concentration</li>
                      <li>• Market exposure</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Risk Metrics</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Value-at-Risk (VaR)</li>
                      <li>• Volatility measures</li>
                      <li>• Correlation analysis</li>
                      <li>• Stress testing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Settings className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Strategic Alignment</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Portfolio Strategy</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Target tracking</li>
                      <li>• Allocation compliance</li>
                      <li>• Growth vs target</li>
                      <li>• Strategy adherence</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Optimization</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Rebalancing needs</li>
                      <li>• Growth opportunities</li>
                      <li>• Risk adjustments</li>
                      <li>• Strategic shifts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <Brain className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">ML Insights</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Market Analysis</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Growth forecasting</li>
                      <li>• Market positioning</li>
                      <li>• Trend identification</li>
                      <li>• Opportunity detection</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Recommendations</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Portfolio actions</li>
                      <li>• Risk mitigation</li>
                      <li>• Growth targeting</li>
                      <li>• Strategy adjustment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    visual: {
      type: 'screenshot',
      config: {
        animate: true,
        component: 'PortfolioAnalytics',
        imagePath: '/screenshots/portfolio-analytics.png'
      }
    },
    route: '/report',
    theme: 'blue'
  },

  {
    id: 'platform-impact',
    title: 'Platform Impact & ROI',
    subtitle: 'Transforming Property Investment Management',
    content: (
      <div className="space-y-6">
        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Operational Excellence Through Technology
          </h3>
          <p className="text-gray-600">
            Our proprietary platform has revolutionized our entire investment operation, delivering 
            unprecedented efficiency gains and enabling institutional-grade portfolio management at scale.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Operational Efficiency</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Time Reduction</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Analysis: 30 days → 5 mins</li>
                      <li>• Due diligence: 14 days → 1 day</li>
                      <li>• Reporting: 5 days → Real-time</li>
                      <li>• Risk assessment: 7 days → Instant</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Cost Savings</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 85% reduction in analysis costs</li>
                      <li>• 70% lower operational overhead</li>
                      <li>• 60% fewer manual processes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Investment Performance</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Return Enhancement</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• +3.2% average IRR improvement</li>
                      <li>• 45% better risk-adjusted returns</li>
                      <li>• 28% reduction in volatility</li>
                      <li>• 92% ML prediction accuracy</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Risk Management</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 65% lower risk exposure</li>
                      <li>• 100% regulatory compliance</li>
                      <li>• Real-time risk monitoring</li>
                      <li>• Automated risk controls</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Stakeholder Benefits</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">For Investors</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li> Institutional-grade reporting</li>
                      <li>• Real-time portfolio visibility</li>
                      <li>• Enhanced risk management</li>
                      <li> Superior returns</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">For Homeowners</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li> 5-second approvals</li>
                      <li>• Transparent process</li>
                      <li>• Better rates</li>
                      <li>• Faster settlements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Scalability & Growth</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Platform Expansion</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Unlimited deal assessment</li>
                      <li>• All Australian postcodes</li>
                      <li>• Cross-sector expansion</li>
                      <li>• Multi-market capability</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Future Growth</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• New RE applications</li>
                      <li>• Market leadership</li>
                      <li>• Technology innovation</li>
                      <li>• Industry transformation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    visual: {
      type: 'chart',
      config: {
        animate: true,
        component: 'ImpactMetrics',
        data: {
          metrics: [
            {
              category: 'Efficiency',
              improvements: [
                { label: 'Analysis Time', from: '30 days', to: '5 mins' },
                { label: 'Operating Costs', reduction: '70%' },
                { label: 'Manual Processes', reduction: '60%' },
                { label: 'Team Size', reduction: '75%' }
              ]
            },
            {
              category: 'Performance',
              improvements: [
                { label: 'IRR Improvement', value: '+3.2%' },
                { label: 'Risk Reduction', value: '65%' },
                { label: 'ML Accuracy', value: '92%' },
                { label: 'Process Automation', value: '95%' }
              ]
            }
          ]
        }
      }
    },
    route: '/impact',
    theme: 'blue'
  }
];

// Add theme styles function
const getThemeStyles = (theme: 'blue' | 'green' | 'purple' | 'orange') => {
  const styles = {
    blue: 'from-blue-50 to-indigo-50 border-blue-100',
    green: 'from-green-50 to-emerald-50 border-green-100',
    purple: 'from-purple-50 to-indigo-50 border-purple-100',
    orange: 'from-orange-50 to-amber-50 border-orange-100'
  };
  return `bg-gradient-to-br border ${styles[theme]}`;
};

// Add more visual components
const ChartVisual: React.FC<{ config: any }> = ({ config }) => (
  <div className="relative h-64 w-full">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full h-48 relative">
        {/* Animated bar chart */}
        <div className="absolute bottom-0 left-0 w-1/4 bg-blue-500 opacity-80 transition-all duration-1000 animate-grow-up" 
          style={{ height: '60%' }} 
        />
        <div className="absolute bottom-0 left-1/4 w-1/4 bg-green-500 opacity-80 transition-all duration-1000 animate-grow-up" 
          style={{ height: '80%' }} 
        />
        <div className="absolute bottom-0 left-2/4 w-1/4 bg-purple-500 opacity-80 transition-all duration-1000 animate-grow-up" 
          style={{ height: '40%' }} 
        />
        <div className="absolute bottom-0 left-3/4 w-1/4 bg-orange-500 opacity-80 transition-all duration-1000 animate-grow-up" 
          style={{ height: '70%' }} 
        />
      </div>
    </div>
  </div>
);

// Update the SydneyZones component
const SydneyZones: React.FC<{ config: any }> = ({ config }) => {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const zones = ['premium', 'growth', 'monitoring'];
      const currentIndex = zones.indexOf(activeZone || 'premium');
      const nextIndex = (currentIndex + 1) % zones.length;
      setActiveZone(zones[nextIndex]);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeZone]);

  return (
    <div className="relative h-full w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
      {/* Header */}
      <div className="p-3 border-b">
        <h3 className="text-lg font-semibold text-gray-800">ML Zone Classification</h3>
        <p className="text-sm text-gray-600">Real-time market analysis and prediction</p>
      </div>

      {/* Content Container */}
      <div className="flex h-[calc(100%-4rem)]">
        {/* Zones Display - Left Side */}
        <div className="w-1/2 border-r p-4">
          <div className="space-y-3">
            {config.data.zones.map((zone: any) => {
              const isActive = zone.type === activeZone;

              return (
                <div
                  key={zone.name}
                  className={`bg-white rounded-lg border-2 transition-all duration-500
                            ${isActive ? 'shadow-lg scale-102' : 'scale-100 opacity-50'}`}
                  style={{
                    borderColor: zone.color,
                  }}
                >
                  <div className="p-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: zone.color }}
                        />
                        <h4 className="font-medium text-base" style={{ color: zone.color }}>
                          {zone.name}
                        </h4>
                      </div>
                      {isActive && (
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full animate-ping"
                               style={{ backgroundColor: zone.color }} />
                          <span className="text-xs text-gray-600">ML Analysis Active</span>
                        </div>
                      )}
                    </div>

                    {isActive && (
                      <div className="grid grid-cols-3 gap-2 animate-fade-in">
                        <div className="bg-gray-50 rounded p-1.5">
                          <div className="text-xs text-gray-500">Growth</div>
                          <div className="font-medium text-sm" style={{ color: zone.color }}>
                            {zone.metrics.growth}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded p-1.5">
                          <div className="text-xs text-gray-500">Risk</div>
                          <div className="font-medium text-sm" style={{ color: zone.color }}>
                            {zone.metrics.risk}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded p-1.5">
                          <div className="text-xs text-gray-500">Confidence</div>
                          <div className="font-medium text-sm" style={{ color: zone.color }}>
                            {zone.metrics.confidence}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Zone Descriptions - Right Side */}
        <div className="w-1/2 bg-gray-50 p-4">
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full mt-1.5 bg-green-500" />
              <div>
                <span className="font-medium text-green-700">Premium Zones</span>
                <p className="text-gray-600 text-xs mt-1">
                  Established suburbs with strong fundamentals, high-quality infrastructure, and consistent 
                  growth patterns. These areas offer the most stable risk-adjusted returns.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full mt-1.5 bg-orange-500" />
              <div>
                <span className="font-medium text-orange-700">Growth Zones</span>
                <p className="text-gray-600 text-xs mt-1">
                  Emerging suburbs with significant growth catalysts, including infrastructure projects, 
                  demographic shifts, and improving amenities. Higher return potential with managed risk.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full mt-1.5 bg-red-500" />
              <div>
                <span className="font-medium text-red-700">Monitoring Zones</span>
                <p className="text-gray-600 text-xs mt-1">
                  Higher volatility areas with limited infrastructure or growth drivers. We actively 
                  monitor these zones but generally avoid investment due to elevated risk levels and 
                  uncertain market conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to position zones on the map
const getZonePosition = (zoneName: string) => {
  switch (zoneName) {
    case 'Northern Beaches':
      return { top: '20%', right: '20%' };
    case 'Eastern Suburbs':
      return { top: '40%', right: '10%' };
    case 'Inner West':
      return { top: '45%', left: '30%' };
    case 'South West':
      return { bottom: '20%', left: '20%' };
    default:
      return {};
  }
};

const ProcessFlow: React.FC<{ config: any }> = ({ config }) => (
  <div className="relative h-64 w-full">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="space-y-4 w-full max-w-md">
        {/* Animated process steps */}
        <div className="flex items-center space-x-4 animate-slide-right">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">1</div>
          <div className="flex-1 h-12 bg-blue-100 rounded-lg" />
        </div>
        <div className="flex items-center space-x-4 animate-slide-right delay-100">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">2</div>
          <div className="flex-1 h-12 bg-green-100 rounded-lg" />
        </div>
        <div className="flex items-center space-x-4 animate-slide-right delay-200">
          <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white">3</div>
          <div className="flex-1 h-12 bg-purple-100 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

// First, add the keyframes to the styles
const styles = `
  @keyframes slideIn {
    from { 
      opacity: 0;
      transform: translateX(-20px);
    }
    to { 
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

// Then update the FlowDiagram component
const FlowDiagram: React.FC<{ config: any }> = ({ config }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="space-y-6">
        {config.steps?.map((step: any, index: number) => (
          <div 
            key={step.title}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4 transition-all duration-500 hover:shadow-lg"
            style={{ 
              animation: `slideIn 0.5s ease-out forwards ${index * 0.2}s`
            }}
          >
            <div className="bg-blue-50 p-3 rounded-lg">
              {step.icon === 'Search' && <Search className="h-6 w-6 text-blue-600" />}
              {step.icon === 'Shield' && <Shield className="h-6 w-6 text-blue-600" />}
              {step.icon === 'BarChart' && <BarChart2 className="h-6 w-6 text-blue-600" />}
            </div>
            <div>
              <div className="font-medium">{step.title}</div>
              <div className="text-sm text-gray-600">{step.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Update the VisualContent component's type definition and imports
const VisualContent: React.FC<{ type: string; config: VisualConfig }> = ({ type, config }) => {
  switch (type) {
    case 'flow-diagram':
      return <FlowDiagram config={config} />;
    case 'chart':
      if (config.component === 'CIODashboard') {
        return <CIODashboard config={config} />;
      }
      if (config.component === 'FundPresets') {
        return <FundPresets config={config} />;
      }
      if (config.component === 'DataProcessing') {
        return <DataProcessing config={config} />;
      }
      if (config.component === 'ScenarioTesting') {
        return <ScenarioTesting config={config} />;
      }
      if (config.component === 'ImpactMetrics') {  // Add this case
        return <ImpactMetrics config={config} />;
      }
      return <ChartVisual config={config} />;
    case 'zone-map':
      return <SydneyZones config={config} />;
    case 'screenshot':
      if (config.component === 'UnderwritingOutput') {
        return <UnderwritingOutput config={config} />;
      }
      if (config.component === 'Pipeline') {
        return <PipelineVisual config={config} />;
      }
      if (config.component === 'PortfolioAnalytics') {
        return <PortfolioAnalytics config={config} />;
      }
      return (
        <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
          {config.imagePath && <img src={config.imagePath} alt="Screenshot" className="w-full h-full object-cover" />}
        </div>
      );
    default:
      return null;
  }
};

type VisualType = 'flow-diagram' | 'chart' | 'zone-map' | 'process' | 'screenshot';

const GuidedDemo: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  
  // Add refs for each component we want to capture
  const fundParametersRef = useRef<HTMLDivElement>(null);
  const trafficLightRef = useRef<HTMLDivElement>(null);
  const suburbTransitionRef = useRef<HTMLDivElement>(null);

  // Function to capture component snapshot
  const captureComponent = async (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      const canvas = await html2canvas(ref.current);
      return canvas.toDataURL();
    }
    return null;
  };

  // Update visual content to use live snapshots
  const getVisualContent = async (type: string) => {
    switch (type) {
      case 'fund-parameters':
        return await captureComponent(fundParametersRef);
      case 'traffic-light':
        return await captureComponent(trafficLightRef);
      case 'suburb-transition':
        return await captureComponent(suburbTransitionRef);
      default:
        return null;
    }
  };

  const nextSlide = () => {
    if (currentSlide < demoSlides.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setIsTransitioning(false);
      }, 500);
    } else {
      navigate('/cio');
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1);
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50">
      <style>{styles}</style>
      <div className="h-full flex flex-col">
        {/* Progress Bar */}
        <div className="h-1 bg-gray-200">
          <div 
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${((currentSlide + 1) / demoSlides.length) * 100}%` }}
          />
        </div>

        {/* Main Content - Add overflow-y-auto */}
        <div className={`flex-1 p-8 overflow-y-auto transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <div className={`max-w-6xl mx-auto bg-gradient-to-br rounded-2xl shadow-xl overflow-hidden mb-16
            ${getThemeStyles(demoSlides[currentSlide].theme)}`}
          >
            <div className="p-8">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">{demoSlides[currentSlide].title}</h2>
                <p className="text-xl opacity-90">{demoSlides[currentSlide].subtitle}</p>
              </div>

              {/* Content Grid - Increase height */}
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  {demoSlides[currentSlide].content}
                </div>
                <div className="h-[800px] overflow-hidden"> {/* Increased from 600px to 800px */}
                  <VisualContent 
                    type={demoSlides[currentSlide].visual.type}
                    config={demoSlides[currentSlide].visual.config}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls - Fixed at bottom with white background and shadow */}
        <div className="sticky bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-white border-t shadow-lg">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}  // Add this home button
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              Home
            </button>
            
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex items-center px-6 py-3 text-gray-600 disabled:opacity-50 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Previous
            </button>
          </div>

          <div className="text-sm text-gray-500">
            {currentSlide + 1} of {demoSlides.length}
          </div>

          <button
            onClick={nextSlide}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentSlide === demoSlides.length - 1 ? 'Finish Tour' : 'Next'}
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Update the HubChart component
const HubChart: React.FC<{ config: any }> = ({ config }) => {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Center Hub */}
        <div 
          className="absolute w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center"
          style={{ 
            zIndex: 40,
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%'
          }}
        >
          <div className="text-center">
            <Settings className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="font-semibold text-sm">{config.data.center.title}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Module {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
}

const CIODashboard: React.FC<{ config: any }> = ({ config }) => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const modules = config.data.modules as Module[];
      const currentIndex = modules.findIndex((m: Module) => m.id === activeModule);
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % modules.length;
      setActiveModule(modules[nextIndex].id);
    }, 2500);

    return () => clearInterval(interval);
  }, [activeModule, config.data.modules]);

  return (
    <div className="relative h-full w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-16">
      {/* Central Hub - Slightly smaller */}
      <div 
        className="fixed bg-blue-600 rounded-full shadow-lg flex items-center justify-center
                   transition-all duration-500"
        style={{ 
          width: '140px',
          height: '140px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 30
        }}
      >
        <div className="text-center text-white">
          <Settings className="h-8 w-8 mx-auto mb-2" />
          <div className="text-sm font-medium">CIO Dashboard</div>
        </div>
      </div>

      {/* Modules */}
      <div className="relative h-full">
        {config.data.modules.map((module: any, index: number) => {
          const angle = (index * (360 / config.data.modules.length) + 45) * (Math.PI / 180);
          const radius = 180;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          const isActive = activeModule === module.id;
          const isHovered = hoveredModule === module.id;

          return (
            <div
              key={module.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 
                         transition-all duration-500 ease-in-out
                         ${isActive || isHovered ? 'scale-110 z-20' : 'scale-100 z-10'}`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
              onMouseEnter={() => setHoveredModule(module.id)}
              onMouseLeave={() => setHoveredModule(null)}
            >
              {/* Connection Line */}
              <div
                className="absolute top-1/2 left-1/2 h-0.5 transform origin-left
                           transition-all duration-500"
                style={{
                  width: `${radius - 70}px`,
                  background: `linear-gradient(90deg, ${module.color}88, transparent)`,
                  transform: `rotate(${angle * (180 / Math.PI) - 180}deg) translateX(70px)`,
                  opacity: isActive || isHovered ? 1 : 0.3
                }}
              />

              {/* Module Card */}
              <div
                className={`w-52 bg-white rounded-xl shadow-lg overflow-hidden
                           transition-all duration-500
                           ${isActive || isHovered ? 'ring-2' : 'ring-0'}`}
                style={{ 
                  borderColor: module.color,
                  ['--tw-ring-color' as string]: module.color 
                } as React.CSSProperties}
              >
                <div className="p-4" style={{ backgroundColor: `${module.color}11` }}>
                  <div className="flex items-center space-x-3 mb-2">
                    {module.icon === 'Settings' && <Settings className="h-6 w-6" style={{ color: module.color }} />}
                    {module.icon === 'Target' && <Target className="h-6 w-6" style={{ color: module.color }} />}
                    {module.icon === 'Brain' && <Brain className="h-6 w-6" style={{ color: module.color }} />}
                    {module.icon === 'BarChart' && <BarChart2 className="h-6 w-6" style={{ color: module.color }} />}
                    <span className="font-medium text-base" style={{ color: module.color }}>{module.title}</span>
                  </div>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FundPresets: React.FC<{ config: any }> = ({ config }) => {
  const [activePreset, setActivePreset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePreset((prev) => (prev + 1) % config.data.presets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [config.data.presets.length]);

  return (
    <div className="relative h-full w-full bg-white/80 backdrop-sm rounded-xl shadow-lg p-8">
      {/* Header Section - Reduced padding */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-white/95 to-white/50 backdrop-blur-sm z-40 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Investment Strategy Presets</h3>
            <p className="text-sm text-gray-600">
              Select a preset to automatically configure all fund parameters and risk controls
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              <span className="text-xs text-gray-500">Active</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              <span className="text-xs text-gray-500">Inactive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Adjust content spacing - Reduced top padding */}
      <div className="relative h-full pt-16">
        <div className="relative h-full flex items-center justify-center">
          {config.data.presets.map((preset: any, index: number) => {
            const isActive = index === activePreset;

            return (
              <div
                key={preset.name}
                className={`absolute top-1/2 left-1/2 w-[480px] bg-white rounded-xl shadow-lg overflow-hidden
                           transition-all duration-500 ease-in-out cursor-pointer hover:shadow-xl
                           ${isActive ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  transform: 'translate(-50%, -50%)',
                  zIndex: isActive ? 30 : 0,
                }}
              >
                {/* Header - Reduced padding */}
                <div 
                  className="p-4 border-b"
                  style={{ backgroundColor: `${preset.color}11` }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-semibold" style={{ color: preset.color }}>
                      {preset.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" style={{ color: preset.color }} />
                      <span className="text-sm font-medium" style={{ color: preset.color }}>
                        Fund Preset
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{preset.description}</p>
                </div>

                {/* Settings - Adjusted spacing */}
                <div className="p-4 space-y-4">
                  {/* Risk Profile */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Risk Profile</div>
                        <div className="font-medium" style={{ color: preset.color }}>
                          {preset.settings.riskProfile}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Volatility</div>
                        <div className="font-medium" style={{ color: preset.color }}>
                          {preset.settings.volatility}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Target IRR */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Target IRR</span>
                      <span className="text-sm font-medium">{preset.settings.targetIRR}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${parseInt(preset.settings.targetIRR.split('-')[1])}%`,
                          backgroundColor: preset.color 
                        }}
                      />
                    </div>
                  </div>

                  {/* Max LTV */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Max LTV</span>
                      <span className="text-sm font-medium">{preset.settings.maxLTV}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: preset.settings.maxLTV,
                          backgroundColor: preset.color 
                        }}
                      />
                    </div>
                  </div>

                  {/* Zone Allocation */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Zone Allocation</span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden">
                      <div 
                        className="transition-all duration-500"
                        style={{ 
                          width: preset.settings.zoneAllocation.premium,
                          backgroundColor: '#22C55E'
                        }}
                      />
                      <div 
                        className="transition-all duration-500"
                        style={{ 
                          width: preset.settings.zoneAllocation.growth,
                          backgroundColor: '#F97316'
                        }}
                      />
                      <div 
                        className="transition-all duration-500"
                        style={{ 
                          width: preset.settings.zoneAllocation.monitoring,
                          backgroundColor: '#EF4444'
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>Premium {preset.settings.zoneAllocation.premium}</span>
                      <span>Growth {preset.settings.zoneAllocation.growth}</span>
                      <span>Monitor {preset.settings.zoneAllocation.monitoring}</span>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="border-t pt-4">
                    <div className="text-sm font-medium mb-2">Key Features</div>
                    <div className="grid grid-cols-2 gap-2">
                      {preset.settings.keyFeatures.map((feature: string, i: number) => (
                        <div key={i} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: preset.color }} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Update the UnderwritingOutput component
const UnderwritingOutput: React.FC<{ config: any }> = ({ config }) => {
  return (
    <div className="relative h-full w-full bg-white rounded-lg shadow-lg overflow-hidden p-6">
      {/* Mock Underwriting Output */}
      <div className="space-y-6">
        {/* Property Details */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">42 Example Street, Mosman</h3>
              <p className="text-sm text-gray-600">Premium Zone | Northern Beaches</p>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Approved
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-600">PropTrack Value</div>
              <div className="text-lg font-semibold">$2,450,000</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">12m Growth Forecast</div>
              <div className="text-lg font-semibold text-green-600">+6.5%</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Confidence Score</div>
              <div className="text-lg font-semibold text-blue-600">94%</div>
            </div>
          </div>
        </div>

        {/* Loan Details */}
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-medium mb-3">Loan Parameters</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-600">Max Loan Amount</div>
              <div className="text-lg font-semibold">$1,500,000</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Max LTV</div>
              <div className="text-lg font-semibold">65%</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Interest Rate</div>
              <div className="text-lg font-semibold">7.95%</div>
            </div>
          </div>
        </div>

        {/* Return Metrics */}
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-medium mb-3">Return Analysis</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-600">Target IRR</div>
              <div className="text-lg font-semibold text-green-600">18.5%</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Risk Level</div>
              <div className="text-lg font-semibold text-green-600">Low</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Portfolio Fit</div>
              <div className="text-lg font-semibold text-green-600">Strong</div>
            </div>
          </div>
        </div>

        {/* ML Analysis */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">AI Analysis Complete</h4>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
              Processing Time: 4.2s
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Brain className="h-4 w-4 mr-2" />
                PropTrack AVM Integration
              </div>
              <div className="flex items-center text-gray-600">
                <Target className="h-4 w-4 mr-2" />
                Zone Analysis Complete
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <LineChart className="h-4 w-4 mr-2" />
                Growth Forecast Generated
              </div>
              <div className="flex items-center text-gray-600">
                <BarChart2 className="h-4 w-4 mr-2" />
                Portfolio Impact Assessed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Update the DataProcessing component
const DataProcessing: React.FC<{ config: any }> = ({ config }) => {
  const [activeStep, setActiveStep] = useState(0);  // Add this line

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
      {/* Data Sources Section */}
      <div className="text-sm font-medium text-gray-500 mb-2">Data Sources</div>
      <div className="grid grid-cols-4 gap-4 mb-12">
        <div className="text-center relative">
          <div className="bg-blue-100 p-4 rounded-lg mb-3 mx-auto w-fit">
            <Brain className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-sm font-medium">PropTrack</div>
          <div className="text-xs text-gray-500">Real-time valuations</div>
          <div className="absolute bottom-0 left-1/2 h-8 w-0.5 bg-gradient-to-b from-blue-200 to-transparent" />
        </div>
        <div className="text-center relative">
          <div className="bg-purple-100 p-4 rounded-lg mb-3 mx-auto w-fit">
            <LineChart className="h-8 w-8 text-purple-600" />
          </div>
          <div className="text-sm font-medium">CoreLogic</div>
          <div className="text-xs text-gray-500">Market analytics</div>
          <div className="absolute bottom-0 left-1/2 h-8 w-0.5 bg-gradient-to-b from-purple-200 to-transparent" />
        </div>
        <div className="text-center relative">
          <div className="bg-green-100 p-4 rounded-lg mb-3 mx-auto w-fit">
            <BarChart2 className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-sm font-medium">ABS Data</div>
          <div className="text-xs text-gray-500">Demographics</div>
          <div className="absolute bottom-0 left-1/2 h-8 w-0.5 bg-gradient-to-b from-green-200 to-transparent" />
        </div>
        <div className="text-center relative">
          <div className="bg-orange-100 p-4 rounded-lg mb-3 mx-auto w-fit">
            <Target className="h-8 w-8 text-orange-600" />
          </div>
          <div className="text-sm font-medium">Infrastructure</div>
          <div className="text-xs text-gray-500">Development plans</div>
          <div className="absolute bottom-0 left-1/2 h-8 w-0.5 bg-gradient-to-b from-orange-200 to-transparent" />
        </div>
      </div>

      {/* ML Processing Pipeline */}
      <div className="text-sm font-medium text-gray-500 mb-2">ML Processing Pipeline</div>
      <div className="grid grid-cols-4 gap-4 mb-12">
        {config.data.steps.map((step: any, index: number) => (
          <div key={step.title} className="relative">
            <div className={`bg-white rounded-lg p-4 border-2 transition-all duration-500
                         ${activeStep === index ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-100'}`}>
              <div className="flex items-center gap-2 mb-2">
                {step.icon === 'Brain' && <Brain className="h-5 w-5 text-blue-600" />}
                {step.icon === 'Shield' && <Shield className="h-5 w-5 text-blue-600" />}
                {step.icon === 'LineChart' && <LineChart className="h-5 w-5 text-blue-600" />}
                {step.icon === 'Target' && <Target className="h-5 w-5 text-blue-600" />}
                <div className="font-medium text-sm">{step.title}</div>
              </div>
              <p className="text-xs text-gray-600">{step.description}</p>
              {activeStep === index && (
                <div className="mt-2 pt-2 border-t">
                  <div className="flex items-center gap-1 text-xs text-blue-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Processing...
                  </div>
                </div>
              )}
            </div>
            {index < 3 && (
              <div className="absolute top-1/2 -right-2 w-2 h-0.5 bg-blue-200">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rotate-45 border-t-2 border-r-2 border-blue-200" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Real-Time Platform Updates */}
      <div className="text-sm font-medium text-gray-500 mb-2">Real-Time Platform Updates</div>
      <div className="grid grid-cols-3 gap-4 mb-12">
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-medium text-sm">Traffic Light Zones</h4>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-sm">Market Intelligence</h4>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-medium text-sm">Strategy Impact</h4>
        </div>
      </div>

      {/* ML Insights */}
      <div className="text-sm font-medium text-gray-500 mb-2">ML Insights</div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-indigo-50 rounded-lg p-4">
          <h4 className="font-medium text-sm">Growth Patterns</h4>
        </div>

        <div className="bg-indigo-50 rounded-lg p-4">
          <h4 className="font-medium text-sm">Risk Factors</h4>
        </div>

        <div className="bg-indigo-50 rounded-lg p-4">
          <h4 className="font-medium text-sm">Market Signals</h4>
        </div>
      </div>
    </div>
  );
};

// Change the name of our component from Pipeline to PipelineVisual
const PipelineVisual: React.FC<{ config: any }> = ({ config }) => {
  const [activeDeals, setActiveDeals] = useState<number[]>([0, 1, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDeals(prev => {
        const next = prev.map(n => (n + 1) % 8);
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const deals = [
    {
      address: '42 Example St, Mosman',
      zone: 'Premium',
      score: 94,
      return: '18.5%',
      risk: 'Low',
      fit: 'Strong',
      color: '#22C55E'
    },
    {
      address: '15 Sample Rd, Marrickville',
      zone: 'Growth',
      score: 87,
      return: '21.2%',
      risk: 'Medium',
      fit: 'Good',
      color: '#F97316'
    },
    {
      address: '8 Test Ave, Northern Beaches',
      zone: 'Premium',
      score: 92,
      return: '17.8%',
      risk: 'Low',
      fit: 'Strong',
      color: '#22C55E'
    },
    {
      address: '23 Demo St, Inner West',
      zone: 'Growth',
      score: 85,
      return: '22.4%',
      risk: 'Medium',
      fit: 'Good',
      color: '#F97316'
    }
  ];

  return (
    <div className="relative h-full w-full bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">Active Pipeline</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs text-gray-600">ML Ranking Active</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600">Deals automatically ranked by ML engine based on current portfolio requirements</p>
      </div>

      {/* Deals List */}
      <div className="space-y-3">
        {deals.map((deal, index) => {
          const isActive = activeDeals.includes(index);
          
          return (
            <div
              key={deal.address}
              className={`bg-white border rounded-lg transition-all duration-500
                        ${isActive ? 'border-blue-500 shadow-md scale-102' : 'border-gray-100 opacity-50'}`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-semibold">{index + 1}</div>
                    <div>
                      <div className="font-medium">{deal.address}</div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: deal.color }} />
                          <span>{deal.zone} Zone</span>
                        </div>
                        <span>•</span>
                        <span className="text-blue-600">ML Score: {deal.score}%</span>
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <div className="flex items-center gap-1 text-xs text-blue-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      Analyzing
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Expected IRR</div>
                    <div className="font-medium">{deal.return}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Risk Level</div>
                    <div className="font-medium">{deal.risk}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Portfolio Fit</div>
                    <div className="font-medium">{deal.fit}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Bar */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-600">Real-Time Ranking</span>
          </div>
          <div className="text-xs text-gray-600">
            Optimizing for current portfolio requirements
          </div>
        </div>
      </div>
    </div>
  );
};

// Update the ScenarioTesting interface and fix property access
interface ScenarioData {
  name: string;
  irr: string;
  risk: string;
  confidence: string;
  color: string;
  description?: string;
  settings: {
    maxLTV: string;
  };
  zoneAllocation: {
    premium: string;
    growth: string;
    monitoring: string;
  };
  keyFeatures: string[];
}

const ScenarioTesting: React.FC<{ config: any }> = ({ config }) => {
  const [activeScenario, setActiveScenario] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScenario((prev) => (prev + 1) % config.data.scenarios.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [config.data.scenarios.length]);

  return (
    <div className="relative h-full w-full bg-white/80 backdrop-sm rounded-xl shadow-lg p-8">
      {/* Header Section - Reduced padding */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-white/95 to-white/50 backdrop-blur-sm z-40 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Scenario Scenarios</h3>
            <p className="text-sm text-gray-600">
              Select a scenario to test your strategy under different market conditions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              <span className="text-xs text-gray-500">Active</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              <span className="text-xs text-gray-500">Inactive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Adjust content spacing - Reduced top padding */}
      <div className="relative h-full pt-16">
        <div className="relative h-full flex items-center justify-center">
          {config.data.scenarios.map((scenario: ScenarioData, index: number) => {
            const isActive = index === activeScenario;

            return (
              <div
                key={scenario.name}
                className={`absolute top-1/2 left-1/2 w-[480px] bg-white rounded-xl shadow-lg overflow-hidden
                           transition-all duration-500 ease-in-out cursor-pointer hover:shadow-xl
                           ${isActive ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  transform: 'translate(-50%, -50%)',
                  zIndex: isActive ? 30 : 0,
                }}
              >
                {/* Header - Reduced padding */}
                <div 
                  className="p-4 border-b"
                  style={{ backgroundColor: `${scenario.color}11` }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-semibold" style={{ color: scenario.color }}>
                      {scenario.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" style={{ color: scenario.color }} />
                      <span className="text-sm font-medium" style={{ color: scenario.color }}>
                        Scenario
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{scenario.description}</p>
                </div>

                {/* Settings - Adjusted spacing */}
                <div className="p-4 space-y-4">
                  {/* Risk Profile */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Risk Profile</div>
                        <div className="font-medium" style={{ color: scenario.color }}>
                          {scenario.risk}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Confidence</div>
                        <div className="font-medium" style={{ color: scenario.color }}>
                          {scenario.confidence}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Target IRR */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Target IRR</span>
                      <span className="text-sm font-medium">{scenario.irr}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${parseInt(scenario.irr.split('-')[1])}%`,
                          backgroundColor: scenario.color 
                        }}
                      />
                    </div>
                  </div>

                  {/* Max LTV */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Max LTV</span>
                      <span className="text-sm font-medium">{scenario.settings.maxLTV}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: scenario.settings.maxLTV,
                          backgroundColor: scenario.color 
                        }}
                      />
                    </div>
                  </div>

                  {/* Zone Allocation */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Zone Allocation</span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden">
                      <div 
                        className="transition-all duration-500"
                        style={{ 
                          width: scenario.zoneAllocation.premium,
                          backgroundColor: '#22C55E'
                        }}
                      />
                      <div 
                        className="transition-all duration-500"
                        style={{ 
                          width: scenario.zoneAllocation.growth,
                          backgroundColor: '#F97316'
                        }}
                      />
                      <div 
                        className="transition-all duration-500"
                        style={{ 
                          width: scenario.zoneAllocation.monitoring,
                          backgroundColor: '#EF4444'
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>Premium {scenario.zoneAllocation.premium}</span>
                      <span>Growth {scenario.zoneAllocation.growth}</span>
                      <span>Monitor {scenario.zoneAllocation.monitoring}</span>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="border-t pt-4">
                    <div className="text-sm font-medium mb-2">Key Features</div>
                    <div className="grid grid-cols-2 gap-2">
                      {scenario.keyFeatures.map((feature: string, i: number) => (
                        <div key={i} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: scenario.color }} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Add PortfolioAnalytics component
const PortfolioAnalytics: React.FC<{ config: any }> = ({ config }) => {
  return (
    <div className="relative h-full w-full bg-white rounded-lg shadow-lg p-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-gray-600">Total AUM</div>
          <div className="text-2xl font-semibold">$247.8M</div>
          <div className="text-sm text-green-600"> 8.3% YTD</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-gray-600">Portfolio IRR</div>
          <div className="text-2xl font-semibold">18.5%</div>
          <div className="text-sm text-green-600">↑ 2.1% vs Target</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-sm text-gray-600">Active Loans</div>
          <div className="text-2xl font-semibold">142</div>
          <div className="text-sm text-blue-600">Across 38 Suburbs</div>
        </div>
      </div>

      {/* Zone Distribution */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-medium mb-4">Zone Allocation</h4>
        <div className="h-4 bg-white rounded-full overflow-hidden mb-2">
          <div className="flex h-full">
            <div className="bg-green-500 h-full" style={{ width: '45%' }} />
            <div className="bg-orange-500 h-full" style={{ width: '35%' }} />
            <div className="bg-red-500 h-full" style={{ width: '20%' }} />
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Premium 45%</span>
          <span>Growth 35%</span>
          <span>Monitor 20%</span>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg border p-4">
          <h4 className="font-medium mb-3">Risk Profile</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Avg LTV</span>
              <span className="font-medium">62.4%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Geographic Risk</span>
              <span className="font-medium text-green-600">Low</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Market Risk</span>
              <span className="font-medium text-green-600">Low</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <h4 className="font-medium mb-3">Performance</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Realized Returns</span>
              <span className="font-medium">16.8%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Unrealized Gains</span>
              <span className="font-medium">+12.4%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Portfolio Growth</span>
              <span className="font-medium text-green-600">Strong</span>
            </div>
          </div>
        </div>
      </div>

      {/* ML Insights */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">AI Analysis</h4>
          <div className="flex items-center text-xs text-gray-600">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse mr-1" />
            Real-Time Updates
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Target className="h-4 w-4 mr-2" />
              Portfolio on track with targets
            </div>
            <div className="flex items-center text-gray-600">
              <Brain className="h-4 w-4 mr-2" />
              Growth opportunities identified
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Shield className="h-4 w-4 mr-2" />
              Risk levels within threshold
            </div>
            <div className="flex items-center text-gray-600">
              <Settings className="h-4 w-4 mr-2" />
              Strategy alignment confirmed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Update the ImpactMetrics component
const ImpactMetrics: React.FC<{ config: any }> = ({ config }) => {
  const [activeMetric, setActiveMetric] = useState(0);

  const metrics = [
    {
      label: 'Team Efficiency',
      before: '15+ Staff',
      after: '3 Staff',
      roles: [
        'Data Scientists',
        'Risk Analysts',
        'Underwriters',
        'Portfolio Managers'
      ],
      improvement: '80%',
      color: '#4F46E5',
      description: 'Platform reduces need for large specialized teams'
    },
    {
      label: 'Analysis Process',
      before: '30 Days',
      after: '5 Minutes',
      roles: [
        'Manual Analysis',
        'Multiple Reviews',
        'Committee Approvals',
        'Documentation'
      ],
      improvement: '99.9%',
      color: '#10B981',
      description: 'Automated institutional-grade analysis'
    },
    {
      label: 'Operating Costs',
      before: '$2.5M/year',
      after: 'Maintenance & Data Costs',
      roles: [
        'Salaries',
        'Software Licenses',
        'Data Subscriptions',
        'Office Space'
      ],
      improvement: '80%',
      color: '#8B5CF6',
      description: 'Dramatic reduction in operational overhead'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 5000); // Changed from 3000 to 5000 for slower animation
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full bg-white rounded-lg shadow-lg p-8">
      <div className="h-full flex flex-col justify-center">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`transition-all duration-500 ${
              activeMetric === index 
                ? 'opacity-100 transform translate-x-0'
                : 'opacity-0 transform translate-x-full absolute'
            }`}
          >
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2" style={{ color: metric.color }}>
                  {metric.improvement} Reduction
                </h3>
                <p className="text-gray-600">{metric.label}</p>
                <p className="text-sm text-gray-500 mt-2">{metric.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-8 p-6">
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-gray-500 text-sm mb-2">Traditional Approach</div>
                    <div className="font-semibold text-red-600 text-lg mb-3">{metric.before}</div>
                    <div className="space-y-2">
                      {metric.roles.map((role, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2" />
                          {role}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-gray-500 text-sm mb-2">AI-Powered Platform</div>
                    <div className="font-semibold text-green-600 text-lg mb-3">{metric.after}</div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Brain className="h-4 w-4 text-green-600 mr-2" />
                        ML Engine
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Zap className="h-4 w-4 text-green-600 mr-2" />
                        Automated Analysis
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Target className="h-4 w-4 text-green-600 mr-2" />
                        Real-Time Decisions
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Settings className="h-4 w-4 text-green-600 mr-2" />
                        Self-Optimizing
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: '100%',
                    backgroundColor: metric.color,
                    transform: `translateX(${activeMetric === index ? '0%' : '-100%'})`
                  }}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {metrics.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeMetric === index ? 'bg-blue-600 w-6' : 'bg-gray-300'
              }`}
              onClick={() => setActiveMetric(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidedDemo; 
import React from 'react';
import { Server, Cloud, Shield, Database, Network, Globe, AlertTriangle, RefreshCcw, ChevronRight, Building, GitBranch, LineChart } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Mermaid } from '../../Mermaid';

const InfrastructureView: React.FC = () => {
  const systemArchitectureFlow = `
    flowchart LR
      subgraph RealTime ["5-Minute Decision Engine"]
        PropTrack[PropTrack AVM]:::source
        Process[Real-time Processing]:::process
        Decision[Instant Decisions]:::process
      end

      subgraph Security ["Bank-Level Security"]
        Encrypt[256-bit Encryption]:::security
        Auth[Multi-factor Auth]:::security
        Audit[Real-time Audit]:::security
      end

      subgraph Reliability ["Enterprise Reliability"]
        HA[99.99% Uptime]:::reliability
        DR[Disaster Recovery]:::reliability
        Backup[Real-time Backup]:::reliability
      end

      RealTime --> Security
      Security --> Reliability
      Reliability -.-> RealTime

      classDef source fill:#dbeafe,stroke:#2563eb,stroke-width:2px
      classDef process fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px
      classDef security fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
      classDef reliability fill:#fee2e2,stroke:#dc2626,stroke-width:2px
  `;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise Infrastructure</h3>
        <p className="text-gray-600 mb-6">
          Bank-grade infrastructure enabling 5-minute decisions with institutional-level security and 99.99% uptime.
        </p>
        <Mermaid chart={systemArchitectureFlow} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-4">5-Minute Decisions</h4>
          <ul className="space-y-2 text-blue-800">
            <li>• Real-time PropTrack AVM</li>
            <li>• Instant processing</li>
            <li>• Automated decisions</li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-green-900 mb-4">Bank-Level Security</h4>
          <ul className="space-y-2 text-green-800">
            <li>• 256-bit encryption</li>
            <li>• Multi-factor auth</li>
            <li>• Real-time monitoring</li>
          </ul>
        </div>

        <div className="bg-red-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-red-900 mb-4">Enterprise Reliability</h4>
          <ul className="space-y-2 text-red-800">
            <li>• 99.99% uptime</li>
            <li>• Real-time backups</li>
            <li>• Disaster recovery</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Real-World Impact</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Instant Processing</h5>
            <p className="text-gray-600">
              Processes PropTrack AVM data and makes decisions in under 5 minutes, replacing traditional 
              30-day approval cycles.
            </p>
          </div>
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Enterprise Security</h5>
            <p className="text-gray-600">
              Bank-grade security and compliance ensures institutional-level protection for all 
              transactions and data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureView; 
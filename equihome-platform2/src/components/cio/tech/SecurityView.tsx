import React from 'react';
import { Shield, Lock, Key, AlertTriangle, CheckCircle, Users } from 'lucide-react';
import { Line } from 'react-chartjs-2';

const SecurityView: React.FC = () => {
  // Security metrics over time
  const securityMetricsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Threat Detection Rate',
        data: [99.2, 99.4, 99.6, 99.7, 99.8, 99.9],
        borderColor: '#3b82f6',
        tension: 0.4
      },
      {
        label: 'Response Time (ms)',
        data: [42, 38, 35, 32, 30, 28],
        borderColor: '#10b981',
        tension: 0.4
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Security Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Security Infrastructure</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="flex items-center text-blue-900 font-medium mb-3">
              <Shield className="h-5 w-5 mr-2" />
              Threat Protection
            </h4>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>• Advanced DDoS mitigation</li>
              <li>• Real-time threat detection</li>
              <li>• AI-powered security</li>
              <li>• 24/7 monitoring</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="flex items-center text-green-900 font-medium mb-3">
              <Lock className="h-5 w-5 mr-2" />
              Data Security
            </h4>
            <ul className="space-y-2 text-green-800 text-sm">
              <li>• End-to-end encryption</li>
              <li>• Secure key management</li>
              <li>• Data masking</li>
              <li>• Regular audits</li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="flex items-center text-purple-900 font-medium mb-3">
              <Key className="h-5 w-5 mr-2" />
              Access Control
            </h4>
            <ul className="space-y-2 text-purple-800 text-sm">
              <li>• Role-based access</li>
              <li>• MFA enabled</li>
              <li>• Activity logging</li>
              <li>• IP whitelisting</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Uptime', value: '99.99%', icon: CheckCircle, color: 'green' },
          { label: 'Threats Blocked', value: '100k+', icon: Shield, color: 'blue' },
          { label: 'Response Time', value: '28ms', icon: AlertTriangle, color: 'yellow' },
          { label: 'Active Users', value: '2.4k', icon: Users, color: 'purple' }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.label}</p>
                <p className="text-2xl font-semibold mt-1">{metric.value}</p>
              </div>
              <metric.icon className={`h-8 w-8 text-${metric.color}-600`} />
            </div>
          </div>
        ))}
      </div>

      {/* Security Performance Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Security Performance</h3>
        <div className="h-80">
          <Line 
            data={securityMetricsData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: false,
                  min: 0,
                  max: 100
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SecurityView; 
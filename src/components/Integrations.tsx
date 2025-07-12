import React from 'react';
import { Link, Check, Plus } from 'lucide-react';

const Integrations: React.FC = () => {
  const integrations = [
    {
      name: 'Google Search Console',
      description: 'Connect your Search Console for deeper insights',
      connected: true,
      logo: '🔍'
    },
    {
      name: 'Google Analytics',
      description: 'Track traffic and user behavior',
      connected: true,
      logo: '📊'
    },
    {
      name: 'Ahrefs',
      description: 'Import keyword and backlink data',
      connected: false,
      logo: '🔗'
    },
    {
      name: 'SEMrush',
      description: 'Competitive analysis and keyword research',
      connected: false,
      logo: '📈'
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Integrations</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Integrations</h2>
          <p className="text-gray-600 mb-6">
            Connect your favorite SEO tools to get more comprehensive insights and streamline your workflow.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.map((integration, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{integration.logo}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                    </div>
                  </div>
                  {integration.connected && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    integration.connected 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {integration.connected ? 'Connected' : 'Not Connected'}
                  </span>
                  
                  <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    integration.connected
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}>
                    {integration.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Need a Custom Integration?</h3>
              <p className="text-gray-600">
                Contact our team to discuss custom integrations for your specific needs.
              </p>
            </div>
          </div>
          <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Request Integration
          </button>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
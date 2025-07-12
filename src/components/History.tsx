import React from 'react';
import { Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const History: React.FC = () => {
  const historyItems = [
    {
      id: 1,
      action: 'Entity Analysis Completed',
      project: 'optimizora.com',
      timestamp: '2 minutes ago',
      status: 'completed',
      details: 'Found 45 semantic entities'
    },
    {
      id: 2,
      action: 'Content Brief Generated',
      project: 'optimizora.com',
      timestamp: '15 minutes ago',
      status: 'completed',
      details: '2,500 word comprehensive brief'
    },
    {
      id: 3,
      action: 'Keyword Cluster Analysis',
      project: 'optimizora.com',
      timestamp: '1 hour ago',
      status: 'processing',
      details: 'Processing 150 keywords'
    },
    {
      id: 4,
      action: 'Competitor Analysis',
      project: 'example.com',
      timestamp: '2 hours ago',
      status: 'failed',
      details: 'Failed to access competitor data'
    },
    {
      id: 5,
      action: 'Topic Cluster Generation',
      project: 'example.com',
      timestamp: '3 hours ago',
      status: 'completed',
      details: 'Generated 12 topic clusters'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Completed</span>;
      case 'processing':
        return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Processing</span>;
      case 'failed':
        return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Failed</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Unknown</span>;
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">History</h1>
        
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {historyItems.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(item.status)}
                    <div>
                      <h3 className="font-medium text-gray-900">{item.action}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">{item.project}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{item.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{item.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
import React from 'react';
import { Plus, LayoutGrid, List, Settings, Trash2 } from 'lucide-react';

interface DashboardProps {
  onNavigateToTools: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToTools }) => {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex bg-white rounded-lg p-1 shadow-sm">
              <button className="p-2 bg-blue-600 text-white rounded-md">
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <List className="w-4 h-4" />
              </button>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Site</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 p-4 text-white">
              <div className="text-sm opacity-90 mb-2">Welcome to Optimizora</div>
              <div className="text-xs opacity-75 leading-relaxed">
                Start building better content with our semantic analysis tools. 
                Monitor your rankings and optimize for better search visibility.
              </div>
              <div className="mt-4 space-y-1">
                <div className="flex items-center text-xs">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  Semantic Keyword Analysis
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  Content Optimization Score: 85%
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  Entity Coverage: High
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">optimizora.com</h3>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <button 
                onClick={onNavigateToTools}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Tools</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-dashed border-gray-200 flex items-center justify-center min-h-[300px]">
            <div className="text-center p-6">
              <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Add New Project</h3>
              <p className="text-gray-600 mb-4">Create a new project to start analyzing your website</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <div className="font-medium text-gray-900">Entity analysis completed</div>
                  <div className="text-sm text-gray-600">optimizora.com - 2 minutes ago</div>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Completed</div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <div className="font-medium text-gray-900">Content brief generated</div>
                  <div className="text-sm text-gray-600">optimizora.com - 15 minutes ago</div>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Ready</div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium text-gray-900">Keyword cluster analysis</div>
                  <div className="text-sm text-gray-600">optimizora.com - 1 hour ago</div>
                </div>
                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Processing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
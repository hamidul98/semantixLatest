import React, { useState } from 'react';
import { Search, Filter, Calendar, Eye, Edit, Trash2, User, ShoppingCart, FileText, Database, Star, Clock, TrendingUp, BarChart3 } from 'lucide-react';

const EntityExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDateRange, setSelectedDateRange] = useState('All');

  const entities = [
    {
      id: 1,
      title: 'Digital Marketing Strategy',
      type: 'Content',
      status: 'Active',
      description: 'Comprehensive guide to digital marketing tactics',
      lastModified: 'Last modified 2 days ago',
      icon: FileText,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      title: 'E-commerce Platform',
      type: 'Product',
      status: 'Draft',
      description: 'Online shopping platform with advanced features',
      lastModified: 'Last modified 5 days ago',
      icon: ShoppingCart,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 3,
      title: 'User Analytics Dashboard',
      type: 'Tool',
      status: 'Active',
      description: 'Real-time analytics and reporting interface',
      lastModified: 'Last modified 1 week ago',
      icon: BarChart3,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 4,
      title: 'Customer Database',
      type: 'Data',
      status: 'Active',
      description: 'Centralized customer information system',
      lastModified: 'Last modified 3 days ago',
      icon: Database,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 5,
      title: 'Content Management System',
      type: 'Platform',
      status: 'Archived',
      description: 'Legacy CMS for content publishing',
      lastModified: 'Last modified 2 weeks ago',
      icon: FileText,
      color: 'bg-gray-100 text-gray-600'
    },
    {
      id: 6,
      title: 'User Profile Manager',
      type: 'User',
      status: 'Active',
      description: 'User account and profile management',
      lastModified: 'Last modified 4 days ago',
      icon: User,
      color: 'bg-teal-100 text-teal-600'
    }
  ];

  const recentlyViewed = [
    { name: 'Digital Marketing Strategy', type: 'Content', time: '2 hours ago' },
    { name: 'E-commerce Platform', type: 'Product', time: '1 day ago' },
    { name: 'User Analytics Dashboard', type: 'Tool', time: '3 days ago' },
    { name: 'Customer Database', type: 'Data', time: '1 week ago' }
  ];

  const tagCloudData = [
    { text: 'marketing', size: 24, color: '#3B82F6' },
    { text: 'analytics', size: 20, color: '#10B981' },
    { text: 'content', size: 18, color: '#F59E0B' },
    { text: 'user experience', size: 22, color: '#8B5CF6' },
    { text: 'e-commerce', size: 16, color: '#EF4444' },
    { text: 'dashboard', size: 19, color: '#06B6D4' },
    { text: 'optimization', size: 17, color: '#84CC16' },
    { text: 'strategy', size: 21, color: '#F97316' },
    { text: 'platform', size: 15, color: '#EC4899' },
    { text: 'database', size: 18, color: '#6366F1' },
    { text: 'management', size: 20, color: '#14B8A6' },
    { text: 'automation', size: 16, color: '#F43F5E' }
  ];

  const filteredEntities = entities.filter(entity => {
    const matchesSearch = entity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All Types' || entity.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || entity.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Entity Explorer</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Export Data
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search entities... (autocomplete enabled)"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Panel */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>All Types</option>
                    <option>Content</option>
                    <option>Product</option>
                    <option>Tool</option>
                    <option>Data</option>
                    <option>Platform</option>
                    <option>User</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>All</option>
                    <option>Active</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={selectedDateRange}
                      onChange={(e) => setSelectedDateRange(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>All</option>
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Entity Cards */}
            <div className="space-y-4">
              {filteredEntities.map((entity) => {
                const IconComponent = entity.icon;
                return (
                  <div key={entity.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${entity.color}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{entity.title}</h3>
                          <div className="flex items-center space-x-4 mb-2">
                            <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              {entity.type}
                            </span>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                              entity.status === 'Active' ? 'bg-green-100 text-green-800' :
                              entity.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {entity.status}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{entity.description}</p>
                          <p className="text-sm text-gray-500">{entity.lastModified}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Tag Cloud */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tag Cloud</h3>
              <div className="flex flex-wrap gap-2">
                {tagCloudData.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 rounded-full text-white cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      backgroundColor: tag.color,
                      fontSize: `${tag.size * 0.6}px`
                    }}
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Recently Viewed Entities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recently Viewed
              </h3>
              <div className="space-y-3">
                {recentlyViewed.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.type}</div>
                    </div>
                    <div className="text-xs text-gray-500">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistical Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Statistical Overview
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Entity Coverage</span>
                    <span className="text-sm font-medium text-gray-900">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Active Entities</span>
                    <span className="text-sm font-medium text-gray-900">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Optimization Score</span>
                    <span className="text-sm font-medium text-gray-900">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Circular Progress Chart */}
              <div className="mt-6 flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#E5E7EB"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#3B82F6"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${85 * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900">85%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Favorites */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Bookmarked Items
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-700">Marketing Strategy</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-700">Analytics Dashboard</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-700">User Database</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityExplorer;
import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Eye, Edit, Trash2, User, ShoppingCart, FileText, Database, Star, Clock, TrendingUp, BarChart3 } from 'lucide-react';
import { apiRequest } from '../utils/api';

const EntityExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEntities();
  }, []);

  const loadEntities = async () => {
    try {
      const data = await apiRequest('entities');
      setEntities(data);
    } catch (error) {
      console.error('Error loading entities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName) => {
    const icons = {
      FileText,
      Search,
      User,
      ShoppingCart,
      Database,
      BarChart3
    };
    return icons[iconName] || FileText;
  };

  const recentlyViewed = [
    { name: 'Digital Marketing Strategy', type: 'Content', time: '2 hours ago' },
    { name: 'SEO Optimization', type: 'Tool', time: '1 day ago' },
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

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
                    <select className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
                const IconComponent = getIcon(entity.icon);
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityExplorer;
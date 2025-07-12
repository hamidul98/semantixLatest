import React, { useState } from 'react';
import { Search, Download, Eye, List, Play } from 'lucide-react';
import { apiRequest } from '../utils/api';

const TopicClusterGenerator = () => {
  const [coreTopic, setCoreTopic] = useState('');
  const [targetRegion, setTargetRegion] = useState('United States');
  const [contentFormat, setContentFormat] = useState('Blog Post');
  const [clusterDepth, setClusterDepth] = useState(2);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState('tree');
  const [clusters, setClusters] = useState(null);

  const generateClusters = async () => {
    if (!coreTopic.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const data = await apiRequest('clusters', {
        method: 'POST',
        body: JSON.stringify({
          core_topic: coreTopic,
          region: targetRegion,
          format: contentFormat,
          depth: clusterDepth
        })
      });
      
      setClusters(data);
    } catch (error) {
      console.error('Error generating clusters:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderNode = (node, isRoot = false) => {
    const nodeStyle = {
      position: 'absolute',
      left: node.x,
      top: node.y,
    };

    return (
      <div key={node.id}>
        <div
          style={nodeStyle}
          className={`
            relative cursor-pointer transition-all duration-300 hover:scale-105
            ${isRoot ? 'z-20' : 'z-10'}
          `}
        >
          <div
            className="px-6 py-4 rounded-xl shadow-lg border-2 border-white min-w-[180px] text-center"
            style={{ backgroundColor: node.color }}
          >
            <div className="font-semibold text-gray-800 text-sm leading-tight">
              {node.title}
            </div>
            {node.searchVolume && (
              <div className="text-xs text-gray-600 mt-1">
                {node.searchVolume.toLocaleString()} searches/mo
              </div>
            )}
            {node.intent && (
              <div className="text-xs bg-white bg-opacity-50 rounded-full px-2 py-1 mt-1 inline-block">
                {node.intent}
              </div>
            )}
          </div>
        </div>

        {/* Render children */}
        {node.expanded && node.children && node.children.map(child => renderNode(child))}
      </div>
    );
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Topic Cluster Generator</h1>
          <div className="flex items-center space-x-4">
            <div className="flex bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setViewMode('tree')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'tree' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Enter Your Core Topic</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Core Topic
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={coreTopic}
                      onChange={(e) => setCoreTopic(e.target.value)}
                      placeholder="e.g., Digital Marketing"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Region
                  </label>
                  <select
                    value={targetRegion}
                    onChange={(e) => setTargetRegion(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Format
                  </label>
                  <select
                    value={contentFormat}
                    onChange={(e) => setContentFormat(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Blog Post</option>
                    <option>Video</option>
                    <option>Product Page</option>
                    <option>Landing Page</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cluster Depth
                  </label>
                  <select
                    value={clusterDepth}
                    onChange={(e) => setClusterDepth(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={1}>1 Level</option>
                    <option value={2}>2 Levels</option>
                    <option value={3}>3 Levels</option>
                  </select>
                </div>

                <button
                  onClick={generateClusters}
                  disabled={!coreTopic.trim() || isGenerating}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Generate Clusters</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {clusters && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center space-x-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export as PNG</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export as PDF</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export as CSV</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6 h-[800px] relative overflow-hidden">
              {clusters ? (
                <div className="w-full h-full relative">
                  {renderNode(clusters, true)}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Clusters Generated</h3>
                    <p className="text-gray-600">Enter a core topic and click "Generate Clusters" to see the visual map.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicClusterGenerator;
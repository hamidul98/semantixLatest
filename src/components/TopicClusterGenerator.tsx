import React, { useState, useRef, useEffect } from 'react';
import { Search, Settings, Download, Eye, List, ZoomIn, ZoomOut, RotateCcw, FileText, Play } from 'lucide-react';

interface ClusterNode {
  id: string;
  title: string;
  level: number;
  color: string;
  children: ClusterNode[];
  searchVolume?: number;
  intent?: string;
  expanded: boolean;
  x: number;
  y: number;
}

const TopicClusterGenerator: React.FC = () => {
  const [coreTopic, setCoreTopic] = useState('');
  const [targetRegion, setTargetRegion] = useState('United States');
  const [contentFormat, setContentFormat] = useState('Blog Post');
  const [clusterDepth, setClusterDepth] = useState(2);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('tree');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [clusters, setClusters] = useState<ClusterNode | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const sampleClusters: ClusterNode = {
    id: 'core',
    title: 'Digital Marketing',
    level: 0,
    color: '#FFD93D',
    expanded: true,
    x: 400,
    y: 100,
    children: [
      {
        id: 'seo',
        title: 'SEO Strategy',
        level: 1,
        color: '#A0F0D0',
        expanded: true,
        x: 200,
        y: 250,
        searchVolume: 12000,
        intent: 'Informational',
        children: [
          {
            id: 'keyword-research',
            title: 'Keyword Research',
            level: 2,
            color: '#C8F5E8',
            expanded: false,
            x: 100,
            y: 350,
            searchVolume: 8500,
            intent: 'Informational',
            children: []
          },
          {
            id: 'on-page-seo',
            title: 'On-Page SEO',
            level: 2,
            color: '#C8F5E8',
            expanded: false,
            x: 300,
            y: 350,
            searchVolume: 6200,
            intent: 'Informational',
            children: []
          }
        ]
      },
      {
        id: 'content-marketing',
        title: 'Content Marketing',
        level: 1,
        color: '#B8D1FF',
        expanded: true,
        x: 400,
        y: 250,
        searchVolume: 15000,
        intent: 'Informational',
        children: [
          {
            id: 'blog-writing',
            title: 'Blog Writing',
            level: 2,
            color: '#D4E4FF',
            expanded: false,
            x: 350,
            y: 350,
            searchVolume: 4500,
            intent: 'Informational',
            children: []
          },
          {
            id: 'video-content',
            title: 'Video Content',
            level: 2,
            color: '#D4E4FF',
            expanded: false,
            x: 450,
            y: 350,
            searchVolume: 7800,
            intent: 'Informational',
            children: []
          }
        ]
      },
      {
        id: 'social-media',
        title: 'Social Media Marketing',
        level: 1,
        color: '#F8C8DC',
        expanded: true,
        x: 600,
        y: 250,
        searchVolume: 18000,
        intent: 'Informational',
        children: [
          {
            id: 'facebook-ads',
            title: 'Facebook Advertising',
            level: 2,
            color: '#FBE0EC',
            expanded: false,
            x: 550,
            y: 350,
            searchVolume: 9200,
            intent: 'Commercial',
            children: []
          },
          {
            id: 'instagram-marketing',
            title: 'Instagram Marketing',
            level: 2,
            color: '#FBE0EC',
            expanded: false,
            x: 650,
            y: 350,
            searchVolume: 6700,
            intent: 'Informational',
            children: []
          }
        ]
      }
    ]
  };

  const generateClusters = async () => {
    if (!coreTopic.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo, use sample data with the user's core topic
    const generatedClusters = {
      ...sampleClusters,
      title: coreTopic
    };
    
    setClusters(generatedClusters);
    setIsGenerating(false);
  };

  const toggleNode = (nodeId: string) => {
    if (!clusters) return;
    
    const updateNode = (node: ClusterNode): ClusterNode => {
      if (node.id === nodeId) {
        return { ...node, expanded: !node.expanded };
      }
      return {
        ...node,
        children: node.children.map(updateNode)
      };
    };
    
    setClusters(updateNode(clusters));
  };

  const renderNode = (node: ClusterNode, isRoot = false) => {
    const nodeStyle = {
      position: 'absolute' as const,
      left: node.x * zoom + pan.x,
      top: node.y * zoom + pan.y,
      transform: `scale(${zoom})`,
      transformOrigin: 'center',
    };

    return (
      <div key={node.id}>
        <div
          style={nodeStyle}
          className={`
            relative cursor-pointer transition-all duration-300 hover:scale-105
            ${isRoot ? 'z-20' : 'z-10'}
          `}
          onClick={() => toggleNode(node.id)}
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
          
          {/* Tooltip on hover */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
              <div>Search Volume: {node.searchVolume?.toLocaleString() || 'N/A'}</div>
              <div>Intent: {node.intent || 'Unknown'}</div>
              <div>Level: {node.level + 1}</div>
            </div>
          </div>
        </div>

        {/* Render connections */}
        {node.expanded && node.children.map(child => (
          <svg
            key={`line-${node.id}-${child.id}`}
            className="absolute pointer-events-none"
            style={{
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              zIndex: 1
            }}
          >
            <line
              x1={(node.x + 90) * zoom + pan.x}
              y1={(node.y + 50) * zoom + pan.y}
              x2={(child.x + 90) * zoom + pan.x}
              y2={(child.y + 20) * zoom + pan.y}
              stroke="#94A3B8"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          </svg>
        ))}

        {/* Render children */}
        {node.expanded && node.children.map(child => renderNode(child))}
      </div>
    );
  };

  const exportData = (format: 'png' | 'pdf' | 'csv') => {
    // Implementation would depend on the format
    console.log(`Exporting as ${format}`);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const tableData = clusters ? flattenClusters(clusters) : [];

  function flattenClusters(node: ClusterNode, parentTopic = ''): any[] {
    const current = {
      coreTopic: parentTopic || node.title,
      clusterTopic: parentTopic ? node.title : '',
      subtopic: '',
      searchIntent: node.intent || 'Unknown',
      volume: node.searchVolume || 0,
      level: node.level
    };

    let result = [current];
    
    node.children.forEach(child => {
      result = result.concat(flattenClusters(child, parentTopic || node.title));
    });

    return result;
  }

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
                  <p className="text-xs text-gray-500 mt-1">Autocomplete suggestions available</p>
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
                  <button
                    onClick={() => exportData('png')}
                    className="w-full flex items-center space-x-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export as PNG</span>
                  </button>
                  <button
                    onClick={() => exportData('pdf')}
                    className="w-full flex items-center space-x-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export as PDF</span>
                  </button>
                  <button
                    onClick={() => exportData('csv')}
                    className="w-full flex items-center space-x-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export as CSV</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    <FileText className="w-4 h-4" />
                    <span>Send to Content Brief</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {viewMode === 'tree' ? (
              <div className="bg-white rounded-xl shadow-lg p-6 h-[800px] relative overflow-hidden">
                {clusters ? (
                  <>
                    {/* Controls */}
                    <div className="absolute top-4 right-4 z-30 flex items-center space-x-2">
                      <button
                        onClick={() => setZoom(Math.min(zoom + 0.1, 2))}
                        className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}
                        className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <button
                        onClick={resetView}
                        className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Cluster Map */}
                    <div
                      ref={canvasRef}
                      className="w-full h-full relative cursor-move"
                      onMouseDown={(e) => {
                        const startX = e.clientX - pan.x;
                        const startY = e.clientY - pan.y;
                        
                        const handleMouseMove = (e: MouseEvent) => {
                          setPan({
                            x: e.clientX - startX,
                            y: e.clientY - startY
                          });
                        };
                        
                        const handleMouseUp = () => {
                          document.removeEventListener('mousemove', handleMouseMove);
                          document.removeEventListener('mouseup', handleMouseUp);
                        };
                        
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                      }}
                    >
                      {/* SVG for arrows */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <defs>
                          <marker
                            id="arrowhead"
                            markerWidth="10"
                            markerHeight="7"
                            refX="9"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon
                              points="0 0, 10 3.5, 0 7"
                              fill="#94A3B8"
                            />
                          </marker>
                        </defs>
                      </svg>
                      
                      {renderNode(clusters, true)}
                    </div>

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Legend</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FFD93D' }}></div>
                          <span>Core Topic</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#A0F0D0' }}></div>
                          <span>First Level</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#C8F5E8' }}></div>
                          <span>Second Level</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Settings className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Clusters Generated</h3>
                      <p className="text-gray-600">Enter a core topic and click "Generate Clusters" to see the visual map.</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Cluster Data Table</h2>
                {tableData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Core Topic</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Cluster Topic</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Level</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Search Intent</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Volume</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-900">{row.coreTopic}</td>
                            <td className="py-3 px-4 text-gray-700">{row.clusterTopic || '-'}</td>
                            <td className="py-3 px-4 text-gray-700">{row.level + 1}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                row.searchIntent === 'Commercial' ? 'bg-green-100 text-green-800' :
                                row.searchIntent === 'Informational' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {row.searchIntent}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-700">{row.volume.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No data available. Generate clusters first.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicClusterGenerator;
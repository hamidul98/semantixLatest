import React from 'react';
import { Search, FileText, BarChart3, Brain, Target, Layers, Users, Zap, CheckCircle, TrendingUp, Eye, PieChart } from 'lucide-react';

interface ToolsListProps {
  onNavigateToEntityExplorer?: () => void;
  onNavigateToTopicCluster?: () => void;
}

const ToolsList: React.FC<ToolsListProps> = ({ onNavigateToEntityExplorer, onNavigateToTopicCluster }) => {
  const toolCategories = [
    {
      title: 'Semantic Keyword Research Tools',
      tools: [
        { name: 'Entity Explorer', icon: Search, description: 'Discover semantic entities and relationships' },
        { name: 'Topic Cluster Generator', icon: Layers, description: 'Generate topic clusters for content planning' },
        { name: 'Semantic Keyword Mapper', icon: Target, description: 'Map keywords to semantic intent' },
        { name: 'People Also Ask Extractor', icon: Users, description: 'Extract PAA questions for content ideas' },
        { name: 'Search Intent Classifier', icon: Brain, description: 'Classify search intent automatically' },
      ],
    },
    {
      title: 'Content Optimization Tools',
      tools: [
        { name: 'NLP Content Scorer', icon: FileText, description: 'Score content using NLP analysis' },
        { name: 'Entity Coverage Checker', icon: CheckCircle, description: 'Check entity coverage in content' },
        { name: 'Semantic Gap Analyzer', icon: Zap, description: 'Find semantic gaps in your content' },
        { name: 'Content Brief Generator', icon: FileText, description: 'Generate comprehensive content briefs' },
        { name: 'Heading Structure Optimizer', icon: Layers, description: 'Optimize heading structure for SEO' },
      ],
    },
    {
      title: 'Monitoring & Reporting Tools',
      tools: [
        { name: 'Entity Rank Tracker', icon: TrendingUp, description: 'Track entity rankings over time' },
        { name: 'Competitor Entity Coverage Report', icon: Eye, description: 'Analyze competitor entity strategies' },
      ],
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tools Lists</h1>
        
        <div className="space-y-12">
          {toolCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool, toolIndex) => {
                  const IconComponent = tool.icon;
                  return (
                    <div
                      key={toolIndex}
                      className="group bg-gradient-to-br from-teal-300 via-teal-200 to-yellow-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                      onClick={() => {
                        if (tool.name === 'Entity Explorer' && onNavigateToEntityExplorer) {
                          onNavigateToEntityExplorer();
                        } else if (tool.name === 'Topic Cluster Generator' && onNavigateToTopicCluster) {
                          onNavigateToTopicCluster();
                        }
                      }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-80 rounded-lg mb-4 group-hover:bg-opacity-100 transition-all duration-300">
                        <IconComponent className="w-6 h-6 text-teal-700" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                      <p className="text-sm text-gray-700 opacity-90">{tool.description}</p>
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          className="text-teal-700 font-medium text-sm hover:text-teal-800"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (tool.name === 'Entity Explorer' && onNavigateToEntityExplorer) {
                              onNavigateToEntityExplorer();
                            } else if (tool.name === 'Topic Cluster Generator' && onNavigateToTopicCluster) {
                              onNavigateToTopicCluster();
                            }
                          }}
                        >
                          Launch Tool →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 text-center">
          <PieChart className="w-16 h-16 text-teal-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Tool?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find the tool you need? Our team can create custom semantic analysis tools tailored to your specific requirements.
          </p>
          <button className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium">
            Request Custom Tool
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolsList;
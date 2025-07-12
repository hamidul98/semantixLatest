import React from 'react';
import { BookOpen, Video, FileText, Download, ExternalLink } from 'lucide-react';

const ResourceHub: React.FC = () => {
  const resources = [
    {
      title: 'Getting Started Guide',
      description: 'Complete guide to setting up your first semantic analysis project',
      type: 'Documentation',
      icon: BookOpen,
      link: '#'
    },
    {
      title: 'Video Tutorial Series',
      description: 'Watch step-by-step tutorials on using our advanced tools',
      type: 'Video',
      icon: Video,
      link: '#'
    },
    {
      title: 'API Documentation',
      description: 'Comprehensive API reference for developers',
      type: 'Technical',
      icon: FileText,
      link: '#'
    },
    {
      title: 'Best Practices Guide',
      description: 'Learn SEO best practices for semantic content optimization',
      type: 'Guide',
      icon: BookOpen,
      link: '#'
    },
  ];

  const blogPosts = [
    {
      title: 'Understanding Semantic SEO in 2025',
      excerpt: 'Learn how semantic search is changing the SEO landscape and how to adapt your strategy.',
      date: 'January 15, 2025',
      readTime: '5 min read'
    },
    {
      title: 'Entity-Based Content Optimization',
      excerpt: 'Discover how to optimize your content using entity recognition and semantic relationships.',
      date: 'January 10, 2025',
      readTime: '8 min read'
    },
    {
      title: 'Building Topic Clusters That Rank',
      excerpt: 'A comprehensive guide to creating topic clusters that improve your search visibility.',
      date: 'January 5, 2025',
      readTime: '12 min read'
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Resource Hub</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Documentation & Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource, index) => {
                  const IconComponent = resource.icon;
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow group cursor-pointer">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                          <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {resource.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Latest Blog Posts</h2>
              <div className="space-y-6">
                {blogPosts.map((post, index) => (
                  <article key={index} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Downloads</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Download className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">SEO Checklist PDF</span>
                  </div>
                  <span className="text-xs text-gray-500">234 KB</span>
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Download className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">Entity Template</span>
                  </div>
                  <span className="text-xs text-gray-500">45 KB</span>
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Download className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">Keyword Research Guide</span>
                  </div>
                  <span className="text-xs text-gray-500">1.2 MB</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <button className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceHub;
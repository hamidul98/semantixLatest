import React from 'react';
import { ChevronDown, ChevronUp, Brain } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const [expandedSections, setExpandedSections] = React.useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', type: 'simple' },
    { id: 'add-project', label: 'Add Project', type: 'simple' },
    { 
      id: 'select-site', 
      label: 'Select a site', 
      type: 'expandable',
      items: ['optimizora.com', 'example.com', 'mysite.com']
    },
    { id: 'history', label: 'History', type: 'simple' },
    { 
      id: 'account', 
      label: 'Account', 
      type: 'expandable',
      items: ['Profile', 'Billing', 'Settings']
    },
    { id: 'integrations', label: 'Integrations', type: 'simple' },
    { id: 'affiliates', label: 'Affiliates', type: 'simple' },
    { 
      id: 'resource-hub', 
      label: 'Resource Hub', 
      type: 'expandable',
      items: ['Documentation', 'Tutorials', 'Blog']
    },
    { id: 'user-support', label: 'User Support', type: 'simple' },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-yellow-400 to-yellow-500 text-gray-800 flex flex-col shadow-lg">
      <div className="p-6 border-b border-yellow-600">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
            <Brain className="w-5 h-5 text-yellow-400" />
          </div>
          <h1 className="text-xl font-bold">Semantix</h1>
        </div>
      </div>
      
      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.type === 'simple' ? (
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 hover:bg-yellow-600 hover:bg-opacity-30 ${
                    activeView === item.id ? 'bg-yellow-600 bg-opacity-40 font-medium' : ''
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <div>
                  <button
                    onClick={() => toggleSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 hover:bg-yellow-600 hover:bg-opacity-30 flex items-center justify-between ${
                      activeView === item.id ? 'bg-yellow-600 bg-opacity-40 font-medium' : ''
                    }`}
                  >
                    <span>{item.label}</span>
                    {expandedSections[item.id] ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections[item.id] && item.items && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {item.items.map((subItem, index) => (
                        <li key={index}>
                          <button className="w-full text-left px-4 py-2 text-sm rounded-lg transition-all duration-200 hover:bg-yellow-600 hover:bg-opacity-20">
                            {subItem}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
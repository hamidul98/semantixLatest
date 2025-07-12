import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ToolsList from './components/ToolsList';
import EntityExplorer from './components/EntityExplorer';
import TopicClusterGenerator from './components/TopicClusterGenerator';
import AddProject from './components/AddProject';
import History from './components/History';
import Account from './components/Account';
import Integrations from './components/Integrations';
import Affiliates from './components/Affiliates';
import ResourceHub from './components/ResourceHub';
import UserSupport from './components/UserSupport';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onNavigateToTools={() => setActiveView('tools')} />;
      case 'tools':
        return <ToolsList 
          onNavigateToEntityExplorer={() => setActiveView('entity-explorer')}
          onNavigateToTopicCluster={() => setActiveView('topic-cluster-generator')}
        />;
      case 'entity-explorer':
        return <EntityExplorer />;
      case 'topic-cluster-generator':
        return <TopicClusterGenerator />;
      case 'add-project':
        return <AddProject />;
      case 'history':
        return <History />;
      case 'account':
        return <Account />;
      case 'integrations':
        return <Integrations />;
      case 'affiliates':
        return <Affiliates />;
      case 'resource-hub':
        return <ResourceHub />;
      case 'user-support':
        return <UserSupport />;
      default:
        return <ToolsList 
          onNavigateToEntityExplorer={() => setActiveView('entity-explorer')}
          onNavigateToTopicCluster={() => setActiveView('topic-cluster-generator')}
        />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto">
        {renderActiveView()}
      </main>
    </div>
  );
}

export default App;
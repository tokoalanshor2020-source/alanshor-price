
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/views/DashboardView';
import PosView from './components/views/PosView';
import InventoryView from './components/views/InventoryView';
import ReportsView from './components/views/ReportsView';
import SettingsView from './components/views/SettingsView';
import CustomersView from './components/views/CustomersView';
import { Page } from './types';
import { UsersIcon, CogIcon } from './components/Icons';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardView />;
      case 'pos':
        return <PosView />;
      case 'inventory':
        return <InventoryView />;
      case 'reports':
        return <ReportsView />;
      case 'customers':
        return <CustomersView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-surface border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-dark">AL ANSHOR PRICE</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <UsersIcon className="w-6 h-6 text-textSecondary" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <CogIcon className="w-6 h-6 text-textSecondary" />
            </button>
            <div className="flex items-center space-x-2">
              <img src="https://picsum.photos/40/40" alt="User" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold text-textPrimary">Admin</p>
                <p className="text-sm text-textSecondary">Platinum User</p>
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;


import React from 'react';
import { Page } from '../types';
import { DashboardIcon, PosIcon, InventoryIcon, ReportsIcon, CogIcon, UsersIcon } from './Icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  const activeClass = isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-primary-light hover:text-white';
  return (
    <li
      onClick={onClick}
      className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${activeClass}`}
    >
      {icon}
      <span className="ml-4 font-medium">{label}</span>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon className="w-6 h-6" /> },
    { id: 'pos', label: 'POS Kasir', icon: <PosIcon className="w-6 h-6" /> },
    { id: 'inventory', label: 'Inventaris', icon: <InventoryIcon className="w-6 h-6" /> },
    { id: 'reports', label: 'Laporan', icon: <ReportsIcon className="w-6 h-6" /> },
    { id: 'customers', label: 'Pelanggan', icon: <UsersIcon className="w-6 h-6" /> },
    { id: 'settings', label: 'Pengaturan', icon: <CogIcon className="w-6 h-6" /> },
  ];

  return (
    <aside className="w-64 bg-primary-dark text-white flex flex-col">
      <div className="p-6 text-center border-b border-primary">
        <h2 className="text-2xl font-bold">AL ANSHOR</h2>
        <p className="text-sm opacity-80">PRICE</p>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          {menuItems.map((item) => (
            <NavItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              isActive={currentPage === item.id}
              onClick={() => setCurrentPage(item.id as Page)}
            />
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-primary">
        <p className="text-xs text-center text-gray-400">© 2024 AL ANSHOR PRICE POS</p>
        <p className="text-xs text-center text-gray-400">Version 1.0.0 (Platinum)</p>
      </div>
    </aside>
  );
};

export default Sidebar;

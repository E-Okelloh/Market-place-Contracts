// Navigation.tsx - Simple tab-based navigation
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Store, Sparkles, Package } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/create-marketplace', label: 'Create Market', icon: Store },
    { path: '/mint', label: 'Mint Widget', icon: Sparkles },
    { path: '/my-items', label: 'My Items', icon: Package },
  ];

  return (
    <nav className="mb-8">
      <div className="flex space-x-1 bg-gray-50 p-1 rounded-lg">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          
          return (
            <Link
              key={path}
              to={path}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                ${isActive 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
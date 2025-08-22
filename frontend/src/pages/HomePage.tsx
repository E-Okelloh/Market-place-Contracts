// HomePage.tsx - Main dashboard with quick actions
import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Sparkles, Package, ArrowRight, Info } from 'lucide-react';
import Navigation from '../components/Navigation';

const HomePage: React.FC = () => {
  const quickActions = [
    {
      title: 'Create Marketplace',
      description: 'Deploy a new marketplace contract',
      icon: Store,
      link: '/create-marketplace',
      color: 'purple'
    },
    {
      title: 'Mint Widget',
      description: 'Create a new widget NFT',
      icon: Sparkles,
      link: '/mint',
      color: 'pink'
    },
    {
      title: 'My Items',
      description: 'View your owned objects',
      icon: Package,
      link: '/my-items',
      color: 'blue'
    }
  ];

  return (
    <div>
      <Navigation />
      
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Marketplace
        </h1>
        <p className="text-gray-600">
          Create marketplaces, mint widgets, and manage your digital assets on Sui blockchain.
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {quickActions.map((action) => {
          const Icon = action.icon;
          const colorClasses = {
            purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
            pink: 'bg-pink-50 border-pink-200 hover:bg-pink-100',
            blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
          };
          
          const iconColors = {
            purple: 'text-purple-600',
            pink: 'text-pink-600', 
            blue: 'text-blue-600'
          };

          return (
            <Link
              key={action.title}
              to={action.link}
              className={`
                p-6 border-2 rounded-xl transition-all duration-200 group
                ${colorClasses[action.color as keyof typeof colorClasses]}
              `}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-white rounded-lg ${iconColors[action.color as keyof typeof iconColors]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {action.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="bg-gray-200 p-2 rounded-lg">
            <Info className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Getting Started</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• <strong>Create Marketplace:</strong> Deploy a new shared marketplace object</p>
              <p>• <strong>Mint Widget:</strong> Create NFTs that can be listed for sale</p>
              <p>• <strong>My Items:</strong> Browse all objects owned by your wallet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
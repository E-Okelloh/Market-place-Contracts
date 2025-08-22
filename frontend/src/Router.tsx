// Router.tsx - Handles all routing logic
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCurrentAccount } from '@mysten/dapp-kit';

// Import pages
import HomePage from './pages/HomePage';
import CreateMarketplacePage from './pages/CreateMarketplacePage';
import MintPage from './pages/MintPage';
import MyItemsPage from './pages/MyItemsPage';
import NotConnectedPage from './pages/NotConnectedPage';

const Router: React.FC = () => {
  const account = useCurrentAccount();

  // If wallet not connected, show connection prompt on all routes
  if (!account) {
    return <NotConnectedPage />;
  }

  return (
    <Routes>
      {/* Main dashboard/home page */}
      <Route path="/" element={<HomePage />} />
      
      {/* Create marketplace page */}
      <Route path="/create-marketplace" element={<CreateMarketplacePage />} />
      
      {/* Mint widget page */}
      <Route path="/mint" element={<MintPage />} />
      
      {/* My items/owned objects page */}
      <Route path="/my-items" element={<MyItemsPage />} />
      
      {/* Fallback to home for unknown routes */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default Router;
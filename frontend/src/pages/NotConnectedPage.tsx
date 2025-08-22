
// NotConnectedPage.tsx - Shows when wallet is not connected
import React from 'react';
import { Wallet, AlertCircle } from 'lucide-react';

const NotConnectedPage: React.FC = () => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="bg-gray-100 p-4 rounded-full inline-block mb-6">
          <Wallet className="h-12 w-12 text-gray-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Connect Your Wallet
        </h2>
        
        <p className="text-gray-600 mb-6">
          Please connect your wallet using the button in the top-right corner to access the marketplace features.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm font-medium text-blue-800 mb-1">
                Supported Wallets
              </p>
              <p className="text-sm text-blue-700">
                Sui Wallet, Martian, and other Sui-compatible wallets are supported.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotConnectedPage;
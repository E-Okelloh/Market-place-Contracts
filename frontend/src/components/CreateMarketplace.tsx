import React, { useState } from 'react';
import { Transaction } from '@mysten/sui/transactions';
import { Store, Plus, CheckCircle, XCircle } from 'lucide-react';
import { useTransaction } from '../hooks/useTransaction';
import { NETWORK_CONFIG } from '../networkConfig';

const CreateMarketplace: React.FC = () => {
  const [coinType, setCoinType] = useState('0x2::sui::SUI');
  const { status, executeTransaction, resetStatus, isLoading } = useTransaction();

  const handleCreateMarketplace = async () => {
    if (!coinType.trim()) {
      return;
    }

    resetStatus();

    try {
      const tx = new Transaction();
      
      tx.moveCall({
        target: `${NETWORK_CONFIG.PACKAGE_ID}::marketplace::create`,
        typeArguments: [coinType],
      });

      executeTransaction(tx, {
        successMessage: 'Marketplace created successfully! You can now start listing items.',
        onSuccess: (digest) => {
          console.log('Marketplace created with digest:', digest);
        }
      });
    } catch (error) {
      console.error('Transaction error:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-purple-100 p-3 rounded-lg">
          <Store className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create Marketplace</h2>
          <p className="text-gray-600">Deploy a new marketplace for trading digital assets</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="coinType" className="block text-sm font-medium text-gray-700 mb-2">
            Coin Type
          </label>
          <input
            id="coinType"
            type="text"
            value={coinType}
            onChange={(e) => setCoinType(e.target.value)}
            placeholder="Enter coin type (e.g., 0x2::sui::SUI)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            disabled={isLoading}
          />
          <p className="text-sm text-gray-500 mt-2">
            The marketplace will accept this coin type for all transactions
          </p>
        </div>

        <button
          onClick={handleCreateMarketplace}
          disabled={isLoading || !coinType.trim()}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>{isLoading ? 'Creating...' : 'Create Marketplace'}</span>
        </button>

        {/* Status Messages */}
        {status.message && (
          <div className={`p-4 rounded-lg flex items-start space-x-3 ${
            status.status === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : status.status === 'error'
              ? 'bg-red-50 border border-red-200'
              : 'bg-blue-50 border border-blue-200'
          }`}>
            {status.status === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            ) : status.status === 'error' ? (
              <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            ) : (
              <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                status.status === 'success' 
                  ? 'text-green-800' 
                  : status.status === 'error'
                  ? 'text-red-800'
                  : 'text-blue-800'
              }`}>
                {status.status === 'success' ? 'Success!' : status.status === 'error' ? 'Error' : 'Processing...'}
              </p>
              <p className={`text-sm mt-1 ${
                status.status === 'success' 
                  ? 'text-green-700' 
                  : status.status === 'error'
                  ? 'text-red-700'
                  : 'text-blue-700'
              }`}>
                {status.message}
              </p>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Store className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-800 mb-1">About Marketplaces</h4>
              <p className="text-sm text-blue-700">
                Each marketplace is a shared object that can accept one type of coin for all listings. 
                Once created, anyone can list items and make purchases using the specified coin type.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMarketplace;
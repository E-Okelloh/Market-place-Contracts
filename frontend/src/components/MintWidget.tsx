import React from 'react';
import { Transaction } from '@mysten/sui/transactions';
import { Gift, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import { useTransaction } from '../hooks/useTransaction';
import { NETWORK_CONFIG } from '../networkConfig';

const MintWidget: React.FC = () => {
  const { status, executeTransaction, resetStatus, isLoading } = useTransaction();

  const handleMintWidget = async () => {
    resetStatus();

    try {
      const tx = new Transaction();
      
      tx.moveCall({
        target: `${NETWORK_CONFIG.PACKAGE_ID}::marketplaceWidget::mint`,
      });

      executeTransaction(tx, {
        successMessage: 'Widget minted successfully! You can now list it on the marketplace.',
        onSuccess: (digest) => {
          console.log('Widget minted with digest:', digest);
        }
      });
    } catch (error) {
      console.error('Transaction error:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-pink-100 p-3 rounded-lg">
          <Gift className="h-6 w-6 text-pink-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mint Widget</h2>
          <p className="text-gray-600">Create a new widget NFT that you can list on the marketplace</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Widget Preview */}
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-dashed border-pink-200 rounded-xl p-8 text-center">
          <div className="bg-white rounded-lg p-6 inline-block shadow-sm">
            <Sparkles className="h-12 w-12 text-pink-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Marketplace Widget</h3>
            <p className="text-sm text-gray-600">A unique digital collectible</p>
          </div>
        </div>

        <button
          onClick={handleMintWidget}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 text-white px-6 py-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Sparkles className="h-5 w-5" />
          <span>{isLoading ? 'Minting...' : 'Mint Widget'}</span>
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
            <Gift className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-800 mb-1">About Widgets</h4>
              <p className="text-sm text-blue-700">
                Widgets are simple NFTs that can be minted for free. Once minted, they will appear in your "My Items" 
                tab where you can list them for sale on any marketplace.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintWidget;
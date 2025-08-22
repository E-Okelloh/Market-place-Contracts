import React, { useState, useEffect } from 'react';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { Package, RefreshCw, Loader2, ExternalLink } from 'lucide-react';
import { OwnedObject } from '../types';
import { shortenAddress, formatObjectType, openInExplorer } from '../utils/formatters';

const OwnedObjects: React.FC = () => {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const [objects, setObjects] = useState<OwnedObject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOwnedObjects = async () => {
    if (!account?.address) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await client.getOwnedObjects({
        owner: account.address,
        options: {
          showType: true,
          showContent: true,
          showOwner: true,
        },
      });

      const processedObjects: OwnedObject[] = result.data
        .filter(obj => obj.data)
        .map(obj => ({
          objectId: obj.data!.objectId,
          type: obj.data!.type || 'Unknown',
          digest: obj.data!.digest,
          version: obj.data!.version,
        }));

      setObjects(processedObjects);
    } catch (err) {
      console.error('Error fetching owned objects:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch objects');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnedObjects();
  }, [account?.address]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Items</h2>
            <p className="text-gray-600">Digital assets owned by your wallet</p>
          </div>
        </div>
        <button
          onClick={fetchOwnedObjects}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3 text-gray-500">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="font-medium">Loading your items...</span>
          </div>
        </div>
      ) : objects.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500">
            You don't own any objects yet. Try minting a widget to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {objects.map((object) => (
              <div
                key={object.objectId}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {formatObjectType(object.type)}
                    </h3>
                    <p className="text-sm text-gray-500 font-mono">
                      {shortenAddress(object.objectId)}
                    </p>
                  </div>
                  <button
                    onClick={() => openInExplorer(object.objectId)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="View in explorer"
                  >
                    <ExternalLink className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Version:</span>
                    <span className="font-mono text-gray-700">{object.version}</span>
                  </div>
                  <div className="text-xs text-gray-400 font-mono mt-2 p-2 bg-gray-50 rounded">
                    <div className="truncate">Type: {object.type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Total items:</strong> {objects.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Only objects with proper metadata are displayed. Some system objects may be filtered out.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnedObjects;
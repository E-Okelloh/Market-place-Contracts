import React, { useState } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { Wallet, User, Copy, ExternalLink, Check } from 'lucide-react';
import { shortenAddress, openInExplorer, copyToClipboard } from './utils/formatters';

const WalletStatus: React.FC = () => {
  const account = useCurrentAccount();
  const [copied, setCopied] = useState(false);

  if (!account) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <Wallet className="h-4 w-4" />
        <span className="text-sm font-medium">Not Connected</span>
      </div>
    );
  }

  const handleCopyAddress = async () => {
    const success = await copyToClipboard(account.address);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenExplorer = () => {
    openInExplorer(account.address);
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="bg-green-100 rounded-full p-2">
        <User className="h-4 w-4 text-green-600" />
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-900">
          {shortenAddress(account.address)}
        </span>
        <div className="flex items-center space-x-1">
          <button
            onClick={handleCopyAddress}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Copy address"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-600" />
            ) : (
              <Copy className="h-3 w-3 text-gray-500" />
            )}
          </button>
          <button
            onClick={handleOpenExplorer}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="View in explorer"
          >
            <ExternalLink className="h-3 w-3 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletStatus;
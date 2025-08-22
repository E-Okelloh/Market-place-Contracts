// types/index.ts - All type definitions for the project

export interface TransactionStatus {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export interface OwnedObject {
  objectId: string;
  type: string;
  digest: string;
  version: string;
}

export interface MarketplaceItem {
  id: string;
  objectId: string;
  price: string;
  seller: string;
  listed: boolean;
  type?: string;
}

export interface Marketplace {
  id: string;
  coinType: string;
  itemCount: number;
  created: string;
}

// Navigation types
export interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType;
}

// Transaction execution options
export interface TransactionOptions {
  onSuccess?: (digest: string) => void;
  successMessage?: string;
  onError?: (error: string) => void;
}
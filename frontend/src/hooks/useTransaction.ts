import { useState, useCallback } from 'react';
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { TransactionStatus } from '../types';

export const useTransaction = () => {
  const [status, setStatus] = useState<TransactionStatus>({
    status: 'idle',
    message: ''
  });

  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const executeTransaction = useCallback(
    (
      transaction: Transaction,
      options?: {
        onSuccess?: (digest: string) => void;
        successMessage?: string;
        onError?: (error: string) => void;
      }
    ) => {
      setStatus({ status: 'loading', message: 'Processing transaction...' });

      signAndExecute(
        { transaction },
        {
          onSuccess: (result) => {
            const message = options?.successMessage || `Transaction successful! Digest: ${result.digest}`;
            setStatus({ status: 'success', message });
            options?.onSuccess?.(result.digest);
          },
          onError: (error) => {
            const message = `Transaction failed: ${error.message}`;
            setStatus({ status: 'error', message });
            options?.onError?.(error.message);
          },
        }
      );
    },
    [signAndExecute]
  );

  const resetStatus = useCallback(() => {
    setStatus({ status: 'idle', message: '' });
  }, []);

  return {
    status,
    executeTransaction,
    resetStatus,
    isLoading: status.status === 'loading',
  };
};
"use client";

import {
  useWallets,
  useDelegatedActions,
  type ConnectedWallet,
} from "@privy-io/react-auth";
import { useCallback, useMemo, useState } from "react";
import type { Address, Hash, Hex, TransactionRequest } from "viem";

export interface SignTransactionParams {
  /**
   * Transaction to sign and send
   */
  transaction: TransactionRequest;
  /**
   * Chain ID for the transaction
   */
  chainId?: number;
}

export interface SignMessageParams {
  /**
   * Message to sign (string or hex bytes)
   */
  message: string | Hex;
}

export interface UseDelegatedSignerReturn {
  /**
   * Sign and send a transaction without popup (if wallet is delegated)
   * Returns the transaction hash
   */
  signTransaction: (params: SignTransactionParams) => Promise<Hash>;
  /**
   * Sign a message without popup (if wallet is delegated)
   * Returns the signature
   */
  signMessage: (params: SignMessageParams) => Promise<Hex>;
  /**
   * Delegate the embedded wallet to enable popup-free signing
   * Users must approve this once, then subsequent signing won't show popups
   */
  delegateWallet: () => Promise<void>;
  /**
   * Whether the embedded wallet has been delegated
   */
  isDelegated: boolean;
  /**
   * Whether a signing operation is in progress
   */
  isSigning: boolean;
  /**
   * Whether delegated signing is available
   * (requires embedded wallet)
   */
  isAvailable: boolean;
  /**
   * Error from the last signing operation
   */
  error: Error | null;
  /**
   * Clear the error state
   */
  clearError: () => void;
  /**
   * The embedded wallet instance
   */
  embeddedWallet: ConnectedWallet | undefined;
}

/**
 * useDelegatedSigner hook enables transaction and message signing
 * WITHOUT showing popups to the user.
 *
 * This is the key feature for a smooth UX - users can perform actions
 * in the app without being interrupted by signature confirmation modals.
 *
 * Requirements:
 * - User must be logged in with Privy
 * - User must delegate their wallet (one-time approval)
 *
 * @example
 * ```tsx
 * function SendButton() {
 *   const { signTransaction, delegateWallet, isDelegated, isSigning } = useDelegatedSigner();
 *
 *   // First, ensure wallet is delegated
 *   if (!isDelegated) {
 *     return <button onClick={delegateWallet}>Enable Fast Signing</button>;
 *   }
 *
 *   const handleSend = async () => {
 *     const txHash = await signTransaction({
 *       transaction: {
 *         to: '0x...',
 *         value: parseEther('0.1'),
 *       },
 *     });
 *     console.log('Transaction sent:', txHash);
 *   };
 *
 *   return (
 *     <button onClick={handleSend} disabled={isSigning}>
 *       {isSigning ? 'Sending...' : 'Send'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useDelegatedSigner(): UseDelegatedSignerReturn {
  const { wallets } = useWallets();
  const { delegateWallet: privyDelegateWallet } = useDelegatedActions();
  const [isSigning, setIsSigning] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Get the embedded wallet (supports delegated signing)
  const embeddedWallet = useMemo(
    () => wallets.find((wallet) => wallet.walletClientType === "privy"),
    [wallets]
  );

  const isAvailable = !!embeddedWallet;

  // Check if the wallet is delegated
  const isDelegated = useMemo(() => {
    if (!embeddedWallet) return false;
    // Privy wallets have a delegated property when delegation is enabled
    return (embeddedWallet as ConnectedWallet & { delegated?: boolean })
      .delegated === true;
  }, [embeddedWallet]);

  // Delegate the wallet to enable popup-free signing
  const delegateWallet = useCallback(async () => {
    if (!embeddedWallet) {
      throw new Error(
        "No embedded wallet available. Please log in with Privy first."
      );
    }

    try {
      await privyDelegateWallet({
        address: embeddedWallet.address,
        chainType: "ethereum",
      });
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to delegate wallet");
      setError(error);
      throw error;
    }
  }, [embeddedWallet, privyDelegateWallet]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const signTransaction = useCallback(
    async ({ transaction, chainId }: SignTransactionParams): Promise<Hash> => {
      if (!embeddedWallet) {
        throw new Error(
          "No embedded wallet available. Please log in with Privy first."
        );
      }

      setIsSigning(true);
      setError(null);

      try {
        // Get the wallet provider
        const provider = await embeddedWallet.getEthereumProvider();

        // Switch chain if needed
        if (chainId) {
          try {
            await provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: `0x${chainId.toString(16)}` }],
            });
          } catch (switchError: unknown) {
            // Chain might need to be added first
            console.warn("Failed to switch chain:", switchError);
          }
        }

        // Prepare the transaction parameters
        const txParams = {
          from: embeddedWallet.address as Address,
          to: transaction.to as Address,
          value: transaction.value
            ? `0x${transaction.value.toString(16)}`
            : undefined,
          data: transaction.data,
          gas: transaction.gas
            ? `0x${transaction.gas.toString(16)}`
            : undefined,
          gasPrice: transaction.gasPrice
            ? `0x${transaction.gasPrice.toString(16)}`
            : undefined,
          maxFeePerGas: transaction.maxFeePerGas
            ? `0x${transaction.maxFeePerGas.toString(16)}`
            : undefined,
          maxPriorityFeePerGas: transaction.maxPriorityFeePerGas
            ? `0x${transaction.maxPriorityFeePerGas.toString(16)}`
            : undefined,
          nonce: transaction.nonce
            ? `0x${transaction.nonce.toString(16)}`
            : undefined,
        };

        // Send the transaction (delegated - no popup)
        const txHash = (await provider.request({
          method: "eth_sendTransaction",
          params: [txParams],
        })) as Hash;

        return txHash;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Transaction failed");
        setError(error);
        throw error;
      } finally {
        setIsSigning(false);
      }
    },
    [embeddedWallet]
  );

  const signMessage = useCallback(
    async ({ message }: SignMessageParams): Promise<Hex> => {
      if (!embeddedWallet) {
        throw new Error(
          "No embedded wallet available. Please log in with Privy first."
        );
      }

      setIsSigning(true);
      setError(null);

      try {
        const provider = await embeddedWallet.getEthereumProvider();

        // Convert string message to hex if needed
        const messageHex =
          typeof message === "string" && !message.startsWith("0x")
            ? (`0x${Buffer.from(message).toString("hex")}` as Hex)
            : (message as Hex);

        // Sign the message (delegated - no popup)
        const signature = (await provider.request({
          method: "personal_sign",
          params: [messageHex, embeddedWallet.address],
        })) as Hex;

        return signature;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Message signing failed");
        setError(error);
        throw error;
      } finally {
        setIsSigning(false);
      }
    },
    [embeddedWallet]
  );

  return {
    signTransaction,
    signMessage,
    delegateWallet,
    isDelegated,
    isSigning,
    isAvailable,
    error,
    clearError,
    embeddedWallet,
  };
}

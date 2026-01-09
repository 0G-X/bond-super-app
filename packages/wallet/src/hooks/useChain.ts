"use client";

import { useWallets } from "@privy-io/react-auth";
import { useCallback, useMemo, useState } from "react";
import type { Chain } from "viem";
import {
  supportedChains,
  defaultChain,
  getChainById,
  isChainSupported,
  type SupportedChainId,
} from "../chains";

export interface UseChainReturn {
  /**
   * The currently active chain
   */
  currentChain: Chain;
  /**
   * The current chain ID
   */
  chainId: number;
  /**
   * All supported chains
   */
  supportedChains: readonly Chain[];
  /**
   * Switch to a different chain
   */
  switchChain: (chainId: SupportedChainId) => Promise<void>;
  /**
   * Whether a chain switch is in progress
   */
  isSwitching: boolean;
  /**
   * Error from the last chain switch attempt
   */
  error: Error | null;
  /**
   * Check if a chain ID is supported
   */
  isChainSupported: (chainId: number) => boolean;
  /**
   * Clear the error state
   */
  clearError: () => void;
}

/**
 * useChain hook provides chain switching functionality
 *
 * @example
 * ```tsx
 * function ChainSwitcher() {
 *   const { currentChain, supportedChains, switchChain, isSwitching } = useChain();
 *
 *   return (
 *     <select
 *       value={currentChain.id}
 *       onChange={(e) => switchChain(Number(e.target.value))}
 *       disabled={isSwitching}
 *     >
 *       {supportedChains.map((chain) => (
 *         <option key={chain.id} value={chain.id}>
 *           {chain.name}
 *         </option>
 *       ))}
 *     </select>
 *   );
 * }
 * ```
 */
export function useChain(): UseChainReturn {
  const { wallets } = useWallets();
  const [isSwitching, setIsSwitching] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [selectedChainId, setSelectedChainId] = useState<number>(
    defaultChain.id
  );

  // Get the embedded wallet
  const embeddedWallet = useMemo(
    () => wallets.find((wallet) => wallet.walletClientType === "privy"),
    [wallets]
  );

  // Current chain based on wallet or local state
  const currentChain = useMemo(() => {
    return getChainById(selectedChainId) ?? defaultChain;
  }, [selectedChainId]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const switchChain = useCallback(
    async (chainId: SupportedChainId): Promise<void> => {
      if (!isChainSupported(chainId)) {
        const err = new Error(`Chain ${chainId} is not supported`);
        setError(err);
        throw err;
      }

      setIsSwitching(true);
      setError(null);

      try {
        if (embeddedWallet) {
          const provider = await embeddedWallet.getEthereumProvider();

          try {
            // Try to switch to the chain
            await provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: `0x${chainId.toString(16)}` }],
            });
          } catch (switchError: unknown) {
            // If the chain is not added, add it first
            const chain = getChainById(chainId);
            if (chain) {
              await provider.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName: chain.name,
                    nativeCurrency: chain.nativeCurrency,
                    rpcUrls: [chain.rpcUrls.default.http[0]],
                    blockExplorerUrls: chain.blockExplorers?.default
                      ? [chain.blockExplorers.default.url]
                      : undefined,
                  },
                ],
              });
            } else {
              throw switchError;
            }
          }
        }

        // Update local state
        setSelectedChainId(chainId);
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to switch chain");
        setError(error);
        throw error;
      } finally {
        setIsSwitching(false);
      }
    },
    [embeddedWallet]
  );

  return {
    currentChain,
    chainId: selectedChainId,
    supportedChains,
    switchChain,
    isSwitching,
    error,
    isChainSupported,
    clearError,
  };
}

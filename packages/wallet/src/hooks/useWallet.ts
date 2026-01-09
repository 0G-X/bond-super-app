"use client";

import { usePrivy, useWallets, type User } from "@privy-io/react-auth";
import { useCallback, useMemo } from "react";
import type { Address } from "viem";

export interface UseWalletReturn {
  /**
   * The connected wallet address, or undefined if not connected
   */
  address: Address | undefined;
  /**
   * Whether the user is authenticated and has a wallet connected
   */
  isConnected: boolean;
  /**
   * Whether authentication/connection is in progress
   */
  isLoading: boolean;
  /**
   * Whether the user is authenticated (logged in)
   */
  isAuthenticated: boolean;
  /**
   * The authenticated Privy user, or null if not authenticated
   */
  user: User | null;
  /**
   * Open the Privy login modal
   */
  login: () => void;
  /**
   * Log out and disconnect
   */
  logout: () => Promise<void>;
  /**
   * The embedded wallet instance (for advanced usage)
   */
  embeddedWallet: ReturnType<typeof useWallets>["wallets"][number] | undefined;
  /**
   * All connected wallets
   */
  wallets: ReturnType<typeof useWallets>["wallets"];
}

/**
 * useWallet hook provides wallet connection state and actions
 *
 * @example
 * ```tsx
 * function WalletButton() {
 *   const { address, isConnected, login, logout } = useWallet();
 *
 *   if (isConnected) {
 *     return (
 *       <div>
 *         <span>{address}</span>
 *         <button onClick={logout}>Disconnect</button>
 *       </div>
 *     );
 *   }
 *
 *   return <button onClick={login}>Connect Wallet</button>;
 * }
 * ```
 */
export function useWallet(): UseWalletReturn {
  const { login, logout, authenticated, ready, user } = usePrivy();
  const { wallets } = useWallets();

  // Find the embedded wallet (created by Privy)
  const embeddedWallet = useMemo(
    () => wallets.find((wallet) => wallet.walletClientType === "privy"),
    [wallets]
  );

  // Get the primary wallet address
  // Prefer embedded wallet, fall back to first connected wallet
  const address = useMemo(() => {
    const wallet = embeddedWallet ?? wallets[0];
    return wallet?.address as Address | undefined;
  }, [embeddedWallet, wallets]);

  // User is connected if authenticated and has at least one wallet
  const isConnected = authenticated && wallets.length > 0;

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  return {
    address,
    isConnected,
    isLoading: !ready,
    isAuthenticated: authenticated,
    user,
    login,
    logout: handleLogout,
    embeddedWallet,
    wallets,
  };
}

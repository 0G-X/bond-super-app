import { defineChain, type Chain } from "viem";

/**
 * 0G Mainnet Chain Configuration
 * Chain ID: 16600
 */
export const zeroGMainnet = defineChain({
  id: 16600,
  name: "0G Mainnet",
  nativeCurrency: {
    name: "0G",
    symbol: "0G",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://evmrpc-mainnet.0g.ai"],
    },
    public: {
      http: ["https://evmrpc-mainnet.0g.ai"],
    },
  },
  blockExplorers: {
    default: {
      name: "0G Explorer",
      url: "https://chainscan-mainnet.0g.ai",
    },
  },
  contracts: {},
});

/**
 * 0G Testnet Chain Configuration
 * Chain ID: 16601
 */
export const zeroGTestnet = defineChain({
  id: 16601,
  name: "0G Testnet",
  nativeCurrency: {
    name: "0G",
    symbol: "0G",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://evmrpc-testnet.0g.ai"],
    },
    public: {
      http: ["https://evmrpc-testnet.0g.ai"],
    },
  },
  blockExplorers: {
    default: {
      name: "0G Testnet Explorer",
      url: "https://chainscan-testnet.0g.ai",
    },
  },
  testnet: true,
  contracts: {},
});

/**
 * All supported chains for the Bond Super App
 */
export const supportedChains = [zeroGMainnet, zeroGTestnet] as const;

/**
 * Type for supported chain IDs
 */
export type SupportedChainId = (typeof supportedChains)[number]["id"];

/**
 * Default chain for the application
 */
export const defaultChain = zeroGMainnet;

/**
 * Get chain by ID
 */
export function getChainById(chainId: number): Chain | undefined {
  return supportedChains.find((chain) => chain.id === chainId);
}

/**
 * Check if a chain ID is supported
 */
export function isChainSupported(chainId: number): chainId is SupportedChainId {
  return supportedChains.some((chain) => chain.id === chainId);
}

export type { Chain };

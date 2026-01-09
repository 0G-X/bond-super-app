import type { Address } from "viem";
import { type SupportedChainId, zeroGMainnet, zeroGTestnet } from "../chains";

/**
 * Contract names used in the Bond Super App
 * Add new contract names here as the app grows
 */
export type ContractName =
  | "BondToken"
  | "BondStaking"
  | "BondGovernance"
  | "BondTreasury"
  | "BondVault"
  | "BondRouter";

/**
 * Contract addresses organized by chain ID
 * Structure: { [chainId]: { [contractName]: address } }
 */
export type ContractRegistry = {
  [chainId in SupportedChainId]?: {
    [contract in ContractName]?: Address;
  };
};

/**
 * Contract address registry for all supported chains
 *
 * Add deployed contract addresses here as they become available.
 * This serves as the single source of truth for contract addresses.
 */
export const contractRegistry: ContractRegistry = {
  // 0G Mainnet (16600)
  [zeroGMainnet.id]: {
    // Contracts will be added after deployment
    // BondToken: '0x...',
    // BondStaking: '0x...',
    // BondGovernance: '0x...',
    // BondTreasury: '0x...',
    // BondVault: '0x...',
    // BondRouter: '0x...',
  },
  // 0G Testnet (16601)
  [zeroGTestnet.id]: {
    // Testnet contracts will be added after deployment
    // BondToken: '0x...',
    // BondStaking: '0x...',
    // BondGovernance: '0x...',
    // BondTreasury: '0x...',
    // BondVault: '0x...',
    // BondRouter: '0x...',
  },
};

/**
 * Get the address of a contract on a specific chain
 *
 * @param contractName - The name of the contract
 * @param chainId - The chain ID to get the address for
 * @returns The contract address, or undefined if not found
 *
 * @example
 * ```ts
 * import { getContractAddress, zeroGMainnet } from '@bond/wallet';
 *
 * const tokenAddress = getContractAddress('BondToken', zeroGMainnet.id);
 * if (tokenAddress) {
 *   // Use the address
 * }
 * ```
 */
export function getContractAddress(
  contractName: ContractName,
  chainId: SupportedChainId
): Address | undefined {
  return contractRegistry[chainId]?.[contractName];
}

/**
 * Get the address of a contract, throwing if not found
 *
 * @param contractName - The name of the contract
 * @param chainId - The chain ID to get the address for
 * @returns The contract address
 * @throws Error if the contract is not deployed on the specified chain
 *
 * @example
 * ```ts
 * import { getContractAddressOrThrow, zeroGMainnet } from '@bond/wallet';
 *
 * // This will throw if BondToken is not deployed on mainnet
 * const tokenAddress = getContractAddressOrThrow('BondToken', zeroGMainnet.id);
 * ```
 */
export function getContractAddressOrThrow(
  contractName: ContractName,
  chainId: SupportedChainId
): Address {
  const address = getContractAddress(contractName, chainId);
  if (!address) {
    throw new Error(
      `Contract ${contractName} is not deployed on chain ${chainId}`
    );
  }
  return address;
}

/**
 * Check if a contract is deployed on a specific chain
 *
 * @param contractName - The name of the contract
 * @param chainId - The chain ID to check
 * @returns Whether the contract is deployed
 */
export function isContractDeployed(
  contractName: ContractName,
  chainId: SupportedChainId
): boolean {
  return !!getContractAddress(contractName, chainId);
}

/**
 * Get all deployed contracts for a chain
 *
 * @param chainId - The chain ID to get contracts for
 * @returns An object with contract names and their addresses
 */
export function getDeployedContracts(
  chainId: SupportedChainId
): Partial<Record<ContractName, Address>> {
  return contractRegistry[chainId] ?? {};
}

/**
 * Add or update a contract address in the registry at runtime
 * Useful for testing or dynamic contract deployments
 *
 * @param contractName - The name of the contract
 * @param chainId - The chain ID
 * @param address - The contract address
 */
export function setContractAddress(
  contractName: ContractName,
  chainId: SupportedChainId,
  address: Address
): void {
  if (!contractRegistry[chainId]) {
    contractRegistry[chainId] = {};
  }
  contractRegistry[chainId]![contractName] = address;
}

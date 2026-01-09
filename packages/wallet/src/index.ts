/**
 * @bond/wallet - Wallet integration package for Bond Super App
 *
 * Provides:
 * - WalletProvider: Wrap your app for wallet functionality
 * - useWallet: Access wallet connection state and actions
 * - useDelegatedSigner: Sign transactions/messages without popups
 * - useChain: Switch between supported chains
 * - Chain configs: 0G Mainnet and Testnet
 * - Contract registry: Access deployed contract addresses
 */

// Provider
export {
  WalletProvider,
  type WalletProviderProps,
  wagmiConfig,
  privyConfig,
  queryClient,
} from "./WalletProvider";

// Hooks
export {
  useWallet,
  type UseWalletReturn,
  useDelegatedSigner,
  type UseDelegatedSignerReturn,
  type SignTransactionParams,
  type SignMessageParams,
  useChain,
  type UseChainReturn,
} from "./hooks";

// Chains
export {
  zeroGMainnet,
  zeroGTestnet,
  supportedChains,
  defaultChain,
  getChainById,
  isChainSupported,
  type SupportedChainId,
  type Chain,
} from "./chains";

// Contracts
export {
  contractRegistry,
  getContractAddress,
  getContractAddressOrThrow,
  isContractDeployed,
  getDeployedContracts,
  setContractAddress,
  type ContractName,
  type ContractRegistry,
} from "./contracts";

/**
 * @bond/state - State Management Utilities
 *
 * Provides utilities for creating consistent Zustand stores across all Bond modules.
 * Features:
 * - Immer integration for immutable updates
 * - Optional localStorage persistence with 'bond-' prefix
 * - SSR-safe (handles server-side rendering)
 * - Full TypeScript support
 *
 * @example
 * ```typescript
 * import { createModuleStore } from '@bond/state';
 *
 * const useOrderStore = createModuleStore({
 *   name: 'trade-order',
 *   initialState: { side: 'long', size: '' },
 *   actions: (set) => ({
 *     setSide: (side) => set((state) => { state.side = side; }),
 *   }),
 *   persist: false,
 * });
 * ```
 */

// Main store factory
export { createModuleStore, type ModuleStoreConfig } from "./createModuleStore";

// Persist utilities
export {
	bondPersist,
	createStorageKey,
	createBondStorage,
	createPersistOptions,
	isBrowser,
	clearAllBondStores,
	clearBondStore,
	getPersistedState,
	type BondPersistConfig,
} from "./persist";

// Type utilities
export type {
	ExtractState,
	ExtractActions,
	ExtractStateOnly,
	DeepPartial,
	Selector,
	ImmerSet,
	ActionsCreator,
	RequireKeys,
	OptionalKeys,
	StorageOperations,
	PersistedState,
	ComputedSelector,
} from "./types";

export { isFunction } from "./types";

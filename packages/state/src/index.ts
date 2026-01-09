/**
 * @bond/state - State Management Utilities
 *
 * Provides utilities for creating consistent Zustand stores across all Bond modules.
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
 * });
 * ```
 */

export { createModuleStore, type ModuleStoreConfig } from "./createModuleStore";
export type {
  ExtractState,
  ExtractActions,
  DeepPartial,
  Selector,
} from "./types";

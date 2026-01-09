/**
 * @bond/state - Module Store Factory
 * Creates Zustand stores with immer middleware and optional persistence
 */

import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, type PersistOptions } from "zustand/middleware";

/**
 * Configuration for creating a module store
 */
export interface ModuleStoreConfig<T extends object> {
  /** Unique name for the store (used for persistence key) */
  name: string;
  /** Initial state */
  initialState: T;
  /** Actions that modify state */
  actions: (
    set: (fn: (state: T) => void) => void,
    get: () => T
  ) => Record<string, (...args: unknown[]) => void>;
  /** Whether to persist to localStorage (default: false) */
  persist?: boolean;
}

/**
 * Create a module store with immer middleware and optional persistence
 *
 * @example
 * ```typescript
 * const useOrderStore = createModuleStore({
 *   name: 'trade-order',
 *   initialState: {
 *     side: 'long' as const,
 *     size: '',
 *     price: '',
 *   },
 *   actions: (set, get) => ({
 *     setSide: (side: 'long' | 'short') => set((state) => {
 *       state.side = side;
 *     }),
 *     setSize: (size: string) => set((state) => {
 *       state.size = size;
 *     }),
 *     reset: () => set((state) => {
 *       state.side = 'long';
 *       state.size = '';
 *       state.price = '';
 *     }),
 *   }),
 *   persist: false,
 * });
 * ```
 */
export function createModuleStore<T extends object>({
  name,
  initialState,
  actions,
  persist: shouldPersist = false,
}: ModuleStoreConfig<T>) {
  const storageKey = `bond-${name}`;

  // Create the base store creator with immer
  const storeCreator: StateCreator<T, [["zustand/immer", never]]> = (
    set,
    get
  ) => ({
    ...initialState,
    ...actions(set as (fn: (state: T) => void) => void, get),
  });

  // Apply immer middleware
  const withImmer = immer(storeCreator);

  // Optionally apply persist middleware
  if (shouldPersist) {
    const persistConfig: PersistOptions<T> = {
      name: storageKey,
      // Only persist in browser
      skipHydration: typeof window === "undefined",
    };

    return create(persist(withImmer, persistConfig));
  }

  return create(withImmer);
}

export default createModuleStore;

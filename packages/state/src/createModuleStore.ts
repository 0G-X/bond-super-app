/**
 * @bond/state - Module Store Factory
 * Creates Zustand stores with immer middleware and optional persistence
 */

import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, type PersistOptions } from "zustand/middleware";
import { createStorageKey, createBondStorage, isBrowser } from "./persist";

/**
 * Type for the immer-enabled set function
 */
type ImmerSet<T> = (fn: (state: T) => void) => void;

/**
 * Configuration for creating a module store
 */
export interface ModuleStoreConfig<
	TState extends object,
	TActions extends object = object,
> {
	/** Unique name for the store (used for persistence key with 'bond-' prefix) */
	name: string;
	/** Initial state values */
	initialState: TState;
	/** Actions that modify state using immer */
	actions?: (set: ImmerSet<TState & TActions>, get: () => TState & TActions) => TActions;
	/** Whether to persist to localStorage (default: false) */
	persist?: boolean;
	/** Select which parts of state to persist (only used if persist is true) */
	partialize?: (state: TState & TActions) => Partial<TState>;
	/** Version number for migrations */
	version?: number;
	/** Migration function when version changes */
	migrate?: (persistedState: unknown, version: number) => TState & TActions;
}

/**
 * Create a module store with immer middleware and optional persistence
 *
 * Features:
 * - Immer integration for immutable updates with mutable syntax
 * - Optional localStorage persistence with 'bond-' prefix
 * - SSR-safe (handles server-side rendering)
 * - Full TypeScript support
 *
 * @example
 * ```typescript
 * // Simple store without persistence
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
 *
 * // Usage in component
 * const side = useOrderStore((s) => s.side);
 * const { setSide, reset } = useOrderStore();
 * ```
 *
 * @example
 * ```typescript
 * // Store with persistence
 * const useSettingsStore = createModuleStore({
 *   name: 'user-settings',
 *   initialState: {
 *     theme: 'dark' as 'light' | 'dark',
 *     notifications: true,
 *   },
 *   actions: (set) => ({
 *     setTheme: (theme: 'light' | 'dark') => set((state) => {
 *       state.theme = theme;
 *     }),
 *     toggleNotifications: () => set((state) => {
 *       state.notifications = !state.notifications;
 *     }),
 *   }),
 *   persist: true, // Will be stored as 'bond-user-settings'
 * });
 * ```
 */
export function createModuleStore<
	TState extends object,
	TActions extends object = object,
>(config: ModuleStoreConfig<TState, TActions>) {
	const {
		name,
		initialState,
		actions,
		persist: shouldPersist = false,
		partialize,
		version = 0,
		migrate,
	} = config;

	type StoreState = TState & TActions;

	// Create the base store creator with immer
	const storeCreator: StateCreator<StoreState, [["zustand/immer", never]]> = (
		set,
		get
	) => {
		const immerSet: ImmerSet<StoreState> = (fn) => {
			set((state) => {
				fn(state);
			});
		};

		const baseState = { ...initialState } as StoreState;
		const storeActions = actions ? actions(immerSet, get) : ({} as TActions);

		return {
			...baseState,
			...storeActions,
		};
	};

	// Apply immer middleware
	const withImmer = immer(storeCreator);

	// Optionally apply persist middleware
	if (shouldPersist) {
		const persistConfig: PersistOptions<StoreState, Partial<StoreState>> = {
			name: createStorageKey(name),
			storage: createBondStorage<StoreState>(),
			// Only persist state, not actions
			partialize: partialize ?? ((state) => {
				const stateOnly: Partial<TState> = {};
				for (const key of Object.keys(initialState) as Array<keyof TState>) {
					stateOnly[key] = state[key as keyof StoreState] as TState[keyof TState];
				}
				return stateOnly as Partial<StoreState>;
			}),
			version,
			migrate: migrate as PersistOptions<StoreState, Partial<StoreState>>["migrate"],
			// Skip hydration on server
			skipHydration: !isBrowser(),
		};

		return create(persist(withImmer, persistConfig));
	}

	return create(withImmer);
}

export default createModuleStore;

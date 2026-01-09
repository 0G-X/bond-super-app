/**
 * @bond/state - Type Utilities
 * Provides utility types for working with Zustand stores
 */

import type { StoreApi, UseBoundStore } from "zustand";

/**
 * Extract the state type from a Zustand store
 *
 * @example
 * ```typescript
 * const useStore = create(...);
 * type State = ExtractState<typeof useStore>;
 * ```
 */
export type ExtractState<S> = S extends UseBoundStore<StoreApi<infer T>>
	? T
	: S extends { getState: () => infer T }
		? T
		: never;

/**
 * Extract actions from a store (functions only)
 *
 * @example
 * ```typescript
 * type Actions = ExtractActions<typeof useStore>;
 * ```
 */
export type ExtractActions<T> = {
	[K in keyof T as T[K] extends (...args: unknown[]) => unknown
		? K
		: never]: T[K];
};

/**
 * Extract state-only properties (non-functions)
 */
export type ExtractStateOnly<T> = {
	[K in keyof T as T[K] extends (...args: unknown[]) => unknown
		? never
		: K]: T[K];
};

/**
 * Make all properties in T optional recursively
 */
export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object
		? T[P] extends (...args: unknown[]) => unknown
			? T[P]
			: DeepPartial<T[P]>
		: T[P];
};

/**
 * Store selector type
 *
 * @example
 * ```typescript
 * const selectCount: Selector<State, number> = (state) => state.count;
 * ```
 */
export type Selector<TState, TSelected> = (state: TState) => TSelected;

/**
 * Type for the immer-enabled set function used in actions
 */
export type ImmerSet<T> = (fn: (state: T) => void) => void;

/**
 * Actions creator function signature
 */
export type ActionsCreator<TState, TActions> = (
	set: ImmerSet<TState & TActions>,
	get: () => TState & TActions
) => TActions;

/**
 * Utility type to make specific keys required
 */
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Utility type to make specific keys optional
 */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Type for persist storage operations
 */
export interface StorageOperations {
	getItem: (name: string) => string | null | Promise<string | null>;
	setItem: (name: string, value: string) => void | Promise<void>;
	removeItem: (name: string) => void | Promise<void>;
}

/**
 * Persisted state wrapper type
 */
export interface PersistedState<T> {
	state: T;
	version: number;
}

/**
 * Type guard to check if a value is a function
 */
export function isFunction<T>(
	value: T | ((...args: unknown[]) => unknown)
): value is (...args: unknown[]) => unknown {
	return typeof value === "function";
}

/**
 * Type for computed/derived state selectors
 */
export type ComputedSelector<TState, TComputed> = {
	[K in keyof TComputed]: (state: TState) => TComputed[K];
};

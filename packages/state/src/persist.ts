/**
 * @bond/state - Persist Middleware
 * Wrapper around Zustand persist middleware with Bond-specific defaults
 */

import {
	persist as zustandPersist,
	createJSONStorage,
	type PersistOptions,
	type StorageValue,
} from "zustand/middleware";
import type { StateCreator } from "zustand";

/**
 * Storage key prefix for all Bond stores
 */
const STORAGE_PREFIX = "bond-";

/**
 * Check if we're in a browser environment
 */
export function isBrowser(): boolean {
	return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/**
 * Create a prefixed storage key
 */
export function createStorageKey(name: string): string {
	return `${STORAGE_PREFIX}${name}`;
}

/**
 * Bond-specific persist configuration
 */
export interface BondPersistConfig<T> {
	/** Store name (will be auto-prefixed with 'bond-') */
	name: string;
	/** Select which parts of state to persist */
	partialize?: (state: T) => Partial<T>;
	/** Version number for migrations */
	version?: number;
	/** Migration function when version changes */
	migrate?: (persistedState: unknown, version: number) => T | Promise<T>;
	/** Called when hydration is complete */
	onRehydrateStorage?: (state: T | undefined) => ((state?: T, error?: Error) => void) | void;
	/** Skip hydration on server (default: true in SSR) */
	skipHydration?: boolean;
}

/**
 * SSR-safe storage that handles server-side rendering
 */
export function createBondStorage<T>() {
	return createJSONStorage<T>(() => {
		if (!isBrowser()) {
			// Return a no-op storage for SSR
			return {
				getItem: () => null,
				setItem: () => {},
				removeItem: () => {},
			};
		}
		return localStorage;
	});
}

/**
 * Create Bond persist middleware options from config
 */
export function createPersistOptions<T>(
	config: BondPersistConfig<T>
): PersistOptions<T, Partial<T>> {
	const { name, partialize, version = 0, migrate, onRehydrateStorage, skipHydration } = config;

	return {
		name: createStorageKey(name),
		storage: createBondStorage<T>(),
		partialize: partialize ?? ((state) => state as Partial<T>),
		version,
		migrate: migrate as PersistOptions<T, Partial<T>>["migrate"],
		onRehydrateStorage,
		skipHydration: skipHydration ?? !isBrowser(),
	};
}

/**
 * Bond persist middleware wrapper
 * Automatically prefixes storage keys with 'bond-' and handles SSR
 *
 * @example
 * ```typescript
 * import { create } from 'zustand';
 * import { bondPersist } from '@bond/state';
 *
 * const useStore = create(
 *   bondPersist(
 *     (set) => ({
 *       count: 0,
 *       increment: () => set((state) => ({ count: state.count + 1 })),
 *     }),
 *     { name: 'counter' } // Will be stored as 'bond-counter'
 *   )
 * );
 * ```
 */
export function bondPersist<T>(
	stateCreator: StateCreator<T, [], []>,
	config: BondPersistConfig<T>
) {
	const persistOptions = createPersistOptions(config);
	return zustandPersist(stateCreator, persistOptions);
}

/**
 * Utility to clear all Bond persisted stores from localStorage
 */
export function clearAllBondStores(): void {
	if (!isBrowser()) return;

	const keysToRemove: string[] = [];

	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (key?.startsWith(STORAGE_PREFIX)) {
			keysToRemove.push(key);
		}
	}

	for (const key of keysToRemove) {
		localStorage.removeItem(key);
	}
}

/**
 * Utility to clear a specific Bond store from localStorage
 */
export function clearBondStore(name: string): void {
	if (!isBrowser()) return;

	const key = createStorageKey(name);
	localStorage.removeItem(key);
}

/**
 * Get persisted state for a Bond store (useful for debugging)
 */
export function getPersistedState<T>(name: string): StorageValue<T> | null {
	if (!isBrowser()) return null;

	const key = createStorageKey(name);
	const stored = localStorage.getItem(key);

	if (!stored) return null;

	try {
		return JSON.parse(stored) as StorageValue<T>;
	} catch {
		return null;
	}
}

export default bondPersist;

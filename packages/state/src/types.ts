/**
 * @bond/state - Type Utilities
 */

/**
 * Extract the state type from a Zustand store
 */
export type ExtractState<S> = S extends { getState: () => infer T } ? T : never;

/**
 * Extract actions from a store (non-state properties)
 */
export type ExtractActions<T> = {
  [K in keyof T as T[K] extends (...args: unknown[]) => unknown
    ? K
    : never]: T[K];
};

/**
 * Make all properties in T optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Store selector type
 */
export type Selector<T, U> = (state: T) => U;

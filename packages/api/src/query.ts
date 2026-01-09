/**
 * @bond/api - Query Utilities
 * QueryClient factory and query key helpers for React Query
 */

import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";

/**
 * Default QueryClient configuration with sensible defaults
 */
const DEFAULT_QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // Stale time - how long data is considered fresh (5 minutes)
      staleTime: 5 * 60 * 1000,
      // Garbage collection time - how long inactive data stays in cache (30 minutes)
      gcTime: 30 * 60 * 1000,
      // Retry failed requests up to 3 times
      retry: 3,
      // Exponential backoff for retries
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch on window focus (useful for keeping data fresh)
      refetchOnWindowFocus: true,
      // Don't refetch on mount if data is still fresh
      refetchOnMount: true,
      // Don't refetch on reconnect by default
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry mutations once
      retry: 1,
    },
  },
};

/**
 * Create a QueryClient with sensible defaults
 *
 * @param config - Optional configuration to override defaults
 * @returns A configured QueryClient instance
 *
 * @example
 * ```typescript
 * const queryClient = createQueryClient()
 *
 * // Or with custom config
 * const queryClient = createQueryClient({
 *   defaultOptions: {
 *     queries: {
 *       staleTime: 10 * 60 * 1000, // 10 minutes
 *     },
 *   },
 * })
 * ```
 */
export function createQueryClient(config?: QueryClientConfig): QueryClient {
  const mergedConfig: QueryClientConfig = {
    ...DEFAULT_QUERY_CLIENT_CONFIG,
    ...config,
    defaultOptions: {
      ...DEFAULT_QUERY_CLIENT_CONFIG.defaultOptions,
      ...config?.defaultOptions,
      queries: {
        ...DEFAULT_QUERY_CLIENT_CONFIG.defaultOptions?.queries,
        ...config?.defaultOptions?.queries,
      },
      mutations: {
        ...DEFAULT_QUERY_CLIENT_CONFIG.defaultOptions?.mutations,
        ...config?.defaultOptions?.mutations,
      },
    },
  };

  return new QueryClient(mergedConfig);
}

/**
 * Query key types for type safety
 */
export type QueryKeyPart = string | number | boolean | null | undefined | object;
export type QueryKey = readonly QueryKeyPart[];

/**
 * Query key factory definition
 */
export interface QueryKeyFactory<TKeys extends Record<string, (...args: never[]) => QueryKey>> {
  /** Base key for all queries in this factory */
  all: readonly [string];
  /** Generated key functions */
  keys: TKeys;
}

/**
 * Create a query key factory for consistent key generation
 *
 * @param scope - The base scope for all keys (e.g., 'users', 'posts')
 * @param keyDefinitions - Object defining key generators
 * @returns A query key factory with type-safe key generation
 *
 * @example
 * ```typescript
 * const userKeys = createQueryKeys('users', {
 *   list: (filters?: { status?: string }) => ['list', filters] as const,
 *   detail: (id: string) => ['detail', id] as const,
 *   profile: (id: string) => ['detail', id, 'profile'] as const,
 * })
 *
 * // Usage:
 * userKeys.all // ['users']
 * userKeys.keys.list() // ['users', 'list', undefined]
 * userKeys.keys.list({ status: 'active' }) // ['users', 'list', { status: 'active' }]
 * userKeys.keys.detail('123') // ['users', 'detail', '123']
 * ```
 */
export function createQueryKeys<
  TScope extends string,
  TKeys extends Record<string, (...args: never[]) => QueryKey>,
>(
  scope: TScope,
  keyDefinitions: TKeys
): {
  all: readonly [TScope];
  keys: {
    [K in keyof TKeys]: (
      ...args: Parameters<TKeys[K]>
    ) => readonly [TScope, ...ReturnType<TKeys[K]>];
  };
} {
  const all = [scope] as const;

  const keys = {} as {
    [K in keyof TKeys]: (
      ...args: Parameters<TKeys[K]>
    ) => readonly [TScope, ...ReturnType<TKeys[K]>];
  };

  for (const name of Object.keys(keyDefinitions)) {
    const keyFn = keyDefinitions[name];
    // biome-ignore lint/suspicious/noExplicitAny: Dynamic key generation requires any
    (keys as any)[name] = (...args: unknown[]) => {
      // biome-ignore lint/suspicious/noExplicitAny: Dynamic key generation requires any
      const keyParts = (keyFn as any)(...args);
      return [scope, ...keyParts] as const;
    };
  }

  return { all, keys };
}

/**
 * Simple query key builder for ad-hoc keys
 *
 * @param parts - Parts to include in the query key
 * @returns A readonly query key tuple
 *
 * @example
 * ```typescript
 * const key = queryKey('users', 'list', { page: 1 })
 * // Returns: ['users', 'list', { page: 1 }]
 * ```
 */
export function queryKey<T extends QueryKeyPart[]>(
  ...parts: T
): Readonly<T> {
  return parts as Readonly<T>;
}

/**
 * Invalidation helpers for query key patterns
 */
export const invalidationHelpers = {
  /**
   * Create an invalidation filter for all queries matching a scope
   */
  scope: (scope: string) => ({
    queryKey: [scope] as const,
  }),

  /**
   * Create an invalidation filter for exact key match
   */
  exact: (key: QueryKey) => ({
    queryKey: key,
    exact: true,
  }),

  /**
   * Create an invalidation filter with predicate
   */
  predicate: (fn: (key: QueryKey) => boolean) => ({
    predicate: (query: { queryKey: QueryKey }) => fn(query.queryKey),
  }),
};

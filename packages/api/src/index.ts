/**
 * @bond/api - API Client Package
 *
 * A typed API client with React Query integration for the Bond Super App.
 *
 * @example
 * ```typescript
 * import { createAPIClient, createQueryKeys, createQueryClient } from '@bond/api'
 *
 * // Create an API client
 * const api = createAPIClient({
 *   baseUrl: 'https://api.bond.app',
 *   getAuthToken: () => localStorage.getItem('token')
 * })
 *
 * // Make typed requests
 * const user = await api.get<User>('/user/me')
 *
 * // Create query keys for React Query
 * const userKeys = createQueryKeys('users', {
 *   list: (filters?: { status?: string }) => ['list', filters] as const,
 *   detail: (id: string) => ['detail', id] as const,
 * })
 *
 * // Create a QueryClient with sensible defaults
 * const queryClient = createQueryClient()
 * ```
 */

// Types
export type {
  APIClient,
  APIClientConfig,
  APIError,
  APIResponse,
  HTTPMethod,
  RequestConfig,
} from "./types";

// Client
export { createAPIClient, APIClientError } from "./client";

// Query utilities
export {
  createQueryClient,
  createQueryKeys,
  queryKey,
  invalidationHelpers,
  type QueryKey,
  type QueryKeyPart,
  type QueryKeyFactory,
} from "./query";

// Re-export commonly used React Query types for convenience
export {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  useSuspenseQuery,
  type UseQueryOptions,
  type UseMutationOptions,
  type UseQueryResult,
  type UseMutationResult,
} from "@tanstack/react-query";

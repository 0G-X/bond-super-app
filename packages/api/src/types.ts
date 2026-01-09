/**
 * @bond/api - Type definitions
 */

/**
 * Supported HTTP methods for API requests
 */
export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

/**
 * API Error type for typed error handling
 */
export interface APIError {
  /** HTTP status code */
  status: number;
  /** Error message */
  message: string;
  /** Error code for programmatic handling */
  code?: string;
  /** Additional error details */
  details?: Record<string, unknown>;
}

/**
 * Generic API response wrapper type
 */
export interface APIResponse<T> {
  /** Response data */
  data: T;
  /** Whether the request was successful */
  success: boolean;
  /** Optional message from the server */
  message?: string;
  /** Optional metadata */
  meta?: {
    /** Current page (for paginated responses) */
    page?: number;
    /** Items per page */
    perPage?: number;
    /** Total number of items */
    total?: number;
    /** Total number of pages */
    totalPages?: number;
  };
}

/**
 * Request configuration options
 */
export interface RequestConfig {
  /** Request headers */
  headers?: Record<string, string>;
  /** Query parameters */
  params?: Record<string, string | number | boolean | undefined>;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Whether to include credentials */
  credentials?: RequestCredentials;
  /** AbortSignal for request cancellation */
  signal?: AbortSignal;
  /** Skip authentication header */
  skipAuth?: boolean;
}

/**
 * Configuration for creating an API client
 */
export interface APIClientConfig {
  /** Base URL for all API requests */
  baseUrl: string;
  /** Function to retrieve the auth token */
  getAuthToken?: () => string | null | undefined | Promise<string | null | undefined>;
  /** Default headers to include in all requests */
  defaultHeaders?: Record<string, string>;
  /** Default timeout in milliseconds */
  defaultTimeout?: number;
  /** Called before each request */
  onRequest?: (url: string, options: RequestInit) => void | Promise<void>;
  /** Called after each response */
  onResponse?: (response: Response) => void | Promise<void>;
  /** Called on errors */
  onError?: (error: APIError) => void | Promise<void>;
}

/**
 * API client interface
 */
export interface APIClient {
  /** Perform a GET request */
  get<T>(endpoint: string, config?: RequestConfig): Promise<T>;
  /** Perform a POST request */
  post<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<T>;
  /** Perform a PUT request */
  put<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<T>;
  /** Perform a DELETE request */
  delete<T>(endpoint: string, config?: RequestConfig): Promise<T>;
  /** Perform a PATCH request */
  patch<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<T>;
}

/**
 * @bond/api - API Client
 * A typed fetch wrapper with authentication and error handling
 */

import type {
  APIClient,
  APIClientConfig,
  APIError,
  HTTPMethod,
  RequestConfig,
} from "./types";

/**
 * Custom error class for API errors
 */
export class APIClientError extends Error implements APIError {
  public readonly status: number;
  public readonly code?: string;
  public readonly details?: Record<string, unknown>;

  constructor(error: APIError) {
    super(error.message);
    this.name = "APIClientError";
    this.status = error.status;
    this.code = error.code;
    this.details = error.details;
  }
}

/**
 * Build URL with query parameters
 */
function buildUrl(
  baseUrl: string,
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  // Remove trailing slash from baseUrl and leading slash from endpoint
  const normalizedBase = baseUrl.replace(/\/$/, "");
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  const url = new URL(`${normalizedBase}${normalizedEndpoint}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    }
  }

  return url.toString();
}

/**
 * Parse error response from the server
 */
async function parseErrorResponse(response: Response): Promise<APIError> {
  let message = `Request failed with status ${response.status}`;
  let code: string | undefined;
  let details: Record<string, unknown> | undefined;

  try {
    const errorBody = await response.json();
    if (typeof errorBody === "object" && errorBody !== null) {
      message = errorBody.message || errorBody.error || message;
      code = errorBody.code;
      details = errorBody.details || errorBody;
    }
  } catch {
    // Response body is not JSON, use default message
    try {
      const text = await response.text();
      if (text) {
        message = text;
      }
    } catch {
      // Ignore if we can't read the body
    }
  }

  return {
    status: response.status,
    message,
    code,
    details,
  };
}

/**
 * Create a typed API client
 *
 * @example
 * ```typescript
 * const api = createAPIClient({
 *   baseUrl: 'https://api.bond.app',
 *   getAuthToken: () => localStorage.getItem('token')
 * })
 *
 * const user = await api.get<User>('/user/me')
 * ```
 */
export function createAPIClient(config: APIClientConfig): APIClient {
  const {
    baseUrl,
    getAuthToken,
    defaultHeaders = {},
    defaultTimeout = 30000,
    onRequest,
    onResponse,
    onError,
  } = config;

  /**
   * Core request function
   */
  async function request<T>(
    method: HTTPMethod,
    endpoint: string,
    body?: unknown,
    requestConfig: RequestConfig = {}
  ): Promise<T> {
    const {
      headers = {},
      params,
      timeout = defaultTimeout,
      credentials = "same-origin",
      signal,
      skipAuth = false,
    } = requestConfig;

    // Build the full URL
    const url = buildUrl(baseUrl, endpoint, params);

    // Merge headers
    const mergedHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...defaultHeaders,
      ...headers,
    };

    // Add auth token if available and not skipped
    if (!skipAuth && getAuthToken) {
      const token = await Promise.resolve(getAuthToken());
      if (token) {
        mergedHeaders["Authorization"] = `Bearer ${token}`;
      }
    }

    // Build request options
    const options: RequestInit = {
      method,
      headers: mergedHeaders,
      credentials,
      signal,
    };

    // Add body for methods that support it
    if (body !== undefined && method !== "GET" && method !== "DELETE") {
      options.body = JSON.stringify(body);
    }

    // Call onRequest hook
    if (onRequest) {
      await onRequest(url, options);
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Combine signals if provided
    if (signal) {
      signal.addEventListener("abort", () => controller.abort());
    }

    options.signal = controller.signal;

    try {
      const response = await fetch(url, options);

      clearTimeout(timeoutId);

      // Call onResponse hook
      if (onResponse) {
        await onResponse(response);
      }

      // Handle non-OK responses
      if (!response.ok) {
        const apiError = await parseErrorResponse(response);

        if (onError) {
          await onError(apiError);
        }

        throw new APIClientError(apiError);
      }

      // Handle no content responses
      if (response.status === 204) {
        return undefined as T;
      }

      // Parse JSON response
      const data = await response.json();
      return data as T;
    } catch (error) {
      clearTimeout(timeoutId);

      // Handle abort errors
      if (error instanceof DOMException && error.name === "AbortError") {
        const apiError: APIError = {
          status: 0,
          message: "Request was aborted or timed out",
          code: "ABORTED",
        };

        if (onError) {
          await onError(apiError);
        }

        throw new APIClientError(apiError);
      }

      // Re-throw APIClientError
      if (error instanceof APIClientError) {
        throw error;
      }

      // Handle network errors
      const apiError: APIError = {
        status: 0,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
        code: "NETWORK_ERROR",
      };

      if (onError) {
        await onError(apiError);
      }

      throw new APIClientError(apiError);
    }
  }

  return {
    get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
      return request<T>("GET", endpoint, undefined, config);
    },

    post<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<T> {
      return request<T>("POST", endpoint, body, config);
    },

    put<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<T> {
      return request<T>("PUT", endpoint, body, config);
    },

    delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
      return request<T>("DELETE", endpoint, undefined, config);
    },

    patch<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<T> {
      return request<T>("PATCH", endpoint, body, config);
    },
  };
}

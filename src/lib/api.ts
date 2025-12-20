import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Cookies from "js-cookie";

// Cookie name for access token
const AUTH_COOKIE_NAME = "accessToken";

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from cookies
    const token =
      typeof window !== "undefined" ? Cookies.get(AUTH_COOKIE_NAME) : null;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized - clear token cookie
          if (typeof window !== "undefined") {
            Cookies.remove(AUTH_COOKIE_NAME, { path: "/" });
          }
          break;
        case 403:
          // Handle forbidden
          console.error("Access forbidden");
          break;
        case 500:
          // Server error - silently handled, mock data fallback will be used
          break;
      }
    }

    return Promise.reject(error);
  }
);

// Query key factory for TanStack Query
export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  library: {
    all: ["library"] as const,
    hierarchy: () => [...queryKeys.library.all, "hierarchy"] as const,
    tags: () => [...queryKeys.library.all, "tags"] as const,
    browse: (filters: Record<string, unknown>) =>
      [...queryKeys.library.all, "browse", filters] as const,
  },
  resources: {
    all: ["resources"] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.resources.all, "list", filters] as const,
    detail: (id: string) => [...queryKeys.resources.all, "detail", id] as const,
  },
} as const;

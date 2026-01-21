/**
 * API Client Helper - Native Fetch Wrapper for Next.js
 *
 * Provides axios-like functionality using native fetch API
 * with better Next.js integration and smaller bundle size
 */

// ============================================
// Type Definitions
// ============================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

interface RequestOptions extends RequestInit {
  params?: Record<string, any>;
  timeout?: number;
  baseURL?: string;
}

// ============================================
// Configuration
// ============================================

const DEFAULT_CONFIG = {
  timeout: 15000,
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  headers: {
    'Content-Type': 'application/json'
  }
};

// ============================================
// Helper Functions
// ============================================

/**
 * Build URL with query parameters
 */
function buildURL(url: string, params?: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) {
    return url;
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${url}?${queryString}` : url;
}

/**
 * Create timeout controller
 */
function createTimeoutController(timeout: number): AbortController {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);
  return controller;
}

/**
 * Handle API errors with detailed messages
 */
function handleApiError(status: number, data: any): Error {
  let message: string;

  switch (status) {
    case 400:
      message = data?.message || 'Yêu cầu không hợp lệ';
      break;
    case 401:
      message = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
      // Redirect to login on client side
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      break;
    case 403:
      message = 'Bạn không có quyền truy cập tài nguyên này';
      break;
    case 404:
      message = data?.message || 'Không tìm thấy tài nguyên';
      break;
    case 422:
      // Validation errors
      if (data?.errors) {
        const errorMessages = Object.entries(data.errors)
          .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
          .join('; ');
        message = errorMessages || 'Lỗi xác thực dữ liệu';
      } else {
        message = data?.message || 'Lỗi xác thực dữ liệu';
      }
      break;
    case 429:
      message = 'Quá nhiều yêu cầu. Vui lòng thử lại sau.';
      break;
    case 500:
    case 502:
    case 503:
    case 504:
      message = data?.message || 'Lỗi máy chủ. Vui lòng thử lại sau.';
      break;
    default:
      message = data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.';
  }

  const error = new Error(message) as Error & { status: number; data?: any };
  error.status = status;
  error.data = data;
  return error;
}

// ============================================
// Core API Client
// ============================================

/**
 * Main fetch wrapper function
 */
async function request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const {
    params,
    timeout = DEFAULT_CONFIG.timeout,
    baseURL = DEFAULT_CONFIG.baseURL,
    headers = {},
    ...fetchOptions
  } = options;

  // Build full URL
  const url = buildURL(`${baseURL}${endpoint}`, params);

  // Create abort controller for timeout
  const controller = createTimeoutController(timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        ...DEFAULT_CONFIG.headers,
        ...headers
      },
      signal: controller.signal
    });

    // Parse response
    let data: any;
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Handle non-2xx responses
    if (!response.ok) {
      throw handleApiError(response.status, data);
    }

    return data as T;
  } catch (error: any) {
    // Handle abort/timeout
    if (error.name === 'AbortError') {
      throw new Error('Yêu cầu đã hết thời gian chờ');
    }

    // Handle network errors
    if (!navigator.onLine) {
      throw new Error('Không có kết nối mạng. Vui lòng kiểm tra lại.');
    }

    // Re-throw API errors
    throw error;
  }
}

// ============================================
// HTTP Method Helpers
// ============================================

export const apiClient = {
  /**
   * GET request
   */
  get: <T = any>(endpoint: string, options?: RequestOptions) => {
    return request<T>(endpoint, {
      ...options,
      method: 'GET'
    });
  },

  /**
   * POST request
   */
  post: <T = any>(endpoint: string, data?: any, options?: RequestOptions) => {
    return request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    });
  },

  /**
   * PUT request
   */
  put: <T = any>(endpoint: string, data?: any, options?: RequestOptions) => {
    return request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    });
  },

  /**
   * PATCH request
   */
  patch: <T = any>(endpoint: string, data?: any, options?: RequestOptions) => {
    return request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined
    });
  },

  /**
   * DELETE request
   */
  delete: <T = any>(endpoint: string, options?: RequestOptions) => {
    return request<T>(endpoint, {
      ...options,
      method: 'DELETE'
    });
  }
};

// ============================================
// Specialized API Helpers
// ============================================

/**
 * Upload file helper
 */
export async function uploadFile(
  endpoint: string,
  file: File,
  fieldName: string = 'file',
  additionalData?: Record<string, any>
): Promise<any> {
  const formData = new FormData();
  formData.append(fieldName, file);

  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData
    // Don't set Content-Type, browser will set it with boundary
  });

  if (!response.ok) {
    const error = await response.json();
    throw handleApiError(response.status, error);
  }

  return response.json();
}

/**
 * Download file helper
 */
export async function downloadFile(endpoint: string, filename?: string): Promise<void> {
  const response = await fetch(endpoint);

  if (!response.ok) {
    const error = await response.json();
    throw handleApiError(response.status, error);
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || 'download';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

// ============================================
// Default Export
// ============================================

export default apiClient;

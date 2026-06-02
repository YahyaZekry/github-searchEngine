/**
 * Custom error class to mimic Axios error structure for backward compatibility
 */
export class FetchError extends Error {
  response?: {
    status: number;
    data: any;
  };
  request?: any;

  constructor(message: string, response?: { status: number; data: any }, request?: any) {
    super(message);
    this.name = 'FetchError';
    this.response = response;
    this.request = request;
  }
}

class ApiService {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private timeout: number;

  constructor(baseURL: string, token?: string) {
    this.baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    this.timeout = 10000;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    params?: Record<string, any>
  ): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url.toString(), {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(id);

      const data = response.status !== 204 ? await response.json().catch(() => ({})) : null;

      if (!response.ok) {
        throw new FetchError(
          data?.message || `HTTP Error: ${response.status}`,
          {
            status: response.status,
            data,
          },
          { url: url.toString(), options }
        );
      }

      return data as T;
    } catch (error: any) {
      clearTimeout(id);
      
      if (error.name === 'AbortError') {
        throw new FetchError('Request timeout', undefined, { url: url.toString(), options });
      }
      
      if (error instanceof FetchError) {
        throw error;
      }

      throw new FetchError(error.message || 'Network error', undefined, { url: url.toString(), options });
    }
  }

  async get<T>(url: string, config?: { params?: Record<string, any>; headers?: Record<string, string> }): Promise<T> {
    return this.request<T>(url, { method: 'GET', headers: config?.headers }, config?.params);
  }

  async post<T>(url: string, data?: any, config?: { headers?: Record<string, string> }): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: config?.headers,
    });
  }

  async put<T>(url: string, data?: any, config?: { headers?: Record<string, string> }): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: config?.headers,
    });
  }

  async delete<T>(url: string, config?: { headers?: Record<string, string> }): Promise<T> {
    return this.request<T>(url, { method: 'DELETE', headers: config?.headers });
  }
}

export default ApiService;

export interface FetchOptions extends RequestInit {
  token?: string;
  revalidate?: number; // Shortcut for Next.js ISR revalidation
}

const isServer = typeof window === 'undefined';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Server-side: Calls NestJS API directly
  // Client-side: Calls the Next.js local proxy route handler (which forwards to NestJS and appends httpOnly cookie)
  const url = isServer
    ? `${API_URL}${cleanPath}`
    : `/api/proxy${cleanPath}`;

  const headers = new Headers(options.headers);
  
  // Set JSON content-type unless body is FormData (which must let the browser set boundary)
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Auto-inject Authorization token if we're on the server and no token was passed explicitly
  let token = options.token;
  if (!token && isServer) {
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const tokenVal = cookieStore.get('accessToken')?.value;
      if (tokenVal) {
        token = tokenVal;
      }
    } catch {
      // next/headers might not be accessible outside Next request context, ignore
    }
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
  };

  // Convert custom revalidate shorthand to Next.js specific next.revalidate option
  if (options.revalidate !== undefined) {
    fetchOptions.next = {
      ...fetchOptions.next,
      revalidate: options.revalidate,
    };
  }

  const res = await fetch(url, fetchOptions);

  let body: any;
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    body = await res.json();
  } else {
    const text = await res.text();
    if (!res.ok) {
      throw new Error(text || `Request failed with status ${res.status}`);
    }
    return text as unknown as T;
  }

  if (!res.ok) {
    const errorMsg = Array.isArray(body?.message)
      ? body.message.join(', ')
      : body?.message || `Request failed with status ${res.status}`;
    throw new Error(errorMsg);
  }

  // Unwrap TransformInterceptor envelope: { statusCode, message, data, timestamp }
  if (body && typeof body === 'object' && 'data' in body) {
    return body.data as T;
  }

  return body as T;
}

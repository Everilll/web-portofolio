import { apiFetch, FetchOptions } from './client';
import { Admin } from '../types';

export interface LoginDto {
  email: string;
  password?: string; // wait, password is required for login
}

export interface LoginResponse {
  accessToken: string;
}

export async function apiLogin(
  data: any,
  options?: FetchOptions
): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/auth/login', {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function apiGetMe(
  options?: FetchOptions
): Promise<Admin> {
  return apiFetch<Admin>('/auth/me', options);
}

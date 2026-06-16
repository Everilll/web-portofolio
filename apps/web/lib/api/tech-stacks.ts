import { apiFetch, FetchOptions } from './client';
import { TechStack, TechCategory, CreateTechStackDto, UpdateTechStackDto } from '../types';

export async function getTechStacks(
  category?: TechCategory,
  options?: FetchOptions
): Promise<TechStack[]> {
  const path = `/tech-stacks${category ? `?category=${category}` : ''}`;
  return apiFetch<TechStack[]>(path, options);
}

export async function getTechStackById(
  id: string,
  options?: FetchOptions
): Promise<TechStack> {
  return apiFetch<TechStack>(`/tech-stacks/${id}`, options);
}

export async function createTechStack(
  data: CreateTechStackDto,
  options?: FetchOptions
): Promise<TechStack> {
  return apiFetch<TechStack>('/tech-stacks', {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateTechStack(
  id: string,
  data: UpdateTechStackDto,
  options?: FetchOptions
): Promise<TechStack> {
  return apiFetch<TechStack>(`/tech-stacks/${id}`, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteTechStack(
  id: string,
  options?: FetchOptions
): Promise<void> {
  return apiFetch<void>(`/tech-stacks/${id}`, {
    ...options,
    method: 'DELETE',
  });
}

export async function uploadIcon(
  id: string,
  file: File | Blob,
  options?: FetchOptions
): Promise<TechStack> {
  const formData = new FormData();
  formData.append('file', file);
  return apiFetch<TechStack>(`/tech-stacks/${id}/icon`, {
    ...options,
    method: 'POST',
    body: formData,
  });
}

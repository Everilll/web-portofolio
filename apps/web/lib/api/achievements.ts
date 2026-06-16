import { apiFetch, FetchOptions } from './client';
import { Achievement, FindAchievementsQueryDto, CreateAchievementDto, UpdateAchievementDto, PaginatedData } from '../types';

export async function getAchievements(
  query?: FindAchievementsQueryDto,
  options?: FetchOptions
): Promise<PaginatedData<Achievement>> {
  const searchParams = new URLSearchParams();
  if (query) {
    if (query.featured !== undefined) searchParams.append('featured', String(query.featured));
    if (query.page) searchParams.append('page', String(query.page));
    if (query.limit) searchParams.append('limit', String(query.limit));
  }
  const queryString = searchParams.toString();
  const path = `/achievements${queryString ? `?${queryString}` : ''}`;
  return apiFetch<PaginatedData<Achievement>>(path, options);
}

export async function getAchievementById(
  id: string,
  options?: FetchOptions
): Promise<Achievement> {
  return apiFetch<Achievement>(`/achievements/${id}`, options);
}

export async function createAchievement(
  data: CreateAchievementDto,
  options?: FetchOptions
): Promise<Achievement> {
  return apiFetch<Achievement>('/achievements', {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAchievement(
  id: string,
  data: UpdateAchievementDto,
  options?: FetchOptions
): Promise<Achievement> {
  return apiFetch<Achievement>(`/achievements/${id}`, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteAchievement(
  id: string,
  options?: FetchOptions
): Promise<void> {
  return apiFetch<void>(`/achievements/${id}`, {
    ...options,
    method: 'DELETE',
  });
}

export async function uploadCertificate(
  id: string,
  file: File | Blob,
  options?: FetchOptions
): Promise<Achievement> {
  const formData = new FormData();
  formData.append('file', file);
  return apiFetch<Achievement>(`/achievements/${id}/certificate`, {
    ...options,
    method: 'POST',
    body: formData,
  });
}

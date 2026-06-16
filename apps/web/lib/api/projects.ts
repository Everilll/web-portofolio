import { apiFetch, FetchOptions } from './client';
import { Project, FindProjectsQueryDto, CreateProjectDto, UpdateProjectDto, PaginatedData, ProjectDoc } from '../types';

export async function getProjects(
  query?: FindProjectsQueryDto,
  options?: FetchOptions
): Promise<PaginatedData<Project>> {
  const searchParams = new URLSearchParams();
  if (query) {
    if (query.featured !== undefined) searchParams.append('featured', String(query.featured));
    if (query.status) searchParams.append('status', query.status);
    if (query.page) searchParams.append('page', String(query.page));
    if (query.limit) searchParams.append('limit', String(query.limit));
  }
  const queryString = searchParams.toString();
  const path = `/projects${queryString ? `?${queryString}` : ''}`;
  return apiFetch<PaginatedData<Project>>(path, options);
}

export async function getProjectBySlug(
  slug: string,
  options?: FetchOptions
): Promise<Project> {
  return apiFetch<Project>(`/projects/slug/${slug}`, options);
}

export async function getProjectById(
  id: string,
  options?: FetchOptions
): Promise<Project> {
  return apiFetch<Project>(`/projects/${id}`, options);
}

export async function createProject(
  data: CreateProjectDto,
  options?: FetchOptions
): Promise<Project> {
  return apiFetch<Project>('/projects', {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateProject(
  id: string,
  data: UpdateProjectDto,
  options?: FetchOptions
): Promise<Project> {
  return apiFetch<Project>(`/projects/${id}`, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteProject(
  id: string,
  options?: FetchOptions
): Promise<void> {
  return apiFetch<void>(`/projects/${id}`, {
    ...options,
    method: 'DELETE',
  });
}

export async function uploadThumbnail(
  id: string,
  file: File | Blob,
  options?: FetchOptions
): Promise<Project> {
  const formData = new FormData();
  formData.append('file', file);
  return apiFetch<Project>(`/projects/${id}/thumbnail`, {
    ...options,
    method: 'POST',
    body: formData,
  });
}

export async function uploadDocs(
  id: string,
  files: (File | Blob)[],
  options?: FetchOptions
): Promise<ProjectDoc[]> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });
  return apiFetch<ProjectDoc[]>(`/projects/${id}/docs`, {
    ...options,
    method: 'POST',
    body: formData,
  });
}

export async function deleteDoc(
  id: string,
  docId: string,
  options?: FetchOptions
): Promise<void> {
  return apiFetch<void>(`/projects/${id}/docs/${docId}`, {
    ...options,
    method: 'DELETE',
  });
}

import { apiFetch, FetchOptions } from './client';
import { ContactForm, FindContactsQueryDto, SubmitContactDto, UpdateContactStatusDto, PaginatedData } from '../types';

export async function submitContact(
  data: SubmitContactDto,
  options?: FetchOptions
): Promise<ContactForm> {
  return apiFetch<ContactForm>('/contact', {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getContacts(
  query?: FindContactsQueryDto,
  options?: FetchOptions
): Promise<PaginatedData<ContactForm>> {
  const searchParams = new URLSearchParams();
  if (query) {
    if (query.status) searchParams.append('status', query.status);
    if (query.page) searchParams.append('page', String(query.page));
    if (query.limit) searchParams.append('limit', String(query.limit));
  }
  const queryString = searchParams.toString();
  const path = `/contact${queryString ? `?${queryString}` : ''}`;
  return apiFetch<PaginatedData<ContactForm>>(path, options);
}

export async function getContactById(
  id: string,
  options?: FetchOptions
): Promise<ContactForm> {
  return apiFetch<ContactForm>(`/contact/${id}`, options);
}

export async function updateContactStatus(
  id: string,
  data: UpdateContactStatusDto,
  options?: FetchOptions
): Promise<ContactForm> {
  return apiFetch<ContactForm>(`/contact/${id}`, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteContact(
  id: string,
  options?: FetchOptions
): Promise<void> {
  return apiFetch<void>(`/contact/${id}`, {
    ...options,
    method: 'DELETE',
  });
}

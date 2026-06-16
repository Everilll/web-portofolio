export enum TechCategory {
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
  DATABASE = 'DATABASE',
  DEVOPS = 'DEVOPS',
  MOBILE = 'MOBILE',
  OTHER = 'OTHER',
}

export enum ProjectStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum DocType {
  IMAGE = 'IMAGE',
  PDF = 'PDF',
}

export enum ContactStatus {
  UNREAD = 'UNREAD',
  READ = 'READ',
  REPLIED = 'REPLIED',
}

// Generic Response Envelopes
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedData<T> {
  data: T[];
  meta: PaginationMeta;
}

// Resource entities
export interface Admin {
  id: string;
  email: string;
  createdAt: string;
}

export interface TechStack {
  id: string;
  name: string;
  iconUrl?: string | null;
  category: TechCategory;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectTech {
  projectId: string;
  techStackId: string;
  project?: Project;
  techStack: TechStack;
}

export interface ProjectDoc {
  id: string;
  projectId: string;
  title?: string | null;
  url: string;
  type: DocType;
  order: number;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDesc?: string | null;
  thumbnailUrl?: string | null;
  liveUrl?: string | null;
  repoUrl?: string | null;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  techStacks?: ProjectTech[];
  docs?: ProjectDoc[];
}

export interface Achievement {
  id: string;
  title: string;
  description?: string | null;
  issuer?: string | null;
  date: string; // ISO String representation
  certificateUrl?: string | null;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
  readAt?: string | null;
}

// Query DTOs
export interface FindProjectsQueryDto {
  featured?: boolean;
  status?: ProjectStatus;
  page?: number;
  limit?: number;
}

export interface FindAchievementsQueryDto {
  featured?: boolean;
  page?: number;
  limit?: number;
}

export interface FindContactsQueryDto {
  status?: ContactStatus;
  page?: number;
  limit?: number;
}

// Mutation DTOs
export interface CreateProjectDto {
  title: string;
  description: string;
  longDesc?: string;
  liveUrl?: string;
  repoUrl?: string;
  status?: ProjectStatus;
  featured?: boolean;
  order?: number;
  techStackIds?: string[];
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {}

export interface CreateTechStackDto {
  name: string;
  category: TechCategory;
  order?: number;
}

export interface UpdateTechStackDto extends Partial<CreateTechStackDto> {}

export interface CreateAchievementDto {
  title: string;
  description?: string;
  issuer?: string;
  date: string; // ISO format string or YYYY-MM-DD
  featured?: boolean;
  order?: number;
}

export interface UpdateAchievementDto extends Partial<CreateAchievementDto> {}

export interface SubmitContactDto {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export interface UpdateContactStatusDto {
  status: ContactStatus;
}


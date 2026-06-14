import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { ProjectStatus } from '@prisma/client';
import { CreateProjectDto, FindProjectsQueryDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private upload: UploadService,
  ) {}

  private generateSlug(title: string) {
    return title
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }

  async findAll(opts: FindProjectsQueryDto) {
    const { featured, page = 1, limit = 20, skip, status } = opts;

    const where = {
      ...(featured !== undefined ? { featured } : {}),
      status: status ?? ProjectStatus.PUBLISHED,
    };

    const [data, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        include: { techStacks: { include: { techStack: true } }, docs: true },
      }),
      this.prisma.project.count({ where }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: { slug },
      include: { techStacks: { include: { techStack: true } }, docs: { orderBy: { order: 'asc' } } },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async create(dto: CreateProjectDto) {
    const { techStackIds, ...rest } = dto;
    const slug = this.generateSlug(rest.title);

    return this.prisma.project.create({
      data: {
        ...rest,
        slug,
        ...(techStackIds?.length
          ? {
              techStacks: {
                create: techStackIds.map((id) => ({ techStackId: id })),
              },
            }
          : {}),
      },
      include: { techStacks: { include: { techStack: true } } },
    });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findById(id);
    const { techStackIds, ...rest } = dto;

    return this.prisma.project.update({
      where: { id },
      data: {
        ...rest,
        ...(rest.title ? { slug: this.generateSlug(rest.title) } : {}),
        ...(techStackIds
          ? {
              techStacks: {
                deleteMany: {},
                create: techStackIds.map((tid) => ({ techStackId: tid })),
              },
            }
          : {}),
      },
      include: { techStacks: { include: { techStack: true } } },
    });
  }

  async uploadThumbnail(id: string, file: Express.Multer.File) {
    const project = await this.findById(id);

    if (project.thumbnailUrl) {
      const publicId = this.upload.extractPublicId(project.thumbnailUrl);
      await this.upload.deleteFile(publicId).catch(() => null);
    }

    const result = await this.upload.uploadFile(file, 'portfolio/thumbnails');
    return this.prisma.project.update({
      where: { id },
      data: { thumbnailUrl: result.secure_url },
    });
  }

  async uploadDocs(id: string, files: Express.Multer.File[]) {
    await this.findById(id);

    const uploaded = await Promise.all(
      files.map((f) => this.upload.uploadFile(f, 'portfolio/docs')),
    );

    const docs = await Promise.all(
      uploaded.map((result, i) =>
        this.prisma.projectDoc.create({
          data: {
            projectId: id,
            url: result.secure_url,
            type: files[i].mimetype === 'application/pdf' ? 'PDF' : 'IMAGE',
          },
        }),
      ),
    );

    return docs;
  }

  async deleteDoc(id: string, docId: string) {
    const doc = await this.prisma.projectDoc.findFirst({
      where: { id: docId, projectId: id },
    });
    if (!doc) throw new NotFoundException('Doc not found');

    const publicId = this.upload.extractPublicId(doc.url);
    await this.upload.deleteFile(publicId).catch(() => null);

    return this.prisma.projectDoc.delete({ where: { id: docId } });
  }

  async remove(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { docs: true },
    });
    if (!project) throw new NotFoundException('Project not found');

    // hapus semua file Cloudinary
    const deleteJobs: Promise<any>[] = [];

    if (project.thumbnailUrl) {
      deleteJobs.push(
        this.upload.deleteFile(this.upload.extractPublicId(project.thumbnailUrl)).catch(() => null),
      );
    }

    for (const doc of project.docs) {
      deleteJobs.push(
        this.upload.deleteFile(this.upload.extractPublicId(doc.url)).catch(() => null),
      );
    }

    await Promise.all(deleteJobs);

    // cascade delete otomatis hapus ProjectTech & ProjectDoc di DB
    return this.prisma.project.delete({ where: { id } });
  }

  async findOne(id: string) {
    return this.findById(id);
  }

  private async findById(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id }, include: { docs: true } });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }
}
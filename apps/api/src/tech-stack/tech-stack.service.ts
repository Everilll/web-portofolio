import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { TechCategory } from '@prisma/client';
import { CreateTechStackDto, UpdateTechStackDto } from './dto/tech-stack.dto';

@Injectable()
export class TechStackService {
  constructor(
    private prisma: PrismaService,
    private upload: UploadService,
  ) {}

  findAll(category?: TechCategory) {
    return this.prisma.techStack.findMany({
      where: category ? { category } : undefined,
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const tech = await this.prisma.techStack.findUnique({ where: { id } });
    if (!tech) throw new NotFoundException('TechStack not found');
    return tech;
  }

  create(dto: CreateTechStackDto) {
    return this.prisma.techStack.create({ data: dto });
  }

  async update(id: string, dto: UpdateTechStackDto) {
    await this.findOne(id);
    return this.prisma.techStack.update({ where: { id }, data: dto });
  }

  async uploadIcon(id: string, file: Express.Multer.File) {
    const tech = await this.findOne(id);

    // hapus icon lama di Cloudinary kalau ada
    if (tech.iconUrl) {
      const publicId = this.upload.extractPublicId(tech.iconUrl);
      await this.upload.deleteFile(publicId).catch(() => null);
    }

    const result = await this.upload.uploadFile(file, 'portfolio/tech-stacks');
    return this.prisma.techStack.update({
      where: { id },
      data: { iconUrl: result.secure_url },
    });
  }

  async remove(id: string) {
    const tech = await this.findOne(id);

    if (tech.iconUrl) {
      const publicId = this.upload.extractPublicId(tech.iconUrl);
      await this.upload.deleteFile(publicId).catch(() => null);
    }

    return this.prisma.techStack.delete({ where: { id } });
  }
}
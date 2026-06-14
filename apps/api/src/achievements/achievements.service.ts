import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { CreateAchievementDto, FindAchievementsQueryDto, UpdateAchievementDto } from './dto/achievement.dto';

@Injectable()
export class AchievementsService {
  constructor(
    private prisma: PrismaService,
    private upload: UploadService,
  ) {}

  async findAll(opts: FindAchievementsQueryDto) {
    const { featured, page = 1, limit = 20, skip } = opts;

    const where = featured !== undefined ? { featured } : undefined;

    const [data, total] = await Promise.all([
      this.prisma.achievement.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ order: 'asc' }, { date: 'desc' }],
      }),
      this.prisma.achievement.count({ where }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const ach = await this.prisma.achievement.findUnique({ where: { id } });
    if (!ach) throw new NotFoundException('Achievement not found');
    return ach;
  }

  create(dto: CreateAchievementDto) {
    return this.prisma.achievement.create({ 
      data: { ...dto, date: new Date(dto.date) } 
    });
  }

  async update(id: string, dto: UpdateAchievementDto) {
    await this.findOne(id);
    return this.prisma.achievement.update({
      where: { id },
      data: { ...dto, ...(dto.date ? { date: new Date(dto.date) } : {}) },
    });
  }

  async uploadCertificate(id: string, file: Express.Multer.File) {
    const ach = await this.findOne(id);

    if (ach.certificateUrl) {
      const publicId = this.upload.extractPublicId(ach.certificateUrl);
      await this.upload.deleteFile(publicId).catch(() => null);
    }

    const result = await this.upload.uploadFile(file, 'portfolio/certificates');
    return this.prisma.achievement.update({
      where: { id },
      data: { certificateUrl: result.secure_url },
    });
  }

  async remove(id: string) {
    const ach = await this.findOne(id);

    if (ach.certificateUrl) {
      const publicId = this.upload.extractPublicId(ach.certificateUrl);
      await this.upload.deleteFile(publicId).catch(() => null);
    }

    return this.prisma.achievement.delete({ where: { id } });
  }
}

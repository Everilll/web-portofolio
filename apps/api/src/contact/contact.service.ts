import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContactStatus } from '@prisma/client';
import {
  SubmitContactDto,
  UpdateContactStatusDto,
  FindContactsQueryDto,
} from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(submitContactDto: SubmitContactDto) {
    return this.prisma.contactForm.create({
      data: submitContactDto,
    });
  }

  async findAll(query: FindContactsQueryDto) {
    const { status, page = 1, limit = 20, skip } = query;

    const where = status ? { status } : undefined;

    const [data, total] = await Promise.all([
      this.prisma.contactForm.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.contactForm.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const contact = await this.prisma.contactForm.findUnique({
      where: { id },
    });
    if (!contact) {
      throw new NotFoundException('Formulir kontak tidak ditemukan.');
    }

    if (contact.status === ContactStatus.UNREAD) {
      return this.prisma.contactForm.update({
        where: { id },
        data: { status: ContactStatus.READ, readAt: new Date() },
      });
    }

    return contact;
  }

  async update(id: string, updateContactStatusDto: UpdateContactStatusDto) {
    const contact = await this.findOne(id);
    const updateData: any = { status: updateContactStatusDto.status };

    if (
      (updateContactStatusDto.status === ContactStatus.READ ||
        updateContactStatusDto.status === ContactStatus.REPLIED) &&
      !contact.readAt
    ) {
      updateData.readAt = new Date();
    }

    return this.prisma.contactForm.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.contactForm.delete({
      where: { id },
    });
  }
}

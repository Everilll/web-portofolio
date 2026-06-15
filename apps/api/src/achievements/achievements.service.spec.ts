import { Test, TestingModule } from '@nestjs/testing';
import { AchievementsService } from './achievements.service';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';

const mockPrismaService = {
  achievement: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const mockUploadService = {
  uploadFile: jest.fn(),
  deleteFile: jest.fn(),
  extractPublicId: jest.fn(),
};

describe('AchievementsService', () => {
  let service: AchievementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AchievementsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: UploadService,
          useValue: mockUploadService,
        },
      ],
    }).compile();

    service = module.get<AchievementsService>(AchievementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

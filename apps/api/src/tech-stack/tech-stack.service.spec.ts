import { Test, TestingModule } from '@nestjs/testing';
import { TechStackService } from './tech-stack.service';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';

const mockPrismaService = {
  techStack: {
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

describe('TechStackService', () => {
  let service: TechStackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechStackService,
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

    service = module.get<TechStackService>(TechStackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

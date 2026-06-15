import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from './upload.service';
import { ConfigService } from '@nestjs/config';

const mockConfigService = {
  get: jest.fn().mockReturnValue('mock-value'),
};

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

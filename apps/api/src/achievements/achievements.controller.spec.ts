import { Test, TestingModule } from '@nestjs/testing';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';

const mockAchievementsService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  uploadCertificate: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('AchievementsController', () => {
  let controller: AchievementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AchievementsController],
      providers: [
        {
          provide: AchievementsService,
          useValue: mockAchievementsService,
        },
      ],
    }).compile();

    controller = module.get<AchievementsController>(AchievementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

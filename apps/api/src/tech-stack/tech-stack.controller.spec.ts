import { Test, TestingModule } from '@nestjs/testing';
import { TechStackController } from './tech-stack.controller';
import { TechStackService } from './tech-stack.service';

const mockTechStackService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  uploadIcon: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('TechStackController', () => {
  let controller: TechStackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechStackController],
      providers: [
        {
          provide: TechStackService,
          useValue: mockTechStackService,
        },
      ],
    }).compile();

    controller = module.get<TechStackController>(TechStackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

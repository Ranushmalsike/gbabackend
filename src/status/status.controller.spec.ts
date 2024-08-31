import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { PrismaService } from '../common/prisma.service'; // Adjust path accordingly

describe('StatusController', () => {
  let controller: StatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [StatusService, PrismaService], // Include both services here
    }).compile();

    controller = module.get<StatusController>(StatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

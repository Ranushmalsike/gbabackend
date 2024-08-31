import { Test, TestingModule } from '@nestjs/testing';
import { StatusService } from './status.service';
import { PrismaService } from '../common/prisma.service'; // Adjust path accordingly

describe('StatusService', () => {
  let service: StatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusService, PrismaService], // Include PrismaService here
    }).compile();

    service = module.get<StatusService>(StatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { StatusService } from './status.service';
import { PrismaService } from '../common/prisma.service';

describe('StatusService', () => {
  let service: StatusService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatusService,
        {
          provide: PrismaService,
          useValue: {
            statusTB: {
              findMany: jest.fn().mockResolvedValue([{ id: 1, status: 'Active' }]),
              create: jest.fn().mockResolvedValue({ id: 1, status: 'New Status' }),
              update: jest.fn().mockResolvedValue({ id: 1, status: 'Updated Status' }),
              delete: jest.fn().mockResolvedValue({ id: 1, status: 'Deleted Status' }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<StatusService>(StatusService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all statuses', async () => {
      const result = await service.findAll();
      expect(result).toEqual([{ id: 1, status: 'Active' }]);
      expect(prismaService.statusTB.findMany).toHaveBeenCalled();
    });
  });

  describe('createStatus', () => {
    it('should create a new status', async () => {
      const status = 'New Status';
      const result = await service.createStatus(status);
      expect(result).toEqual({ id: 1, status: 'New Status' });
      expect(prismaService.statusTB.create).toHaveBeenCalledWith({
        data: { status },
      });
    });
  });

  describe('updateStatus', () => {
    it('should update a status', async () => {
      const id = 1;
      const status = 'Updated Status';
      const result = await service.updateStatus(id, status);
      expect(result).toEqual({ id: 1, status: 'Updated Status' });
      expect(prismaService.statusTB.update).toHaveBeenCalledWith({
        where: { id },
        data: { status },
      });
    });
  });

  describe('deleteStatus', () => {
    it('should delete a status', async () => {
      const id = 1;
      const result = await service.deleteStatus(id);
      expect(result).toEqual({ id: 1, status: 'Deleted Status' });
      expect(prismaService.statusTB.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});

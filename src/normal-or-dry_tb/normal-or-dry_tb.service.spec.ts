import { Test, TestingModule } from '@nestjs/testing';
import { NormalOrDryTbService } from './normal-or-dry_tb.service';
import { PrismaService } from '../common/prisma.service';

describe('NormalOrDryTbService', () => {
  let service: NormalOrDryTbService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NormalOrDryTbService,
        {
          provide: PrismaService,
          useValue: {
            normalOrDry_tb: {
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<NormalOrDryTbService>(NormalOrDryTbService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all items', async () => {
      const result = [{ id: 1, item: 'Item 1' }];
      jest.spyOn(prisma.normalOrDry_tb, 'findMany').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
      expect(prisma.normalOrDry_tb.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('createData', () => {
    it('should create a new item', async () => {
      const item = 'New Item';
      const result = { id: 1, item };
      jest.spyOn(prisma.normalOrDry_tb, 'create').mockResolvedValue(result);

      expect(await service.createData(item)).toBe(result);
      expect(prisma.normalOrDry_tb.create).toHaveBeenCalledWith({
        data: { item },
      });
      expect(prisma.normalOrDry_tb.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateData', () => {
    it('should update an existing item', async () => {
      const id = 1;
      const item = 'Updated Item';
      const result = { id, item };
      jest.spyOn(prisma.normalOrDry_tb, 'update').mockResolvedValue(result);

      expect(await service.updateData(id, item)).toBe(result);
      expect(prisma.normalOrDry_tb.update).toHaveBeenCalledWith({
        where: { id },
        data: { item },
      });
      expect(prisma.normalOrDry_tb.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteData', () => {
    it('should delete an item', async () => {
        const id = 1;
        // Mock the response to include both id and item as expected by the Prisma client
        const result = { id, item: 'Deleted Item' }; 
        jest.spyOn(prisma.normalOrDry_tb, 'delete').mockResolvedValue(result);

        expect(await service.deleteData(id)).toBe(result);
        expect(prisma.normalOrDry_tb.delete).toHaveBeenCalledWith({ where: { id } });
        expect(prisma.normalOrDry_tb.delete).toHaveBeenCalledTimes(1);
    });
  });
});

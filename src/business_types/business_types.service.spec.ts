import { Test, TestingModule } from '@nestjs/testing';
import { BusinessTypesService } from './business_types.service';
import { PrismaService } from '../common/prisma.service'; // Adjust the import path as needed

describe('BusinessTypesService', () => {
  let service: BusinessTypesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessTypesService,
        {
          provide: PrismaService,
          useValue: {
            business_types: {
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BusinessTypesService>(BusinessTypesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of business types', async () => {
      const result = [{ id: 1, business: 'Tech', startDate: new Date(), statusTBid: 1 }];
      jest.spyOn(prismaService.business_types, 'findMany').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('addData', () => {
    it('should insert a new business type', async () => {
      const business = 'Retail';
      const startDate = new Date();
      const statusTBid = 2;
      const result = { id: 1, business, startDate, statusTBid };
      jest.spyOn(prismaService.business_types, 'create').mockResolvedValue(result);

      expect(await service.addData(business, startDate, statusTBid)).toBe(result);
      expect(prismaService.business_types.create).toHaveBeenCalledWith({
        data: { business, startDate, statusTBid },
      });
    });
  });

  describe('updateData', () => {
    it('should update an existing business type', async () => {
      const id = 1;
      const business = 'Retail';
      const startDate = new Date();
      const statusTBid = 2;
      const result = { id, business, startDate, statusTBid };
      jest.spyOn(prismaService.business_types, 'update').mockResolvedValue(result);

      expect(await service.updateData(id, business, startDate, statusTBid)).toBe(result);
      expect(prismaService.business_types.update).toHaveBeenCalledWith({
        where: { id },
        data: { business, startDate, statusTBid },
      });
    });
  });

  describe('deleteData', () => {
    it('should delete a business type', async () => {
      const id = 1;
      const result = { id, business: 'Retail', startDate: new Date(), statusTBid: 2 };
      jest.spyOn(prismaService.business_types, 'delete').mockResolvedValue(result);

      expect(await service.deleteData(id)).toBe(result);
      expect(prismaService.business_types.delete).toHaveBeenCalledWith({ where: { id } });
    });
  });
});

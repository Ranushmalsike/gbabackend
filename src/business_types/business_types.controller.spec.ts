import { Test, TestingModule } from '@nestjs/testing';
import { BusinessTypesController } from './business_types.controller';
import { BusinessTypesService } from './business_types.service';
import { PrismaService } from '../common/prisma.service'; // Adjust the import path as needed

describe('BusinessTypesController', () => {
  let controller: BusinessTypesController;
  let service: BusinessTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessTypesController],
      providers: [
        {
          provide: BusinessTypesService,
          useValue: {
            findAll: jest.fn(),
            addData: jest.fn(),
            updateData: jest.fn(),
            deleteData: jest.fn(),
          },
        },
        PrismaService, // Ensure that PrismaService is provided here if needed
      ],
    }).compile();

    controller = module.get<BusinessTypesController>(BusinessTypesController);
    service = module.get<BusinessTypesService>(BusinessTypesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of business types', async () => {
      const result = [{ id: 1, business: 'Tech', startDate: new Date(), statusTBid: 1 }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('insertData', () => {
    it('should create a new business type', async () => {
      const body = { business: 'Retail', startDate: new Date(), statusTBid: 2 };
      const result = { id: 1, ...body };
      jest.spyOn(service, 'addData').mockResolvedValue(result);

      expect(await controller.insertData(body)).toBe(result);
      expect(service.addData).toHaveBeenCalledWith(body.business, body.startDate, body.statusTBid);
    });
  });

  describe('updateData', () => {
    it('should update an existing business type', async () => {
      const id = 1;
      const body = { business: 'Retail', startDate: new Date(), statusTBID: 2 };
      const result = { id, ...body };
      jest.spyOn(service, 'updateData').mockResolvedValue(result);

      expect(await controller.updateData(id, body)).toBe(result);
      expect(service.updateData).toHaveBeenCalledWith(id, body.business, body.startDate, body.statusTBID);
    });
  });

  describe('deleteData', () => {
    it('should delete a business type', async () => {
      const id = 1;
      const result = { id, business: 'Retail', startDate: new Date(), statusTBID: 2 };
      jest.spyOn(service, 'deleteData').mockResolvedValue(result);

      expect(await controller.deleteData(id)).toBe(result);
      expect(service.deleteData).toHaveBeenCalledWith(id);
    });
  });
});

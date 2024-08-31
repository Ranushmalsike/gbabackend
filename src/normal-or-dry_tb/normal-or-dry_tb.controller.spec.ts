import { Test, TestingModule } from '@nestjs/testing';
import { NormalOrDryTbController } from './normal-or-dry_tb.controller';
import { NormalOrDryTbService } from './normal-or-dry_tb.service';

describe('NormalOrDryTbController', () => {
  let controller: NormalOrDryTbController;
  let service: NormalOrDryTbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NormalOrDryTbController],
      providers: [
        {
          provide: NormalOrDryTbService,
          useValue: {
            findAll: jest.fn(),
            createData: jest.fn(),
            updateData: jest.fn(),
            deleteData: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<NormalOrDryTbController>(NormalOrDryTbController);
    service = module.get<NormalOrDryTbService>(NormalOrDryTbService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all items', async () => {
      const result = [{ id: 1, item: 'Item 1' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('insertData', () => {
    it('should insert a new item', async () => {
      const body = { item: 'New Item' };
      const result = { id: 1, ...body };
      jest.spyOn(service, 'createData').mockResolvedValue(result);

      expect(await controller.insertdata(body)).toBe(result);
      expect(service.createData).toHaveBeenCalledWith(body.item);
      expect(service.createData).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateData', () => {
    it('should update an existing item', async () => {
      const id = 1;
      const body = { item: 'Updated Item' };
      const result = { id, ...body };
      jest.spyOn(service, 'updateData').mockResolvedValue(result);

      expect(await controller.updateData(id, body)).toBe(result);
      expect(service.updateData).toHaveBeenCalledWith(id, body.item);
      expect(service.updateData).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteData', () => {
    it('should delete an item', async () => {
      const id = 1;
      const result = { id };
      jest.spyOn(service, 'deleteData').mockResolvedValue(result);

      expect(await controller.deleteData(id)).toBe(result);
      expect(service.deleteData).toHaveBeenCalledWith(id);
      expect(service.deleteData).toHaveBeenCalledTimes(1);
    });
  });
});

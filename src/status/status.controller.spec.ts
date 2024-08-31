import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

describe('StatusController', () => {
  let controller: StatusController;
  let service: StatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [
        {
          provide: StatusService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([{ id: 1, status: 'Active' }]),
            createStatus: jest.fn().mockResolvedValue({ id: 1, status: 'New Status' }),
            updateStatus: jest.fn().mockResolvedValue({ id: 1, status: 'Updated Status' }),
            deleteStatus: jest.fn().mockResolvedValue({ id: 1, status: 'Deleted Status' }),
          },
        },
      ],
    }).compile();

    controller = module.get<StatusController>(StatusController);
    service = module.get<StatusService>(StatusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  describe('findAll', () => {
    it('should return all statuses', async () => {
      const result = await controller.findALl();
      expect(result).toEqual([{ id: 1, status: 'Active' }]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('createStatus', () => {
    it('should create a new status', async () => {
      const body = { status: 'New Status' };
      const result = await controller.createStatus(body);
      expect(result).toEqual({ id: 1, status: 'New Status' });
      expect(service.createStatus).toHaveBeenCalledWith(body.status);
    });
  });

  describe('updateStatus', () => {
    it('should update a status', async () => {
      const id = 1;
      const body = { status: 'Updated Status' };
      const result = await controller.updateStatus(id, body);
      expect(result).toEqual({ id: 1, status: 'Updated Status' });
      expect(service.updateStatus).toHaveBeenCalledWith(id, body.status);
    });
  });

  describe('deleteStatus', () => {
    it('should delete a status', async () => {
      const id = 1;
      const result = await controller.deleteStatus(id);
      expect(result).toEqual({ id: 1, status: 'Deleted Status' });
      expect(service.deleteStatus).toHaveBeenCalledWith(id);
    });
  });
});

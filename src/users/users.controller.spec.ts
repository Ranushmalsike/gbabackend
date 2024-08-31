import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([{ id: 1, email: 'test@example.com', name: 'Test User' }]),
            findOne: jest.fn().mockResolvedValue({ id: 1, email: 'test@example.com', name: 'Test User' }),
            createUser: jest.fn().mockResolvedValue({ id: 1, email: 'test@example.com', name: 'Test User' }),
            updateUser: jest.fn().mockResolvedValue({ id: 1, email: 'updated@example.com', name: 'Updated User' }),
            deleteUser: jest.fn().mockResolvedValue({ id: 1, email: 'deleted@example.com', name: 'Deleted User' }),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await usersController.findAll();
      expect(result).toEqual([{ id: 1, email: 'test@example.com', name: 'Test User' }]);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('loginUser', () => {
    it('should return a user when login is successful', async () => {
      const body = { email: 'test@example.com', password: 'password' };
      const result = await usersController.loginUser(body);
      expect(result).toEqual({ id: 1, email: 'test@example.com', name: 'Test User' });
      expect(usersService.findOne).toHaveBeenCalledWith('password', 'test@example.com');
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const body = { email: 'test@example.com', name: 'Test User', password: 'password' };
      const result = await usersController.createUser(body);
      expect(result).toEqual({ id: 1, email: 'test@example.com', name: 'Test User' });
      expect(usersService.createUser).toHaveBeenCalledWith('test@example.com', 'Test User', 'password');
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const body = { email: 'updated@example.com', name: 'Updated User', password: 'newpassword' };
      const result = await usersController.updateUser(1, body);
      expect(result).toEqual({ id: 1, email: 'updated@example.com', name: 'Updated User' });
      expect(usersService.updateUser).toHaveBeenCalledWith(1, 'updated@example.com', 'Updated User', 'newpassword');
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const result = await usersController.deleteUser(1);
      expect(result).toEqual({ id: 1, email: 'deleted@example.com', name: 'Deleted User' });
      expect(usersService.deleteUser).toHaveBeenCalledWith(1);
    });
  });
});

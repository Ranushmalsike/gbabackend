import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../common/prisma.service';
import { hashPassword, comparePassword } from './password.utils';

jest.mock('./password.utils'); // Mock the password utils

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: 1, email: 'test@example.com', name: 'Test User' }];
      
      // Cast the method to a Jest mock type
      (prismaService.user.findMany as jest.Mock).mockResolvedValue(users);

      const result = await usersService.findAll();
      expect(result).toEqual(users);
      expect(prismaService.user.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user if password matches', async () => {
      const user = { id: 1, email: 'test@example.com', password: 'hashedpassword' };
      
      // Cast the method to a Jest mock type
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(user);
      (comparePassword as jest.Mock).mockResolvedValue(true); // Mock comparePassword to return true

      const result = await usersService.findOne('password', 'test@example.com');
      expect(result).toEqual(user);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(comparePassword).toHaveBeenCalledWith('password', 'hashedpassword');
    });

    it('should return null if password does not match', async () => {
      const user = { id: 1, email: 'test@example.com', password: 'hashedpassword' };
      
      // Cast the method to a Jest mock type
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(user);
      (comparePassword as jest.Mock).mockResolvedValue(false); // Mock comparePassword to return false

      const result = await usersService.findOne('wrongpassword', 'test@example.com');
      expect(result).toBeNull();
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(comparePassword).toHaveBeenCalledWith('wrongpassword', 'hashedpassword');
    });

    it('should return null if user is not found', async () => {
      // Cast the method to a Jest mock type
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await usersService.findOne('password', 'notfound@example.com');
      expect(result).toBeNull();
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({ where: { email: 'notfound@example.com' } });
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const hashedPassword = 'hashedpassword';
      (hashPassword as jest.Mock).mockResolvedValue(hashedPassword); // Mock hashPassword to return a hashed password
      const newUser = { id: 1, email: 'test@example.com', name: 'Test User', password: hashedPassword };
      
      // Cast the method to a Jest mock type
      (prismaService.user.create as jest.Mock).mockResolvedValue(newUser);

      const result = await usersService.createUser('test@example.com', 'Test User', 'password');
      expect(result).toEqual(newUser);
      expect(hashPassword).toHaveBeenCalledWith('password');
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: 'test@example.com',
          name: 'Test User',
          password: hashedPassword,
        },
      });
    });
  });

  describe('updateUser', () => {
    it('should update and return the updated user', async () => {
      const hashedPassword = 'hashedpassword';
      (hashPassword as jest.Mock).mockResolvedValue(hashedPassword); // Mock hashPassword to return a hashed password
      const updatedUser = { id: 1, email: 'updated@example.com', name: 'Updated User', password: hashedPassword };
      
      // Cast the method to a Jest mock type
      (prismaService.user.update as jest.Mock).mockResolvedValue(updatedUser);

      const result = await usersService.updateUser(1, 'updated@example.com', 'Updated User', 'newpassword');
      expect(result).toEqual(updatedUser);
      expect(hashPassword).toHaveBeenCalledWith('newpassword');
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          email: 'updated@example.com',
          name: 'Updated User',
          password: hashedPassword,
        },
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return the result', async () => {
      const deletedUser = { id: 1, email: 'deleted@example.com', name: 'Deleted User' };
      
      // Cast the method to a Jest mock type
      (prismaService.user.delete as jest.Mock).mockResolvedValue(deletedUser);

      const result = await usersService.deleteUser(1);
      expect(result).toEqual(deletedUser);
      expect(prismaService.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});

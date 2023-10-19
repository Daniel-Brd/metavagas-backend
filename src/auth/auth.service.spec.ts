import { TestingModule, Test } from '@nestjs/testing';

import { AuthService } from './auth.service';

import { usersServiceMock } from '../testing/mocks/users-mocks/users-service.mock';
import { jwtServiceMock } from '../testing/mocks/jwt-mocks/jwt-service.mock';
import { createUserMock } from '../testing/mocks/users-mocks/create-user.mock';
import { usersListMock } from '../testing/mocks/users-mocks/users-list.mock';
import { loginMock } from '../testing/mocks/auth-mocks/login.mock';
import { jwtTokenMock } from '../testing/mocks/jwt-mocks/jwt-token.mock';
import { HttpException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, jwtServiceMock, usersServiceMock],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('Should generate and return a JWT token', async () => {
      const result = await service.login(loginMock);
      expect(result).toEqual({
        data: {
          name: usersListMock[0].name,
          email: usersListMock[0].email,
          isActive: usersListMock[0].isActive,
        },
        token: jwtTokenMock,
      });
    });

    it('should return an error for invalid credentials', async () => {
      (usersServiceMock.useValue.findByEmail as jest.Mock).mockResolvedValue(
        null,
      );

      const result = async () => {
        return await service.login({
          ...loginMock,
          password: 'invalid password',
        });
      };
      expect(result()).rejects.toThrow(HttpException);
      expect(result()).rejects.toHaveProperty(
        'response',
        'invalid email or password.',
      );
      expect(result()).rejects.toHaveProperty('status', 401);
    });

    it('should handle an internal error', async () => {
      const errorMock = new Error('Unexpected internal error');
      (usersServiceMock.useValue.findByEmail as jest.Mock).mockRejectedValue(
        errorMock,
      );

      const result = async () => {
        return await service.login(loginMock);
      };

      expect(result()).rejects.toThrow(HttpException);
      expect(result()).rejects.toHaveProperty(
        'response',
        'Unexpected internal error',
      );
      expect(result()).rejects.toHaveProperty('status', 500);
    });
  });

  describe('register', () => {
    it('should create and return an user.', async () => {
      (usersServiceMock.useValue.findByEmail as jest.Mock).mockResolvedValue(
        null,
      );
      const result = await service.register(createUserMock);

      expect(result).toEqual(usersListMock[0]);
    });

    it('should throw an exception', async () => {
      jest.spyOn(service, 'register').mockRejectedValueOnce(new Error());

      expect(service.register(createUserMock)).rejects.toThrowError();
    });

    it('should throw an HTTP 400 exception if the email is already in use', async () => {
      (usersServiceMock.useValue.findByEmail as jest.Mock).mockResolvedValue(
        usersListMock[0],
      );

      const result = async () => {
        return await service.register(createUserMock);
      };

      expect(result()).rejects.toThrow(HttpException);
      expect(result()).rejects.toHaveProperty(
        'response',
        'Email is already in use.',
      );
      expect(result()).rejects.toHaveProperty('status', 400);
    });
  });
});

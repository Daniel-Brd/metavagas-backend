import { TestingModule, Test } from '@nestjs/testing';

import { AuthService } from './auth.service';

import { usersServiceMock } from '../testing/mocks/users-mocks/users-service.mock';
import { jwtServiceMock } from '../testing/mocks/jwt-mocks/jwt-service.mock';
import { createUserMock } from '../testing/mocks/users-mocks/create-user.mock';
import { usersListMock } from '../testing/mocks/users-mocks/users-list.mock';
import { loginMock } from '../testing/mocks/auth-mocks/login.mock';
import { jwtTokenMock } from '../testing/mocks/jwt-mocks/jwt-token.mock';

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
  });

  describe('register', () => {
    it('should create and return an user.', async () => {
      (usersServiceMock.useValue.findByEmail as jest.Mock).mockResolvedValue(
        null,
      );

      const result = await service.register(createUserMock);

      expect(result).toEqual(usersListMock[0]);
    });
  });
});

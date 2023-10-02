import { TestingModule, Test } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { loginMock } from "../testing/mocks/auth-mocks/login.mock";
import { usersListMock } from "../testing/mocks/users-mocks/users-list.mock";
import { jwtTokenMock } from "../testing/mocks/jwt-mocks/jwt-token.mock";
import { authServiceMock } from "../testing/mocks/auth-mocks/auth-service.mock";
import { createUserMock } from "../testing/mocks/users-mocks/create-user.mock";

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT token', async () => {

      const result = await controller.login(loginMock)

      expect(result).toEqual({
        data: {
          name: usersListMock[0].name,
          email: usersListMock[0].email,
          isActive: usersListMock[0].isActive,
        },
        token: jwtTokenMock
      })
    })
  })

  describe('register', () => {
    it('should create and return an user.', async () => {

      const result = await controller.register(createUserMock);

      expect(result).toEqual(usersListMock[0]);
    });
  });
});

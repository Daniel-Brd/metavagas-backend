import { AuthService } from '../../../auth/auth.service';
import { usersListMock } from '../users-mocks/users-list.mock';
import { jwtTokenMock } from '../jwt-mocks/jwt-token.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    register: jest.fn().mockResolvedValue(usersListMock[0]),
    login: jest.fn().mockResolvedValue({
      data: {
        name: usersListMock[0].name,
        email: usersListMock[0].email,
        isActive: usersListMock[0].isActive,
      },
      token: jwtTokenMock,
    }),
  },
};

import { UsersService } from "../../users/users.service";
import { updateUserMock } from "./update-user.mock";
import { userProfileMock } from "./user-profile.mock";
import { usersListMock } from "./users-list.mock";

export const usersServiceMock = {
  provide: UsersService,
  useValue: {
    create: jest.fn().mockResolvedValue(usersListMock[0]),
    findAll: jest.fn().mockResolvedValue(usersListMock),
    findById: jest.fn().mockResolvedValue(usersListMock[0]),
    update: jest.fn().mockResolvedValue({ ...usersListMock[0], ...updateUserMock }),
    softDelete: jest.fn().mockResolvedValue({ ...usersListMock[0], isActive: false }),
    findProfile: jest.fn().mockResolvedValue(userProfileMock)
  }
}
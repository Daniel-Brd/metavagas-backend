import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../database/entities/user.entity";
import { usersListMock } from "./users-list.mock";
import { updateUserMock } from "./update-user.mock";
import { userProfileMock } from "./user-profile.mock";

export const userRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    create: jest.fn().mockResolvedValue(usersListMock[0]),
    save: jest.fn().mockResolvedValue(usersListMock[0]),
    find: jest.fn().mockResolvedValue(usersListMock),
    findOneBy: jest.fn().mockResolvedValue(usersListMock[0]),
    update: jest.fn().mockResolvedValue({ ...usersListMock[0], ...updateUserMock }),
    findOne: jest.fn().mockResolvedValue(userProfileMock),
  },
};
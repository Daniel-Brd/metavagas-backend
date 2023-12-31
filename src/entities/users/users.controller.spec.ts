import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';

import { UsersController } from './users.controller';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PermissionGuard } from '../../auth/guards/permission.guard';

import { usersServiceMock } from '../../testing/mocks/users-mocks/users-service.mock';
import { usersListMock } from '../../testing/mocks/users-mocks/users-list.mock';
import { updateUserMock } from '../../testing/mocks/users-mocks/update-user.mock';
import { userProfileMock } from '../../testing/mocks/users-mocks/user-profile.mock';
import { authGuardMock } from '../../testing/mocks/auth-mocks/auth-guard.mock';
import { permissionGuardMock } from '../../testing/mocks/auth-mocks/roles-guard.mock';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [usersServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(PermissionGuard)
      .useValue(permissionGuardMock)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Read', () => {
    describe('findAll', () => {
      it('Should return a list of users', async () => {
        const result = await controller.findAll();

        expect(result).toEqual(usersListMock);
      });

      it('Should return an error if the users is not found', async () => {
        (usersServiceMock.useValue.findAll as jest.Mock).mockResolvedValue(
          new HttpException('Users not found.', 404),
        );

        const result = await controller.findAll();

        expect(result).toEqual(new HttpException('Users not found.', 404));
        expect(result).toBeInstanceOf(HttpException);
      });
    });

    describe('findProfile', () => {
      it('Should return an user profile', async () => {
        const result = await controller.findProfile(usersListMock[0].id);

        expect(result).toEqual(userProfileMock);
      });

      it('Should return an error if the profile is not found', async () => {
        (usersServiceMock.useValue.findProfile as jest.Mock).mockResolvedValue(
          new HttpException('Profile not found.', 404),
        );

        const result = await controller.findProfile(
          '1234abcd-a01b-1234-5678-1ab2c34d56e7',
        );

        expect(result).toEqual(new HttpException('Profile not found.', 404));
        expect(result).toBeInstanceOf(HttpException);
      });
    });

    describe('findById', () => {
      it('Should return an user', async () => {
        const result = await controller.findById(usersListMock[0].id);

        expect(result).toEqual(usersListMock[0]);
      });

      it('Should return an error if the user is not found', async () => {
        (usersServiceMock.useValue.findById as jest.Mock).mockResolvedValue(
          new HttpException('User not found.', 404),
        );

        const result = await controller.findById(
          '1234abcd-a01b-1234-5678-1ab2c34d56e7',
        );

        expect(result).toEqual(new HttpException('User not found.', 404));
        expect(result).toBeInstanceOf(HttpException);
      });
    });
  });

  describe('Update', () => {
    describe('update', () => {
      it('should update and return an user', async () => {
        const result = await controller.update(
          usersListMock[0].id,
          updateUserMock,
        );

        expect(result).toEqual({ ...usersListMock[0], ...updateUserMock });
      });
    });

    it('Should return an error if the user is not found', async () => {
      (usersServiceMock.useValue.update as jest.Mock).mockResolvedValue(
        new HttpException('User not found.', 404),
      );

      const result = await controller.update(
        '1234abcd-a01b-1234-5678-1ab2c34d56e7',
        updateUserMock,
      );

      expect(result).toEqual(new HttpException('User not found.', 404));
      expect(result).toBeInstanceOf(HttpException);
    });

    it('Should return an error if something went wrong with update', async () => {
      (usersServiceMock.useValue.update as jest.Mock).mockResolvedValue(
        new HttpException('Something went wrong with update.', 400),
      );

      const result = await controller.update(
        usersListMock[0].id,
        updateUserMock,
      );

      expect(result).toEqual(
        new HttpException('Something went wrong with update.', 400),
      );
      expect(result).toBeInstanceOf(HttpException);
    });
  });

  describe('Delete', () => {
    describe('softDelete', () => {
      it('should inactivate and return an user', async () => {
        const result = await controller.softDelete(usersListMock[0].id);

        expect(result).toEqual({ ...usersListMock[0], isActive: false });
      });

      it('Should return an error if the user is not found', async () => {
        (usersServiceMock.useValue.softDelete as jest.Mock).mockResolvedValue(
          new HttpException('User not found.', 404),
        );

        const result = await controller.softDelete(
          '1234abcd-a01b-1234-5678-1ab2c34d56e7',
        );

        expect(result).toEqual(new HttpException('User not found.', 404));
        expect(result).toBeInstanceOf(HttpException);
      });

      it('Should return an error if something went wrong with soft delete', async () => {
        (usersServiceMock.useValue.softDelete as jest.Mock).mockResolvedValue(
          new HttpException('Something went wrong with delete.', 400),
        );

        const result = await controller.softDelete(usersListMock[0].id);

        expect(result).toEqual(
          new HttpException('Something went wrong with delete.', 400),
        );
        expect(result).toBeInstanceOf(HttpException);
      });
    });
  });
});

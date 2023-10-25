import { Test, TestingModule } from '@nestjs/testing';
import { TechnologiesController } from './technologies.controller';
import { technologiesServiceMock } from '../../testing/mocks/technologies-mocks/technologies-service.mock';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { authGuardMock } from '../../testing/mocks/auth-mocks/auth-guard.mock';
import { PermissionGuard } from '../../auth/guards/permission.guard';
import { permissionGuardMock } from '../../testing/mocks/auth-mocks/roles-guard.mock';
import { createTechnologyMock } from '../../testing/mocks/technologies-mocks/create-technology.mock';
import { technologyListMock } from '../../testing/mocks/technologies-mocks/technology-list.mock';
import { HttpException } from '@nestjs/common';
import { updateTechnologyMock } from '../../testing/mocks/technologies-mocks/update-technology.mock';

describe('TechnologiesController', () => {
  let controller: TechnologiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnologiesController],
      providers: [technologiesServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(PermissionGuard)
      .useValue(permissionGuardMock)
      .compile();

    controller = module.get<TechnologiesController>(TechnologiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create', () => {
    it('Should create and return an technology', async () => {
      const result = await controller.create(createTechnologyMock);

      expect(result).toEqual(technologyListMock[0]);
    });
  });

  describe('Read', () => {
    describe('findAll', () => {
      it('Should return a list of technologies', async () => {
        const result = await controller.findAll();

        expect(result).toEqual(technologyListMock);
      });
    });

    describe('findOne', () => {
      it('Should return an technology', async () => {
        const result = await controller.findOne(technologyListMock[0].id);

        expect(result).toEqual(technologyListMock[0]);
      });

      it('Should return an error if the technology is not found', async () => {
        (
          technologiesServiceMock.useValue.findById as jest.Mock
        ).mockResolvedValue(new HttpException('Technology not found.', 404));

        const result = await controller.findOne(
          '1534abcd-a01b-1834-5678-1ab2c34d56e6',
        );

        expect(result).toEqual(new HttpException('Technology not found.', 404));
        expect(result).toBeInstanceOf(HttpException);
      });
    });
  });
  describe('remove', () => {
    it('Should successfully remove a technology', async () => {
      const idToRemove = '1234abcd-a01b-1234-5678-1ab2c34d56e7';
      const result = await controller.remove(idToRemove);

      expect(result).toEqual({ success: true });
      expect(technologiesServiceMock.useValue.remove).toHaveBeenCalledWith(
        idToRemove,
      );
    });

    it('Should return an error if the technology is not found', async () => {
      const idToRemove = '1234abcd-a01b-1234-5678-1ab2c34d56e7';
      technologiesServiceMock.useValue.remove.mockRejectedValue(
        new HttpException('Technology not found', 404),
      );
      await expect(controller.remove(idToRemove)).rejects.toThrow(
        new HttpException('Technology not found', 404),
      );
    });
  });

  describe('Update', () => {
    describe('update', () => {
      it('Should update and return an technology', async () => {
        const result = await controller.update(
          technologyListMock[0].id,
          updateTechnologyMock,
        );

        expect(result).toEqual({
          ...technologyListMock[0],
          ...updateTechnologyMock,
        });
      });
    });
  });
});

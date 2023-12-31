import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { companyServiceyMock } from '../../testing/mocks/companies-mocks/companies-service.mock';
import { createCompanyrMock } from '../../testing/mocks/companies-mocks/create-company.mock';
import { companyListMock } from '../../testing/mocks/companies-mocks/companies-list.mock';
import { HttpException } from '@nestjs/common';
import { updateCompanyrMock } from '../../testing/mocks/companies-mocks/update-company.mock';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PermissionGuard } from '../../auth/guards/permission.guard';
import { authGuardMock } from '../../testing/mocks/auth-mocks/auth-guard.mock';
import { permissionGuardMock } from '../../testing/mocks/auth-mocks/roles-guard.mock';

describe('CompaniesController', () => {
  let controller: CompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [companyServiceyMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(PermissionGuard)
      .useValue(permissionGuardMock)
      .compile();

    controller = module.get<CompaniesController>(CompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create', () => {
    it('should create and return an company', async () => {
      const result = await controller.create(createCompanyrMock);

      expect(result).toEqual(companyListMock[0]);
    });
  });

  describe('Read', () => {
    describe('findall', () => {
      it('Should return a list of companies', async () => {
        const result = await controller.findAll();

        expect(result).toEqual(companyListMock);
      });
    });

    describe('findById', () => {
      const FAKE_ID = '1674gdca-a12b-1571-5234-1bb3c84d56s7';
      const mockCompany = companyListMock[0];

      const mockFindByIdSuccess = () => {
        (companyServiceyMock.useValue.findById as jest.Mock).mockResolvedValue(
          mockCompany,
        );
      };

      const mockFindByIdFailure = () => {
        (companyServiceyMock.useValue.findById as jest.Mock).mockResolvedValue(
          new HttpException('Company not found.', 403),
        );
      };

      it('should return a company when provided a valid id', async () => {
        mockFindByIdSuccess();
        const result = await controller.findOne(mockCompany.id);
        expect(result).toEqual(mockCompany);
      });

      it('should return a 404 error when the company is not found', async () => {
        mockFindByIdFailure();
        try {
          await controller.findOne(FAKE_ID);
        } catch (error) {
          expect(error).toEqual(new HttpException('Company not found.', 404));
          expect(error).toBeInstanceOf(HttpException);
        }
      });
    });
  });
  describe('remove', () => {
    it('Should successfully remove a company', async () => {
      const idToRemove = '1234abcd-a01b-1234-5678-1ab2c34d56e7';
      const result = await controller.remove(idToRemove);

      expect(result).toEqual({ success: true });
      expect(companyServiceyMock.useValue.remove).toHaveBeenCalledWith(
        idToRemove,
      );
    });

    it('Should return an error if the company is not found', async () => {
      const idToRemove = '1234abcd-a01b-1234-5678-1ab2c34d56e7';
      companyServiceyMock.useValue.remove.mockRejectedValue(
        new HttpException('Company not found', 404),
      );
      await expect(controller.remove(idToRemove)).rejects.toThrow(
        new HttpException('Company not found', 404),
      );
    });
  });

  describe('Update', () => {
    describe('update', () => {
      it('should update and return an company', async () => {
        const result = await controller.update(
          companyListMock[0].id,
          updateCompanyrMock,
        );

        expect(result).toEqual({
          ...companyListMock[0],
          ...updateCompanyrMock,
        });
      });
    });
  });
});

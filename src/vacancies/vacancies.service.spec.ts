import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';

import { VacanciesService } from './vacancies.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { authGuardMock } from '../testing/mocks/auth-mocks/auth-guard.mock';
import { rolesGuardMock } from '../testing/mocks/auth-mocks/roles-guard.mock';
import { usersServiceMock } from '../testing/mocks/users-mocks/users-service.mock';
import { companyServiceyMock } from '../testing/mocks/companies-mocks/companies-service.mock';
import { technologiesServiceMock } from '../testing/mocks/technologies-mocks/technologies-service.mock';
import { currentUserMock } from '../testing/mocks/users-mocks/current-user.mock';
import { createVacancyMock } from '../testing/mocks/vacancies-mocks/create-vacancy.mock';
import { vacanciesListMock } from '../testing/mocks/vacancies-mocks/vacancies-list.mock';
import { vacanciesRepositoryMock } from '../testing/mocks/vacancies-mocks/vacancies-repository.mock';
import { spreadsheetMock } from '../testing/mocks/xslx-mocks/spreadsheet.mock';
import { spreadsheetReturnMock } from '../testing/mocks/xslx-mocks/srpeadsheet-return.mock';

describe('VacanciesService', () => {
  let service: VacanciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VacanciesService,
        vacanciesRepositoryMock,
        companyServiceyMock,
        usersServiceMock,
        technologiesServiceMock,
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .compile();

    service = module.get<VacanciesService>(VacanciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a vacancy', async () => {
      const result = await service.create(createVacancyMock, currentUserMock);

      expect(result).toEqual(vacanciesListMock[0]);
    });

    it('should return an error if vacancy company is not found', async () => {
      companyServiceyMock.useValue.findByName.mockRejectedValueOnce(
        new HttpException('Company not found.', 404),
      );

      const result = async () =>
        await service.create(
          { ...createVacancyMock, companyName: 'invalid company' },
          currentUserMock,
        );

      expect(result()).rejects.toThrow(
        new HttpException('Company not found.', 404),
      );
    });

    it('should return an error if vacancy advertiser is not found', async () => {
      usersServiceMock.useValue.findById.mockRejectedValueOnce(
        new HttpException('User not found.', 404),
      );

      const result = async () =>
        await service.create(createVacancyMock, {
          ...currentUserMock,
          userId: '1234abcd-a01b-1234-5678-1ab2c34d56e7',
        });

      expect(result()).rejects.toThrow(
        new HttpException('User not found.', 404),
      );
    });

    it('should return an error if an vacancy technology is not found', async () => {
      technologiesServiceMock.useValue.findByName.mockRejectedValueOnce(
        // eslint-disable-next-line quotes
        new HttpException("technology 'invalid' was not found", 404),
      );

      const result = async () =>
        await service.create(
          { ...createVacancyMock, technologies: ['invalid'] },
          currentUserMock,
        );

      expect(result()).rejects.toThrow(
        // eslint-disable-next-line quotes
        new HttpException("technology 'invalid' was not found", 404),
      );
    });
  });

  describe('uploadSpreadsheets', () => {
    it('should create a list of users using a spreadsheet', async () => {
      const result = await service.uploadSpreadsheets(
        await spreadsheetMock,
        currentUserMock,
      );

      expect(result).toEqual(spreadsheetReturnMock);
    });
  });
});

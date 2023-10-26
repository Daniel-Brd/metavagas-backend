import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { createCompanyrMock } from '../../testing/mocks/companies-mocks/create-company.mock';
import { companyListMock } from '../../testing/mocks/companies-mocks/companies-list.mock';
import { companyRepositoryMock } from '../../testing/mocks/companies-mocks/companies-repository.mock';
import { HttpException } from '@nestjs/common';
import { Like } from 'typeorm';
import { QueryCompanyDTO } from './dto/query-company.dto';

describe('CompaniesService', () => {
  let service: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesService, companyRepositoryMock],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('should create and return a company', async () => {
      const result = await service.create(createCompanyrMock);
      expect(result).toEqual(companyListMock[0]);
      expect(companyRepositoryMock.useValue.create).toHaveBeenCalledWith(
        createCompanyrMock,
      );
      expect(companyRepositoryMock.useValue.save).toHaveBeenCalledWith(
        companyListMock[0],
      );
    });

    it('should throw an error when the database save operation fails', async () => {
      companyRepositoryMock.useValue.save.mockRejectedValue(
        new Error('Database error'),
      );

      await expect(service.create(createCompanyrMock)).rejects.toThrow(
        new HttpException('Database error', 500),
      );
    });
  });

  describe('Read', () => {
    describe('findAll', () => {
      it('should return companies when query is provided', async () => {
        const query: QueryCompanyDTO = { name: 'test' };
        companyRepositoryMock.useValue.find.mockResolvedValue(companyListMock);

        const result = await service.findAll(query);

        expect(result).toEqual(companyListMock);
        expect(companyRepositoryMock.useValue.find).toHaveBeenCalledWith({
          where: { name: Like('%test%') },
          relations: ['vacancies'],
        });
      });

      it('should return companies when no query is provided', async () => {
        companyRepositoryMock.useValue.find.mockResolvedValue(companyListMock);

        const result = await service.findAll();

        expect(result).toEqual(companyListMock);
        expect(companyRepositoryMock.useValue.find).toHaveBeenCalledWith({
          relations: ['vacancies'],
        });
      });

      it('should throw an error when the database operation fails', async () => {
        companyRepositoryMock.useValue.find.mockRejectedValue(
          new Error('Database error'),
        );

        await expect(service.findAll()).rejects.toThrow(
          new HttpException('Database error', 500),
        );
      });
    });

    describe('findById', () => {
      const triggerErrorId = 'd98a2114-0000-4591-982c-bdbd38600000';

      it('Should return an company', async () => {
        const result = await service.findById(companyListMock[0].id);

        expect(result).toEqual(companyListMock[0]);
      });

      it('Should throw a 404 HttpException when company is not found', async () => {
        companyRepositoryMock.useValue.findOne.mockResolvedValue(null);

        await expect(service.findById(triggerErrorId)).rejects.toThrow(
          new HttpException('Company not found.', 404),
        );
      });

      it('Should throw a 500 HttpException on unexpected error during findById', async () => {
        companyRepositoryMock.useValue.findOne.mockRejectedValue(
          new Error('Unexpected error'),
        );
        await expect(service.findById(triggerErrorId)).rejects.toThrow(
          new HttpException('Unexpected error', 500),
        );
      });
    });

    describe('findByName', () => {
      const triggerErrorName = 'Nestjs';

      it('Should return a company when found by name', async () => {
        companyRepositoryMock.useValue.findOneBy.mockResolvedValue(
          companyListMock[0],
        );
        const result = await service.findByName(triggerErrorName);
        expect(result).toEqual(companyListMock[0]);
      });

      it('Should throw a 404 HttpException when company is not found', async () => {
        companyRepositoryMock.useValue.findOneBy.mockResolvedValue(null);

        await expect(service.findByName('notExistingName')).rejects.toThrow(
          new HttpException('Company not found.', 404),
        );
      });
      it('Should throw a 500 HttpException on unexpected error during findByName', async () => {
        companyRepositoryMock.useValue.findOneBy.mockRejectedValue(
          new Error('Unexpected error'),
        );
        await expect(service.findByName(triggerErrorName)).rejects.toThrow(
          new HttpException('Unexpected error', 500),
        );
      });
    });
  });

  describe('Update', () => {
    const validId = 'd98a2114-a1e3-4591-982c-bdbd38607e44';
    const triggerErrorId = 'd98a2114-0000-4591-982c-bdbd38600000';
    const updateDto = { name: 'UpdatedName' };

    it('Should update and return a company', async () => {
      companyRepositoryMock.useValue.findOne.mockResolvedValue(
        companyListMock[0],
      );
      companyRepositoryMock.useValue.save.mockResolvedValue({
        ...companyListMock[0],
        ...updateDto,
      });
      companyRepositoryMock.useValue.merge.mockImplementation((...args) =>
        Object.assign({}, ...args),
      );

      const result = await service.update(validId, updateDto);

      expect(result).toEqual({ ...companyListMock[0], ...updateDto });
      expect(companyRepositoryMock.useValue.save).toHaveBeenCalledWith({
        ...companyListMock[0],
        ...updateDto,
      });
    });

    it('Should throw a 404 HttpException when company is not found', async () => {
      companyRepositoryMock.useValue.findOne.mockResolvedValue(null);

      await expect(service.update(triggerErrorId, updateDto)).rejects.toThrow(
        new HttpException('Company not found.', 404),
      );
    });
    it('Should throw an error when the database update fails', async () => {
      companyRepositoryMock.useValue.findOne.mockResolvedValue(
        companyListMock[0],
      );
      companyRepositoryMock.useValue.save.mockRejectedValue(
        new Error('Database error'),
      );

      await expect(service.update(validId, updateDto)).rejects.toThrowError(
        'Database error',
      );
    });
  });
  describe('Company remove', () => {
    describe('remove', () => {
      const triggerErrorId = 'd98a2114-0000-4591-982c-bdbd38600000';

      it('Must successfully remove and return company', async () => {
        companyRepositoryMock.useValue.findOneBy.mockResolvedValue(
          companyListMock[0],
        );
        companyRepositoryMock.useValue.delete.mockResolvedValue({
          affected: 1,
        });

        const response = await service.remove(companyListMock[0].id);

        expect(response.message).toBe('company sucessfully deleted');
        expect(response.removed).toEqual(companyListMock[0]);
      });

      it('Should throw a 404 HttpException exception when the company is not found', async () => {
        companyRepositoryMock.useValue.findOneBy.mockResolvedValueOnce(null);

        await expect(service.remove(triggerErrorId)).rejects.toThrow(
          new HttpException('Company not found.', 404),
        );
      });

      it('Should throw a 500 HttpException on unexpected error during delete', async () => {
        service.findById = jest.fn().mockResolvedValue(companyListMock[0]);

        companyRepositoryMock.useValue.delete.mockRejectedValue(
          new Error('Unexpected error'),
        );

        await expect(service.remove(companyListMock[0].id)).rejects.toThrow(
          new HttpException('Unexpected error', 500),
        );
      });
    });
  });
});

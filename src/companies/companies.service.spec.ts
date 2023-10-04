import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { createCompanyrMock } from '../testing/mocks/create-company.mock';
import { companyListMock } from '../testing/mocks/company-list-mock';
import { companyRepositoryMock } from '../testing/mocks/company-repository.mock';
import { updateCompanyrMock } from '../testing/mocks/update-company.mock';

describe('CompaniesService', () => {
  let service: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesService, companyRepositoryMock ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and return an company', async () => {
    const result = await service.create(createCompanyrMock);
    expect(result).toEqual(companyListMock[0]);
  });

  describe('Read', () => {
    describe('findAll', () => {
      it('Should return a list of companies', async () => {
        const result = await service.findAll()

        expect(result).toEqual(companyListMock)
      })
    })

    describe('findById', () => {
      it('Should return an company', async () => {
        const result = await service.findById(companyListMock[0].id)

        expect(result).toEqual(companyListMock[0])
      })
    })
  })

  describe('Update', () => {
    it('should update and return an updated company', async () => {
      const result = await service.update(companyListMock[0].id, updateCompanyrMock);
      expect(result).toEqual({ ...companyListMock[0], ...updateCompanyrMock });
    });
  });
});

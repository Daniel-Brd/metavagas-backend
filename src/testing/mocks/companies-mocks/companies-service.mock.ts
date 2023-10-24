import { companyListMock } from './companies-list.mock';
import { CompaniesService } from '../../../entities/companies/companies.service';

export const companyServiceyMock = {
  provide: CompaniesService,
  useValue: {
    create: jest.fn().mockResolvedValue(companyListMock[0]),
    findAll: jest.fn().mockResolvedValue(companyListMock),
    findById: jest.fn().mockResolvedValue(companyListMock[0]),
    update: jest.fn().mockImplementation((companyId, updatedValues) => ({
      ...companyListMock.find(company => company.id === companyId),
      ...updatedValues,
    })),
    findByName: jest.fn().mockImplementation(companyName => {
      companyListMock.find(company => company.name === companyName);
    }),
  },
};

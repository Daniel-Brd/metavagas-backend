import { getRepositoryToken } from '@nestjs/typeorm';
import { Company } from '../../../database/entities/company.entity';
import { companyListMock } from './companies-list.mock';

export const companyRepositoryMock = {
  provide: getRepositoryToken(Company),
  useValue: {
    create: jest.fn().mockReturnValue(companyListMock[0]),
    find: jest.fn().mockResolvedValue(companyListMock),
    findOne: jest.fn().mockResolvedValue(companyListMock[0]),
    findOneBy: jest.fn().mockResolvedValue(companyListMock),
    delete: jest.fn().mockResolvedValue({ affected: 1 } as any),
    merge: jest.fn().mockImplementation((existingCompany, updatedValues) => ({
      ...existingCompany,
      ...updatedValues,
    })),
    save: jest.fn().mockImplementation(updatedCompany => ({
      ...companyListMock[0],
      ...updatedCompany,
    })),
  },
};

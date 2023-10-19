import { getRepositoryToken } from '@nestjs/typeorm';
import { Vacancy } from '../../database/entities/vacancies.entity';
import { vacanciesListMock } from './vacancies-list.mock';

export const vacanciesRepositoryMock = {
  provide: getRepositoryToken(Vacancy),
  useValue: {
    create: jest.fn().mockResolvedValue(vacanciesListMock[0]),
    save: jest.fn().mockResolvedValue(vacanciesListMock[0]),
  },
};

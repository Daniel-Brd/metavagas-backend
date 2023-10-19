import { CreateVacancyDto } from '../../../vacancies/dto/create-vacancy.dto';

export const createVacancyMock: CreateVacancyDto = {
  companyName: 'mocked company name',
  level: 'mocked level',
  location: 'mocked location',
  technologies: ['mocked tech 1', 'mocked tech 2', 'mocked tech 3'],
  vacancyDescription: 'mocked description',
  vacancyRole: 'mocked vacancy role',
  vacancyType: 'Hibrido',
  wage: 5000,
};

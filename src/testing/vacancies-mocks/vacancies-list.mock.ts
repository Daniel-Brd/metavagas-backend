import { technologyListMock } from '../mocks/technologies-mocks/technology-list.mock';

export const vacanciesListMock = [
  {
    id: '0d2b9042-1305-4faf-9240-b8014a9ff045',
    companyName: 'mocked company name',
    level: 'mocked level',
    location: 'mocked, location',
    technologies: [technologyListMock[0], technologyListMock[1]],
    vacancyDescription: 'mocked description',
    vacancyRole: 'mocked vacancy role',
    vacancyType: 'Hibrido',
    wage: 5000,
    createdAt: '2023-01-01T00:0:00.000Z',
    updateAt: '2023-01-01T00:0:00.000Z',
  },
  {
    id: 'c7f9c611-acf3-4817-bef3-88ebfd660067',
    companyName: 'second mocked company name',
    level: 'second mocked level',
    location: 'second mocked, location',
    technologies: [technologyListMock[0], technologyListMock[1]],
    vacancyDescription: 'second mocked description',
    vacancyRole: 'second mocked vacancy role',
    vacancyType: 'Presencial',
    wage: 8000,
    createdAt: '2023-01-01T00:0:00.000Z',
    updateAt: '2023-01-01T00:0:00.000Z',
  },
];

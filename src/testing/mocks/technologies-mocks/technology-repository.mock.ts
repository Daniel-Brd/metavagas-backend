import { getRepositoryToken } from '@nestjs/typeorm';
import { Technology } from '../../../database/entities/technology.entity';
import { technologyListMock } from './technology-list.mock';

export const technologyRepositoryMock = {
  provide: getRepositoryToken(Technology),
  useValue: {
    create: jest.fn().mockResolvedValue(technologyListMock[0]),
    save: jest.fn().mockResolvedValue(technologyListMock[0]),
    findOneBy: jest.fn().mockResolvedValue(technologyListMock[0]),
    find: jest.fn().mockResolvedValue(technologyListMock),
    findOne: jest.fn().mockResolvedValue(technologyListMock[0]),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 } as any),
  },
};

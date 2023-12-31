import { TechnologiesService } from '../../../entities/technologies/technologies.service';
import { technologyListMock } from './technology-list.mock';
import { updateTechnologyMock } from './update-technology.mock';

export const technologiesServiceMock = {
  provide: TechnologiesService,
  useValue: {
    create: jest.fn().mockResolvedValue(technologyListMock[0]),
    findAll: jest.fn().mockResolvedValue(technologyListMock),
    findById: jest.fn().mockResolvedValue(technologyListMock[0]),
    remove: jest.fn().mockResolvedValue({ success: true }),
    update: jest
      .fn()
      .mockResolvedValue({ ...technologyListMock[0], ...updateTechnologyMock }),
    findByName: jest.fn().mockImplementation(techName => {
      technologyListMock.find(tech => tech.techName === techName);
    }),
  },
};

import { Test, TestingModule } from '@nestjs/testing';
import { TechnologiesService } from './technologies.service';
import { technologyRepositoryMock } from '../testing/mocks/technologies-mocks/technology-repository.mock';
import { createTechnologyMock } from '../testing/mocks/technologies-mocks/create-technology.mock';
import { technologyListMock } from '../testing/mocks/technologies-mocks/technology-list.mock';
import { HttpException } from '@nestjs/common';
import { updateTechnologyMock } from '../testing/mocks/technologies-mocks/update-technology.mock';

describe('TechnologiesService', () => {
  let service: TechnologiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechnologiesService, technologyRepositoryMock],
    }).compile();

    service = module.get<TechnologiesService>(TechnologiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Technology Creation', () => {
    it('should create and return a technology', async () => {
      const result = await service.create(createTechnologyMock);
      expect(result).toEqual(technologyListMock[0]);
    });

    it('should throw an error when creating a technology fails', async () => {
      const errorMsg = 'Erro de teste';
      technologyRepositoryMock.useValue.save.mockRejectedValue(
        new Error(errorMsg),
      );

      await expect(service.create(createTechnologyMock)).rejects.toThrow(
        errorMsg,
      );
    });
  });

  describe('Technology Retrieval', () => {
    describe('findById', () => {
      it('Should return a technology', async () => {
        const result = await service.findById(technologyListMock[0].id);
        expect(result).toEqual(technologyListMock[0]);
      });

      it('Should throw a 404 HttpException when technology is not found', async () => {
        technologyRepositoryMock.useValue.findOneBy.mockResolvedValue(null);

        const nonexistentId = '1234abcd-a01b-1234-5678-1ab2c34d56e7-a123d';
        await expectError(
          () => service.findById(nonexistentId),
          'Technology not found',
          404,
        );
      });

      it('Should throw a 500 HttpException on unexpected error', async () => {
        technologyRepositoryMock.useValue.findOneBy.mockRejectedValue(
          new Error('Unexpected error'),
        );

        await expectError(
          () => service.findById('1234abcd-a01b-1234-5678-1ab2c34d56e7'),
          'Unexpected error',
          500,
        );
      });
    });

    describe('findAll', () => {
      const mockTechnology = { name: 'Nestjs' };

      it('Should return all technologies', async () => {
        const result = await service.findAll();
        expect(result).toEqual(technologyListMock);
      });

      it('Should return a specific technology given its name as a string parameter', async () => {
        service.findByName = jest.fn().mockResolvedValue(mockTechnology);
        const result = await service.findAll([mockTechnology.name]);
        expect(result).toEqual([mockTechnology]);
        expect(service.findByName).toHaveBeenCalledWith(mockTechnology.name);
      });

      it('Should throw a 500 HttpException when there is an error in findByName', async () => {
        jest
          .spyOn(service, 'findByName')
          .mockRejectedValue(new Error('Test error in findByName'));
        await expectError(
          () => service.findAll([mockTechnology.name]),
          'Test error in findByName',
          500,
        );
      });
    });

    describe('findByName', () => {
      const techName = 'Nestjs';

      it('Should return a technology when found by name', async () => {
        technologyRepositoryMock.useValue.findOneBy.mockResolvedValue(
          technologyListMock[0],
        );

        const result = await service.findByName(techName);
        expect(result).toEqual(technologyListMock[0]);
      });

      it('Should throw a 404 HttpException when technology is not found by name', async () => {
        technologyRepositoryMock.useValue.findOne.mockResolvedValue(null);

        await expectError(
          () => service.findByName('example'),
          "technology 'example' was not found",
          404,
        );
      });

      it('Should throw a 500 HttpException on unexpected error during findByName', async () => {
        technologyRepositoryMock.useValue.findOne.mockRejectedValue(
          new Error('Unexpected error'),
        );

        await expectError(
          () => service.findByName(techName),
          'Unexpected error',
          500,
        );
      });
    });
  });

  describe('Technology Update and Removal', () => {
    describe('update', () => {
      it('Should update and return a technology', async () => {
        (
          technologyRepositoryMock.useValue.findOneBy as jest.Mock
        ).mockResolvedValue({
          ...technologyListMock[0],
          ...updateTechnologyMock,
        });

        const result = await service.update(
          technologyListMock[0].id,
          updateTechnologyMock,
        );

        expect(result).toEqual({
          ...technologyListMock[0],
          ...updateTechnologyMock,
        });
      });

      it('Should return an error if update fails', async () => {
        (
          technologyRepositoryMock.useValue.update as jest.Mock
        ).mockResolvedValue(null);

        await expect(
          service.update(technologyListMock[0].id, updateTechnologyMock),
        ).rejects.toThrow('Something went wrong with update.');
      });

      it('Should return an error if technology is not found', async () => {
        (
          technologyRepositoryMock.useValue.findOneBy as jest.Mock
        ).mockResolvedValue(null);

        await expect(
          service.update(technologyListMock[0].id, updateTechnologyMock),
        ).rejects.toThrow('Technology not found');
      });
    });

    describe('remove', () => {
      const triggerErrorId = 'd98a2114-0000-4591-982c-bdbd38600000';

      it('Must successfully remove and return technology', async () => {
        service.findById = jest.fn().mockResolvedValue(technologyListMock[0]);

        technologyRepositoryMock.useValue.delete.mockResolvedValue({
          affected: 1,
        });

        const response = await service.remove(technologyListMock[0].id);

        expect(response.message).toBe('technology successfully deleted');
        expect(response.removed).toEqual(technologyListMock[0]);
      });

      it('Should throw a 404 HttpException exception when the technology is not found', async () => {
        technologyRepositoryMock.useValue.findOne.mockResolvedValueOnce(null);

        await expect(service.remove(triggerErrorId)).rejects.toThrow(
          new HttpException('Technology not found', 404),
        );
      });

      it('Should throw a 500 HttpException on unexpected error during delete', async () => {
        service.findById = jest.fn().mockResolvedValue(technologyListMock[0]);

        technologyRepositoryMock.useValue.delete.mockRejectedValue(
          new Error('Unexpected error'),
        );

        await expect(service.remove(technologyListMock[0].id)).rejects.toThrow(
          new HttpException('Unexpected error', 500),
        );
      });
    });
  });

  async function expectError(
    asyncFn: () => Promise<any>,
    errMsg: string,
    errStatus: number,
  ) {
    await expect(asyncFn()).rejects.toThrow(HttpException);
    await expect(asyncFn()).rejects.toHaveProperty('response', errMsg);
    await expect(asyncFn()).rejects.toHaveProperty('status', errStatus);
  }
});

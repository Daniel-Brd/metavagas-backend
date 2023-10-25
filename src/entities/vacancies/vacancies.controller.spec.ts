import { Test, TestingModule } from '@nestjs/testing';
import { VacanciesController } from './vacancies.controller';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PermissionGuard } from '../../auth/guards/permission.guard';
import { authGuardMock } from '../../testing/mocks/auth-mocks/auth-guard.mock';
import { permissionGuardMock } from '../../testing/mocks/auth-mocks/roles-guard.mock';
import { vacanciesServiceMock } from '../../testing/mocks/vacancies-mocks/vacancies-service.mock';
import { usersServiceMock } from '../../testing/mocks/users-mocks/users-service.mock';

describe('VacanciesController', () => {
  let controller: VacanciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacanciesController],
      providers: [vacanciesServiceMock, usersServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(PermissionGuard)
      .useValue(permissionGuardMock)
      .compile();

    controller = module.get<VacanciesController>(VacanciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

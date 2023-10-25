import { VacanciesService } from '../../../entities/vacancies/vacancies.service';

export const vacanciesServiceMock = {
  provide: VacanciesService,
  useValue: {},
};

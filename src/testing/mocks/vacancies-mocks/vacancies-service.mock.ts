import { VacanciesService } from '../../../vacancies/vacancies.service';

export const vacanciesServiceMock = {
  provide: VacanciesService,
  useValue: {},
};

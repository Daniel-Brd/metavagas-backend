import { vacanciesListMock } from '../vacancies-mocks/vacancies-list.mock';

export const spreadsheetReturnMock = [
  {
    sheetName: 'Mock',
    vacancies: {
      success: [
        { success: true, vacancy: vacanciesListMock[0] },
        { success: true, vacancy: vacanciesListMock[0] },
      ],
      failed: [],
    },
  },
];

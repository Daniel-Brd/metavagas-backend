import { CreateCompanyDto } from '../../../entities/companies/dto/create-company.dto';

export const createCompanyrMock: CreateCompanyDto = {
  name: 'test1',
  city: 'testCty',
  state: 'testState',
  address: 'addressTest',
  foundedAt: new Date('2023-01-01T00:0:00.000Z'),
  description: 'descriptionTest',
};

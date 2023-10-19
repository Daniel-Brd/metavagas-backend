import { RoleEnum } from '../../../enums/role.enum';
import { CurrentUserType } from '../../../decorators/user.decorator';

export const currentUserMock: CurrentUserType = {
  userName: 'name1 test',
  userEmail: 'test@gmail.com',
  userId: 'd98a2114-a1e3-4591-982c-bdbd38607e44',
  userRole: RoleEnum.candidate,
  vacancies: [],
  isActive: true,
};

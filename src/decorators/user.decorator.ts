import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RoleEnum } from '../enums/role.enum';
import { Vacancy } from '../database/entities/vacancies.entity';

export const getCurrentUserByContext = (
  ctx: ExecutionContext,
): CurrentUserType => {
  if (ctx.getType() === 'http') {
    return ctx.switchToHttp().getRequest().user;
  }
};

export interface CurrentUserType {
  userId: string;
  userName: string;
  userRole: RoleEnum;
  isActive: boolean;
  userEmail: string;
  vacancies: Vacancy[] | [];
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUserType => {
    const user = getCurrentUserByContext(ctx);

    return user;
  },
);

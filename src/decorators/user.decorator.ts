import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../database/entities/user.entity';

export const getCurrentUserByContext = (ctx: ExecutionContext): User => {
  if (ctx.getType() === 'http') {
    return ctx.switchToHttp().getRequest().user;
  }
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const user = getCurrentUserByContext(ctx);

    return user;
  },
);

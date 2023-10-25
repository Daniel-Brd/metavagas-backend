import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACTIVATE_USER_URL } from '../../utils/constants';
import { CurrentUserType } from 'src/decorators/user.decorator';

@Injectable()
export class IsActiveGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const {
      user,
      url,
    }: {
      user: CurrentUserType;
      url: string;
    } = context.switchToHttp().getRequest();

    if (!user.isActive && url !== `${ACTIVATE_USER_URL}${user.userId}`) {
      throw new HttpException('Inactive user', 401);
    }

    return true;
  }
}

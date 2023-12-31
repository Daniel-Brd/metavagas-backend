import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../../enums/role.enum';
import { PERMISSION_KEY, ROLES_KEY } from '../../utils/constants';
import { PermissionEnum } from '../../enums/permission.enum';
import { CurrentUserType } from '../../decorators/user.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const {
      user,
      params: { id: targetId },
    }: {
      user: CurrentUserType;
      params: { id: string };
    } = context.switchToHttp().getRequest();

    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const permissions = this.reflector.getAllAndOverride<PermissionEnum[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const isSelf = targetId === user.userId;

    if (permissions?.includes(PermissionEnum.self) && isSelf) {
      return true;
    }

    const isOwner = user.vacancies.find(({ id }) => id === targetId);

    if (permissions?.includes(PermissionEnum.owner) && isOwner) {
      return true;
    }

    if (requiredRoles.some(role => user.userRole?.includes(role))) {
      return true;
    }

    throw new HttpException('You do not have permission to this action.', 401);
  }
}

import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../../enums/role.enum';
import { ROLES_KEY } from '../../utils/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {

    const { user, params } = context.switchToHttp().getRequest()

    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    let isSelfPermission = this.reflector.getAllAndOverride(
      'selfPermission',
      [context.getHandler(), context.getClass()]
    )

    isSelfPermission ? isSelfPermission = Object.values(isSelfPermission)[0] : false

    if (!requiredRoles) {
      return true;
    }

    if (isSelfPermission && params.id === user.userId) {
      return true
    }

    if (requiredRoles.some(role => user.userRole?.includes(role))) {
      return true
    }

    throw new HttpException('You do not have permission to this action.', 401);
  }
}

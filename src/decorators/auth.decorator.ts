import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { RoleEnum } from '../enums/role.enum';
import { PermissionEnum } from '../enums/permission.enum';
import { IsActiveGuard } from '../auth/guards/is-active.guard';

export function Auth(roles?: RoleEnum[], permission?: PermissionEnum[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    SetMetadata('permission', permission),
    UseGuards(AuthGuard, IsActiveGuard, PermissionGuard),
  );
}

import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleEnum } from '../enums/role.enum';
import { PermissionEnum } from '../enums/permission.enum';

export function Auth(roles?: RoleEnum[], permission?: PermissionEnum[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    SetMetadata('permission', permission),
    UseGuards(AuthGuard, RolesGuard),
  );
}

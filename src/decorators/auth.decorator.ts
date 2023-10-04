import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/guards/auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { RoleEnum } from "../enums/role.enum";

export function Auth(roles?: RoleEnum[], options?: { selfPermission: boolean }) {
  return applyDecorators(
    SetMetadata('roles', roles),
    SetMetadata('selfPermission', options),
    UseGuards(AuthGuard, RolesGuard),
  );
}
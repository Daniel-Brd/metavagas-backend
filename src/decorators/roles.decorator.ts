import { SetMetadata } from '@nestjs/common';

import { RoleEnum } from '../enums/role.enum';
import { ROLES_KEY } from '../utils/constants';

export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);

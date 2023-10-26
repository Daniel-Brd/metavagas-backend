import { CanActivate } from '@nestjs/common';

export const permissionGuardMock: CanActivate = {
  canActivate: jest.fn(() => true),
};

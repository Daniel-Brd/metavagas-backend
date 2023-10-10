import { CanActivate } from '@nestjs/common';

export const rolesGuardMock: CanActivate = {
  canActivate: jest.fn(() => true),
};

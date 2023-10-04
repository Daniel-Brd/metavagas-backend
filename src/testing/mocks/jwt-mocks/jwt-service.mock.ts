import { JwtService } from '@nestjs/jwt';
import { jwtTokenMock } from './jwt-token.mock';


export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    signAsync: jest.fn().mockResolvedValue(jwtTokenMock),
  },
};

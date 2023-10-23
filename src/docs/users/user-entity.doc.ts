import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../../enums/role.enum';

export class UserEntityDoc {
  @ApiProperty({ type: String, example: 'John Doe' })
  name: string;

  @ApiProperty({ type: String, example: 'JohnDoe@gmail.com' })
  email: string;

  @ApiProperty({
    type: String,
    example:
      '$2b$10$CpD/cvhsoY4m2hMJBcjvPOy/V3YZ3Hhz6K0vPvajZjyKyJjfcNjq6"@123',
  })
  password: string;

  @ApiProperty({ enum: ['advertiser', 'advertiser', 'candidate'] })
  role: RoleEnum;

  @ApiProperty({
    type: String,
    example: '51e32d2a-0275-40ae-a483-b37aa02ca750',
  })
  id: string;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isActive: true;

  @ApiProperty({
    type: String,
    example: '2023-10-20T01:16:54.800Z',
  })
  createdAt: string;

  @ApiProperty({
    type: String,
    example: '2023-10-20T01:16:54.800Z',
  })
  updateAt: string;
}

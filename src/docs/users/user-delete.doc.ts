import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../../enums/role.enum';

export class UserDeleteDoc {
  @ApiProperty({
    type: String,
    example: '51e32d2a-0275-40ae-a483-b37aa02ca750',
  })
  id: string;

  @ApiProperty({ type: String, example: 'John Doe' })
  name: string;

  @ApiProperty({ type: String, example: 'JohnDoe@gmail.com' })
  email: string;

  @ApiProperty({ enum: ['advertiser', 'advertiser', 'candidate'] })
  role: RoleEnum;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  isActive: false;

  @ApiProperty({
    type: String,
    example: '2023-10-21T02:13:10.553Z',
  })
  createdAt: string;

  @ApiProperty({
    type: String,
    example: '2023-10-21T02:13:10.553Z',
  })
  updateAt: string;
}

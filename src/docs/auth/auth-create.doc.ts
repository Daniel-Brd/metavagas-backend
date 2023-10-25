import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDoc {
  @ApiProperty({ type: String, example: 'John Doe' })
  name: string;

  @ApiProperty({ type: String, example: 'JohnDoe@gmail.com' })
  email: string;

  @ApiProperty({ type: String, example: 'password@123' })
  password: string;
}

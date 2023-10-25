import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDoc {
  @ApiProperty({ type: String, example: 'JognDoe.dev@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, example: 'JognDoe@2023' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

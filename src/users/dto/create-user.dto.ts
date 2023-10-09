import { IsString, IsNotEmpty, IsEmail, MaxLength, MinLength, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { RoleEnum } from '../../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String, example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  name: string;

  @ApiProperty({ type: String, example: 'JognDoe.dev@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({ type: String, example: 'JognDoe@2023' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  password: string;

  @ApiProperty({ enum: ['admin', 'advertiser', 'candidate'] })
  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum;

  @ApiProperty({ type: Boolean, example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

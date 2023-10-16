import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
  IsEnum,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { RoleEnum } from '../../enums/role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String, example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  name: string;

  @ApiProperty({ type: String, example: 'JohnDoe@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({ type: String, example: 'password@123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  password: string;

  @ApiPropertyOptional({ enum: ['admin', 'advertiser', 'candidate'] })
  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

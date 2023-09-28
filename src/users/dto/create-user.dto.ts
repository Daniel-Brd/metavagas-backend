import { IsString, IsNotEmpty, IsEmail, MaxLength, MinLength, IsEnum, IsOptional, IsBoolean } from "class-validator";
import { RoleEnum } from "../../enums/role.enum";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  password: string;

  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

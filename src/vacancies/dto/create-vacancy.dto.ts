import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Company } from 'src/database/entities/company.entity';
import { User } from 'src/database/entities/user.entity';

export class CreateVacancyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vacancyRole: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  wage: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vacancyType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vacancyDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  level: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  companyId: Company;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  advertiserId: User;
}

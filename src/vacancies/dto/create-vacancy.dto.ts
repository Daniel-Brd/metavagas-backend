import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Company } from 'src/database/entities/company.entity';
import { User } from 'src/database/entities/user.entity';

export class CreateVacancyDto {
  @IsNotEmpty()
  @IsString()
  vacancyRole: string;

  @IsNotEmpty()
  @IsNumber()
  wage: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  vacancyType: string;

  @IsNotEmpty()
  @IsString()
  vacancyDescription: string;

  @IsNotEmpty()
  @IsString()
  level: string;

  @IsNotEmpty()
  companyName: string;

  advertiserId: User;
}

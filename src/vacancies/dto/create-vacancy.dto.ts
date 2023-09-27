import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVacancyDto {
  @IsNotEmpty()
  @IsString()
  vacancyRole: string;

  @IsNotEmpty()
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
  companyId: number;

  @IsNotEmpty()
  advertiserId: number;
}

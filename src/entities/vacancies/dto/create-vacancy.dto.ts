import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsArray()
  technologies: string[];
}

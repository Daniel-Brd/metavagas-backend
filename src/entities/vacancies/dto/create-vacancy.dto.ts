import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { DEFAULT_MAX_WAGE, DEFAULT_MIN_WAGE } from '../../../utils/constants';

export class CreateVacancyDto {
  @IsNotEmpty()
  @IsString()
  vacancyRole: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(DEFAULT_MIN_WAGE)
  @Max(DEFAULT_MAX_WAGE)
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

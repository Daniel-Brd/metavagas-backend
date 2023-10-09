import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  technologies: string[]
}

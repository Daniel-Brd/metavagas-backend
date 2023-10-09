import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVacancyDto {
  @ApiProperty({ type: String, example: 'Software Developer' })
  @IsNotEmpty()
  @IsString()
  vacancyRole: string;

  @ApiProperty({ type: Number, example: 6000 })
  @IsNotEmpty()
  @IsNumber()
  wage: number;

  @ApiProperty({ type: String, example: 'São Paulo, Brazil' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ type: String, example: 'Full-time' })
  @IsNotEmpty()
  @IsString()
  vacancyType: string;

  @ApiProperty({ type: String, example: 'Seeking a talented software developer to join our team for exciting projects.' })
  @IsNotEmpty()
  @IsString()
  vacancyDescription: string;

  @ApiProperty({ type: String, example: 'Junior' })
  @IsNotEmpty()
  @IsString()
  level: string;

  @ApiProperty({ type: String, example: 'TechSolutions' })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  technologies: string[]
}

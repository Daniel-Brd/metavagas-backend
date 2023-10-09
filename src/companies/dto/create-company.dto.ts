import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ type: String, example: 'TechSolutions Ltd.' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'Contagem' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ type: String, example: 'Minas Gerais' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ type: String, example: 'B Street' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ type: Date, example: '2023-07-18' })
  @IsNotEmpty()
  @IsDateString()
  foundedAt: Date;

  @ApiProperty({type: String,example: 'TechSolutions Ltd. is a technology company based in Contagem, Minas Gerais, founded on October 6, 2023. We are committed to innovation and excellence.' })
  @IsNotEmpty()
  @IsString()
  description: string;
}

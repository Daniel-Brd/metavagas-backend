import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    type: String,
    example: 'TechSoluções LTDA',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Contagem',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    type: String,
    example: 'Minas Gerais',
  })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({
    type: String,
    example: 'Rua B',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  foundedAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description:string;
}
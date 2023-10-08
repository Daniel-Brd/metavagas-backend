import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnologyDto {
  @ApiProperty({ type: String,example: 'TechX' })
  @IsNotEmpty()
  @IsString()
  tecName: string;
  
  @ApiProperty({ type: String, example: 'TechSolutions Ltd.' })
  @IsNotEmpty()
  @IsString()
  creatorsName: string;
}

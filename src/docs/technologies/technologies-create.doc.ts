import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnologiesDoc {
  @ApiProperty({ type: String, example: 'TechX' })
  @IsNotEmpty()
  @IsString()
  techName: string;

  @ApiProperty({ type: String, example: 'TechSolutions Ltd.' })
  @IsNotEmpty()
  @IsString()
  creatorsName: string;
}

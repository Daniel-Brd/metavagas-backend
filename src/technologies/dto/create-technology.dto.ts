import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnologyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tecName: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  creatorsName: string;
}

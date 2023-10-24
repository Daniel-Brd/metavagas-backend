import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnologyDto {
  @IsNotEmpty()
  @IsString()
  techName: string;

  @IsNotEmpty()
  @IsString()
  creatorsName: string;
}

import { IsNotEmpty, IsString } from "class-validator";

export class CreateTechnologyDto {
    
  @IsNotEmpty()
  @IsString()
  tecName: string;

  @IsNotEmpty()
  @IsString()
  creatorsName: string;
}

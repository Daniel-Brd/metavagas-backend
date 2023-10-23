import { ApiProperty } from '@nestjs/swagger';

export class TechnologiesEntityDoc {
  @ApiProperty({ type: String, example: 'TechXss' })
  tecName: string;

  @ApiProperty({ type: String, example: 'TechSolutions Ltd.' })
  creatorsName: string;

  @ApiProperty({
    type: String,
    example: '29aad7b5-9573-478c-acb1-6d7ad42678f4',
  })
  id: string;
}

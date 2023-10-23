import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDoc {
  @ApiProperty({ type: String, example: 'TechSolutions Ltd.' })
  name: string;

  @ApiProperty({ type: String, example: 'Contagem' })
  city: string;

  @ApiProperty({ type: String, example: 'Minas Gerais' })
  state: string;

  @ApiProperty({ type: String, example: 'B Street' })
  address: string;

  @ApiProperty({ type: Date, example: '2023-07-18' })
  foundedAt: Date;

  @ApiProperty({
    type: String,
    example:
      'TechSolutions Ltd. is a technology company based in Contagem, Minas Gerais, founded on October 6, 2023. We are committed to innovation and excellence.',
  })
  description: string;
}

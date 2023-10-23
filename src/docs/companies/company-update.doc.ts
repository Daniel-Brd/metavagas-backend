import { ApiProperty } from '@nestjs/swagger';

export class CompanyUpdateDoc {
  @ApiProperty({
    type: String,
    example: 'bad7f4bb-78f6-4ee2-861a-1d082dbc87ec',
  })
  id: string;

  @ApiProperty({ type: String, example: 'Technology Expert Ltda.' })
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

  @ApiProperty({
    type: String,
    example: '2023-10-20T01:16:54.800Z',
  })
  createdAt: string;

  @ApiProperty({
    type: String,
    example: '2023-10-20T01:16:54.800Z',
  })
  updateAt: string;
}

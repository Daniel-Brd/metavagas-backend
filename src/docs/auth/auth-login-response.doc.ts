import { ApiProperty } from '@nestjs/swagger';

export class UserData {
  @ApiProperty({
    type: String,
    example: '51e32d2a-0275-40ae-a483-b37aa02ca750',
  })
  id: string;
  @ApiProperty({ type: String, example: 'John Doe' })
  name: string;

  @ApiProperty({ type: String, example: 'JohnDoe@gmail.com' })
  email: string;

  @ApiProperty({ type: Boolean, example: true })
  isActive: boolean;
}

export class LoginUserDoc {
  @ApiProperty({ type: UserData })
  data: UserData;

  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MWUzMmQyYS0wMjc1LTQwYWUtYTQ4My1iMzdhYTAyY2E3NTAiLCJ1c2VyTmFtZSI6IkpvaG4gRG9lIiwidXNlclJvbGUiOiJhZG1pbiIsImlzQWN0aXZlIjp0cnVlLCJ1c2VyRW1haWwiOiJKb25oVGVzdEBnbWFpbC5jb20iLCJ2YWNhbmNpZXMiOltdLCJpYXQiOjE2OTc3NTQzNzQsImV4cCI6MTY5Nzc1Nzk3NH0.q_fvuinB32ONGMZ2EyYXNApG_vLvXlJVJTvGLprDlx4',
  })
  token: string;
}

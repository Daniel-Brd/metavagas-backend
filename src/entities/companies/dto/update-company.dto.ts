import { PartialType } from '@nestjs/swagger/dist/type-helpers';
import { CreateCompanyDto } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}

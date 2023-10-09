import { PartialType } from '@nestjs/swagger/dist/type-helpers';
import { CreateVacancyDto } from './create-vacancy.dto';

export class UpdateVacancyDto extends PartialType(CreateVacancyDto) {}

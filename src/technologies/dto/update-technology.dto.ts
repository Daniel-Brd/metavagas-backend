import { PartialType } from '@nestjs/swagger/dist/type-helpers';
import { CreateTechnologyDto } from './create-technology.dto';

export class UpdateTechnologyDto extends PartialType(CreateTechnologyDto) {}

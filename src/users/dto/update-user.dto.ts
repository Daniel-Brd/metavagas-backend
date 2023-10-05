import { PartialType } from '@nestjs/swagger/dist/type-helpers';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType( CreateUserDto) {}

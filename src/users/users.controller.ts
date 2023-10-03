import { Controller, Get, Body, Patch, Param, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../decorators/auth.decorator';
import { RoleEnum } from '../enums/role.enum';
import { CurrentUser } from '../decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @Auth([RoleEnum.admin])
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  @Auth()
  findProfile(@CurrentUser() currentUser: any) {
    return this.usersService.findProfile(currentUser.userId);
  }

  @Get(':id')
  @Auth([RoleEnum.admin])
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @Auth([RoleEnum.admin], { selfPermission: true })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('delete/:id')
  @Auth([RoleEnum.admin], { selfPermission: true })
  softDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.softDelete(id);
  }
}

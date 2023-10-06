import { Controller, Get, Body, Patch, Param, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { RoleEnum } from '../enums/role.enum';
import { CurrentUser } from '../decorators/user.decorator';
import { PermissionEnum } from 'src/enums/permission.enum';

@ApiTags('users')
@ApiBearerAuth('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @Auth([RoleEnum.admin])
  @ApiOperation({ summary: 'List all registered users' })
  @ApiResponse({ status: 200, description: 'Lists of all users' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  @Auth()
  @ApiOperation({ summary: 'Search user profile by ID' })
  @ApiResponse({ status: 200, description: 'User profile found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findProfile(@CurrentUser() currentUser: any) {
    return this.usersService.findProfile(currentUser.userId);
  }

  @Get(':id')
  @Auth([RoleEnum.admin])
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found', })
  @ApiOperation({ summary: 'Search a user by ID' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @Auth([RoleEnum.admin], [PermissionEnum.self])
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/delete')
  @Auth([RoleEnum.admin], [PermissionEnum.self])
  @ApiOperation({ summary: 'Deactivate a user by ID' })
  @ApiResponse({ status: 200, description: 'User successfully deactivated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  softDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.softDelete(id);
  }
}
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../../decorators/auth.decorator';
import { RoleEnum } from '../../enums/role.enum';
import { CurrentUser } from '../../decorators/user.decorator';
import { PermissionEnum } from '../../enums/permission.enum';
import { CreateUserDoc } from '../../docs/auth/auth-create.doc';
import { UserUpdateDoc } from '../../docs/users/user-update.doc';
import { UserDeleteDoc } from '../../docs/users/user-delete.doc';

@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Auth([RoleEnum.admin])
  @ApiOperation({ summary: 'List all registered users' })
  @ApiResponse({
    status: 200,
    description: 'Lists of all users',
    type: CreateUserDoc,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  @Auth()
  @ApiOperation({ summary: 'Search user profile by ID' })
  @ApiResponse({
    status: 200,
    description: 'User profile found',
    type: CreateUserDoc,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findProfile(@CurrentUser() currentUser: any) {
    return this.usersService.findProfile(currentUser.userId);
  }

  @Get(':id')
  @Auth([RoleEnum.admin])
  @ApiOperation({ summary: 'Search a user by ID' })
  @ApiResponse({ status: 200, description: 'User found', type: CreateUserDoc })
  @ApiResponse({ status: 404, description: 'User not found' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findById(id);
  }

  @Patch('delete/:id')
  @Auth([RoleEnum.admin], [PermissionEnum.self])
  @ApiOperation({ summary: 'Deactivate a user by ID' })
  @ApiBody({ type: CreateUserDoc })
  @ApiResponse({
    status: 200,
    description: 'User successfully deactivated',
    type: UserDeleteDoc,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  softDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.softDelete(id);
  }

  @Patch('activate/:id')
  @Auth([RoleEnum.admin], [PermissionEnum.self])
  @ApiOperation({ summary: 'activate an user by ID' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  activeteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.activateUser(id);
  }

  @Patch(':id')
  @Auth([RoleEnum.admin], [PermissionEnum.self])
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiBody({ type: CreateUserDoc })
  @ApiResponse({
    status: 200,
    description: 'User updated',
    type: UserUpdateDoc,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
}

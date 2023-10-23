import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDoc } from '../docs/auth/auth-create.doc';
import { UserEntityDoc } from '../docs/users/user-entity.doc';
import { LoginUserDoc } from '../docs/auth/auth-login-response.doc';
import { LoginAuthDoc } from '../docs/auth/auth-login.doc';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: CreateUserDoc })
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserEntityDoc,
  })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
  async register(@Body() payload: CreateUserDto) {
    return await this.authService.register(payload);
  }

  @Post('login')
  @ApiBody({ type: LoginAuthDoc })
  @ApiOperation({ summary: 'Log in with the username' })
  @ApiResponse({
    status: 201,
    description: 'User logged in successfully',
    type: LoginUserDoc,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }
}

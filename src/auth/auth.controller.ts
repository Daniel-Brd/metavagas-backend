import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
  async register(@Body() payload: CreateUserDto) {
    return await this.authService.register(payload);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in with the username' })
  @ApiResponse({
    status: 201,
    description: 'User logged in successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }
}

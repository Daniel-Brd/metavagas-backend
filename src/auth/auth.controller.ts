import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() payload: CreateUserDto) {
    return await this.authService.register(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }
}

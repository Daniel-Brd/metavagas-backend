import * as bcrypt from 'bcrypt';
import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../entities/users/dto/create-user.dto';
import { UsersService } from '../entities/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(payload: CreateUserDto) {
    try {
      const isEmailAvailable = await this.usersService.findByEmail(
        payload.email,
      );

      if (isEmailAvailable) {
        throw new HttpException('Email is already in use.', 400);
      }

      const newUser = await this.usersService.create(payload);

      return newUser;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }

  async login(payload: LoginDto) {
    try {
      const user = await this.usersService.findByEmail(payload.email);

      if (!user) {
        throw new HttpException('invalid email or password.', 401);
      }

      const { id, name, email, password, role, isActive, vacancies } = user;

      const isPasswordValid = await bcrypt.compare(payload.password, password);

      if (!isPasswordValid) {
        throw new HttpException('invalid email or password.', 401);
      }

      const tokenPayload = {
        userId: id,
        userName: name,
        userRole: role,
        isActive,
        userEmail: email,
        vacancies,
      };

      return {
        data: {
          id,
          name,
          email,
          isActive,
        },
        token: await this.jwtService.signAsync(tokenPayload),
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }
}

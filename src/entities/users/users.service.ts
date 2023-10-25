import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const tempUser = this.usersRepository.create(createUserDto);

      const user = await this.usersRepository.save(tempUser);

      return user;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async findAll() {
    try {
      const userList = await this.usersRepository.find();

      if (!userList) {
        throw new HttpException('Users not found.', 404);
      }

      return userList;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async findById(id: string) {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new HttpException('User not found.', 404);
      }

      return user;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { email },
        select: {
          vacancies: { id: true },
          id: true,
          name: true,
          isActive: true,
          email: true,
          password: true,
          role: true,
        },
        relations: ['vacancies'],
      });

      return user;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async findProfile(id: string) {
    try {
      const profile = await this.usersRepository.findOne({
        where: { id },
        relations: ['vacancies'],
      });

      if (!profile) {
        throw new HttpException('Profile not found.', 404);
      }

      return profile;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.findById(id);

      const tempAffected = this.usersRepository.create(updateUserDto);

      const affected = await this.usersRepository.update(id, tempAffected);

      if (!affected) {
        throw new HttpException('Something went wrong with update.', 400);
      }

      return await this.findById(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async softDelete(id: string) {
    try {
      const user = await this.findById(id);

      if (!user) {
        throw new HttpException('User not found.', 404);
      }

      const affected = await this.usersRepository.update(id, {
        isActive: false,
      });

      if (!affected) {
        throw new HttpException('Something went wrong with delete.', 400);
      }

      return await this.findById(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async activateUser(id: string) {
    try {
      await this.findById(id);

      const affected = await this.usersRepository.update(id, {
        isActive: true,
      });

      if (!affected) {
        throw new HttpException('Something went wrong with activation.', 400);
      }

      return await this.findById(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }
}

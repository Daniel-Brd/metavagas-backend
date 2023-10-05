import { Module } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacanciesController } from './vacancies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from '../database/entities/vacancies.entity';
import { Company } from '../database/entities/company.entity';
import { UsersModule } from '../users/users.module';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy, Company, User]),
    UsersModule
  ],
  controllers: [VacanciesController],
  providers: [VacanciesService],
})
export class VacanciesModule { }

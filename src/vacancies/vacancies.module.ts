import { Module } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacanciesController } from './vacancies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from '../database/entities/vacancies.entity';
import { UsersModule } from '../users/users.module';
import { CompaniesModule } from '../companies/companies.module';
import { TechnologiesModule } from '../technologies/technologies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vacancy]),
    UsersModule,
    CompaniesModule,
    TechnologiesModule,
  ],
  controllers: [VacanciesController],
  providers: [VacanciesService],
})
export class VacanciesModule {}

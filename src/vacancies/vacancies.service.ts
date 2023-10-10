import { HttpException, Injectable } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Vacancy } from '../database/entities/vacancies.entity';
import { In, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryVacancyDTO } from './dto/query-vacancy.dto';
import { UsersService } from '../users/users.service';
import { TechnologiesService } from '../technologies/technologies.service';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class VacanciesService {
  constructor(
    private companiesService: CompaniesService,
    private usersService: UsersService,
    private technologiesService: TechnologiesService,
    @InjectRepository(Vacancy)
    private vacanciesRepository: Repository<Vacancy>,
  ) {}

  async create(payload: CreateVacancyDto, currentUser: any) {
    try {
      const {
        vacancyRole,
        wage,
        location,
        vacancyType,
        vacancyDescription,
        level,
        companyName,
        technologies,
      } = payload;

      const company = await this.companiesService.findByName(companyName);

      const advertiser = await this.usersService.findById(currentUser.userId);

      const technologiesArray = await this.technologiesService.findAll(
        technologies,
      );

      const tempVacancies = this.vacanciesRepository.create({
        vacancyRole,
        wage,
        location,
        vacancyType,
        vacancyDescription,
        level,
        company,
        advertiser,
        technologies: technologiesArray,
      });

      const vacancies = await this.vacanciesRepository.save(tempVacancies);

      return vacancies;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.statusCode || 500,
      );
    }
  }

  async findAll(
    page: number,
    limit: number,
    query?: QueryVacancyDTO,
  ): Promise<Vacancy[]> {
    try {
      const commonOptions = {
        relations: ['company', 'advertiser', 'technologies'],
        skip: (page - 1) * limit,
        take: limit,
      };

      if (query) {
        let technologiesArray = query.technologies;

        if (typeof query.technologies === 'string') {
          technologiesArray = [query.technologies];
        }

        for (let i = 0; i < technologiesArray?.length; i++) {
          await this.technologiesService.findByName(technologiesArray[i]);
        }

        const whereConditions = {};

        for (const key in query) {
          if (query[key]) {
            whereConditions[key] = Like(`%${query[key]}%`);
          }
          if (query.technologies) {
            whereConditions['technologies'] = {
              tecName: In(technologiesArray),
            };
          }
        }

        return this.vacanciesRepository.find({
          ...commonOptions,
          where: whereConditions,
        });
      }

      return this.vacanciesRepository.find(commonOptions);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async findById(id: string) {
    try {
      const vacancy = await this.vacanciesRepository.findOne({
        where: { id },
        relations: ['company', 'advertiser'],
      });

      return {
        id: vacancy.id,
        companyName: vacancy.company.name,
        advertiserName: vacancy.advertiser.name,
      };
    } catch (error) {
      throw new HttpException('Vacancy not found.', 404);
    }
  }

  async update(id: string, updateVacancyDto: UpdateVacancyDto) {
    try {
      const vacancy = await this.vacanciesRepository.findOneBy({ id });
      if (!vacancy) {
        throw new HttpException('Vacancy not found.', 404);
      }

      const technologiesArray = await this.technologiesService.findAll(
        updateVacancyDto.technologies,
      );

      const tempAffected = this.vacanciesRepository.create({
        ...updateVacancyDto,
        technologies: technologiesArray,
      });
      const affected = await this.vacanciesRepository.update(
        { id },
        tempAffected,
      );
      if (!affected) {
        throw new HttpException('Something went wrong with update.', 400);
      }

      return this.vacanciesRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async remove(id: string) {
    try {
      const vacancy = await this.vacanciesRepository.findOneBy({ id });

      if (!vacancy) {
        throw new HttpException('Vacancy not found.', 404);
      }
      await this.vacanciesRepository.delete({ id });

      return { message: 'vacancy successfully deleted', removed: vacancy };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }
}

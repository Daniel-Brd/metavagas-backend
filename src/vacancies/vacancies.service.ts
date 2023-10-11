import { HttpException, Injectable } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Vacancy } from '../database/entities/vacancies.entity';
import { Between, In, Like, Repository } from 'typeorm';
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

      const technologiesArray = await Promise.all(
        technologies.map(async tech => {
          return this.technologiesService.findByName(tech);
        }),
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
        let vacancyTypesArray = query.vacancyTypes;

        if (typeof query.technologies === 'string') {
          technologiesArray = [query.technologies];
        }

        if (typeof query.vacancyTypes === 'string') {
          vacancyTypesArray = [query.vacancyTypes];
        }

        technologiesArray?.forEach(async techName => {
          await this.technologiesService.findByName(techName);
        });

        const whereConditions = {};

        for (const key in query) {
          if (key === 'location' || key === 'role') {
            whereConditions[key] = Like(`%${query[key]}%`);
          }
          if (key === 'technologies') {
            whereConditions['technologies'] = {
              tecName: In(technologiesArray),
            };
          }
          if (key === 'vacancyTypes') {
            whereConditions['vacancyType'] = In(vacancyTypesArray);
          }
          if (key === 'minWage' || key === 'maxWage') {
            whereConditions['wage'] = Between(
              Number(query.minWage),
              Number(query.maxWage),
            );
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
      const vacancy = await this.vacanciesRepository.findOne({
        where: { id },
        relations: ['technologies'],
      });

      if (!vacancy) {
        throw new HttpException('Vacancy not found.', 404);
      }

      let technologiesArray = vacancy.technologies;

      if (updateVacancyDto.technologies) {
        vacancy.technologies = [];

        technologiesArray = await Promise.all(
          updateVacancyDto.technologies?.map(async techName => {
            return this.technologiesService.findByName(techName);
          }),
        );
      }

      const tempAffected = this.vacanciesRepository.merge(vacancy, {
        ...updateVacancyDto,
        technologies: technologiesArray,
      });

      const affected = await this.vacanciesRepository.save(tempAffected);

      if (!affected) {
        throw new HttpException('Something went wrong with update.', 400);
      }

      return this.vacanciesRepository.findOne({
        where: { id },
        relations: ['technologies'],
      });
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

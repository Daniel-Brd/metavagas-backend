import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, ILike, Repository } from 'typeorm';

import * as XLSX from 'xlsx';

import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { QueryVacancyDTO } from './dto/query-vacancy.dto';

import { Vacancy } from '../../database/entities/vacancies.entity';
import { UsersService } from '../users/users.service';
import { TechnologiesService } from '../technologies/technologies.service';
import { CompaniesService } from '../companies/companies.service';
import { DEFAULT_MAX_WAGE, DEFAULT_MIN_WAGE } from '../../utils/constants';

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
        error.status || 500,
      );
    }
  }

  async uploadSpreadsheets(spreadsheet: Express.Multer.File, currentUser: any) {
    try {
      const workbook = XLSX.read(spreadsheet.buffer);

      const result = workbook.SheetNames.map(async sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet) as any[];

        const filterErrors = async (
          vacancyData: any,
          row: any,
        ): Promise<any> => {
          // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-unused-vars
          return new Promise(async (res, _rej) => {
            try {
              const vacancy = await this.create(vacancyData, currentUser);

              res({ vacancy, success: true });
            } catch (error) {
              res({ row, ...error, success: false });
            }
          });
        };

        const createVacancies = async (): Promise<any> => {
          const vacanciesPromises = await Promise.all(
            rows.map(async row => {
              const technologies = row.technologies.split(',');
              const vacancyData = { ...row, technologies };
              return filterErrors(vacancyData, row);
            }),
          );

          const success = vacanciesPromises.filter(vacancy => vacancy.success);
          const failed = vacanciesPromises.filter(vacancy => !vacancy.success);

          return { sheetName, vacancies: { success, failed } };
        };

        return await createVacancies();
      });

      return await Promise.all(result);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async findAll(
    page: number,
    limit: number,
    query?: QueryVacancyDTO,
  ): Promise<any> {
    try {
      const commonOptions = {
        relations: ['company', 'advertiser', 'technologies'],
        skip: (page - 1) * limit,
        take: limit,
      };

      const whereConditions = {};

      for (const key in query) {
        if (key === 'description') {
          whereConditions['vacancyDescription'] = ILike(`%${query[key]}%`);
        }
        if (key === 'location') {
          whereConditions[key] = ILike(`%${query[key]}%`);
        }
        if (key === 'role') {
          whereConditions['vacancyRole'] = ILike(`%${query[key]}%`);
        }
        if (key === 'technologies') {
          let queryTechologies = query.technologies;

          if (typeof query.technologies === 'string') {
            queryTechologies = [query.technologies];
          }

          const technologies = await this.technologiesService.findAll(
            queryTechologies,
          );

          const filteredVacancies = await this.vacanciesRepository.find({
            where: {
              technologies: {
                techName: In(technologies.map(tech => tech.techName)),
              },
            },
          });

          whereConditions['id'] = In(
            filteredVacancies.map(vacancy => vacancy.id),
          );
        }
        if (key === 'vacancyTypes') {
          let queryVacancyTypes = query.vacancyTypes;

          if (typeof query.vacancyTypes === 'string') {
            queryVacancyTypes = [query.vacancyTypes];
          }

          whereConditions['vacancyType'] = In(queryVacancyTypes);
        }

        whereConditions['wage'] = Between(
          query.minWage ? Number(query.minWage) : DEFAULT_MIN_WAGE,
          query.maxWage ? Number(query.maxWage) : DEFAULT_MAX_WAGE,
        );
      }

      const [vacancies, count] = await this.vacanciesRepository.findAndCount({
        ...commonOptions,
        where: whereConditions,
      });

      return { vacancies, count };
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
        ...vacancy,
        company: {
          id: vacancy.company.id,
          name: vacancy.company.name,
        },
        advertiser: {
          name: vacancy.advertiser.name,
        },
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

import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Vacancy } from '../database/entities/vacancies.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../database/entities/company.entity';


@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private VacanciesRepository: Repository<Vacancy>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) { }

  async create(createVacancyDto: CreateVacancyDto, currentUser: any) {
    try {
      const { vacancyRole, wage, location, vacancyType, vacancyDescription, level, companyName } = createVacancyDto

      const company = await this.companyRepository.findOneBy({
        name: companyName
      })

      if (!company) {
        throw new HttpException('Company not found.', 404);
      }
      const tempVacancies = this.VacanciesRepository.create({
        vacancyRole,
        wage,
        location,
        vacancyType,
        vacancyDescription,
        level,
        company: company,
        advertiser: currentUser
      })

      const vacancies = await this.VacanciesRepository.save(tempVacancies);
      return vacancies;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.statusCode || 500,
      );
    }
  }

  async findAll() {
    try {
      const vacanciesList = await this.VacanciesRepository.find({ relations: ['company'] });
      return vacanciesList;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async findById(id: string) {
    try {
      const vacancy = await this.VacanciesRepository.findOne({ where: { id }, relations: ['companyId', 'advertiserId'] });

      const result = { id: vacancy.id, companyName: vacancy.company.name, advertiserName: vacancy.advertiser.name }
      return result;
    } catch (error) {
      throw new HttpException('Vacancy not found.', 404);

    }
  }

  async update(id: string, updateVacancyDto: UpdateVacancyDto) {
    try {
      const vacancy = await this.findById(id);
      if (!vacancy) {
        throw new HttpException('Vacancy not found.', 404);
      }
      const tempAffected = this.VacanciesRepository.create(updateVacancyDto);
      const affected = await this.VacanciesRepository.update(
        { id },
        tempAffected,
      );
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

  async remove(id: string) {
    try {
      const vacancy = await this.findById(id);

      if (!vacancy) {
        throw new HttpException('Vacancy not found.', 404);
      }
      const removed = await this.VacanciesRepository.delete({ id });
      return { message: 'vacancy successfully deleted', removed: vacancy };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }
}
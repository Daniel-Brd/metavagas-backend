import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Vacancy } from '../database/entities/vacancies.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../database/entities/company.entity';
import { User } from 'src/database/entities/user.entity';


@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private vacanciesRepository: Repository<Vacancy>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
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

      const user = await this.usersRepository.findOneBy({ id: currentUser.userId })

      const tempVacancies = this.vacanciesRepository.create({
        vacancyRole,
        wage,
        location,
        vacancyType,
        vacancyDescription,
        level,
        company: company,
        advertiser: user
      })

      const vacancies = await this.vacanciesRepository.save(tempVacancies);

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
      const vacanciesList = await this.vacanciesRepository.find({ relations: ['company'] });
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
      const vacancy = await this.vacanciesRepository.findOne({ where: { id }, relations: ['company', 'advertiser'] });

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
      const tempAffected = this.vacanciesRepository.create(updateVacancyDto);
      const affected = await this.vacanciesRepository.update(
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
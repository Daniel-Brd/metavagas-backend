import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Vacancy } from '../database/entities/vacancies.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../database/entities/company.entity';
import { User } from '../database/entities/user.entity';
import { Technology } from '../database/entities/technology.entity';


@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private vacanciesRepository: Repository<Vacancy>,
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Technology)
    private technologiesRepository: Repository<Technology>
  ) { }

  async create(createVacancyDto: CreateVacancyDto, currentUser: any) {
    try {
      const { vacancyRole, wage, location, vacancyType, vacancyDescription, level, companyName, technologies } = createVacancyDto

      const company = await this.companiesRepository.findOneBy({
        name: companyName
      });

      if (!company) {
        throw new HttpException('Company not found.', 404);
      }

      const user = await this.usersRepository.findOneBy({
        id: currentUser.userId,
      });

      const technologiesArray = await this.technologiesRepository.find({
        where: { tecName: In(technologies) }
      })

      const tempVacancies = this.vacanciesRepository.create({
        vacancyRole,
        wage,
        location,
        vacancyType,
        vacancyDescription,
        level,
        company: company,
        advertiser: user,
        technologies: technologiesArray
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

  async findAll() {
    try {
      const vacanciesList = await this.vacanciesRepository.find({
        relations: ['company', 'advertiser', 'technologies'],
      });
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


      const technologiesArray = await this.technologiesRepository.find({
        where: { tecName: In(updateVacancyDto.technologies) }
      })


      const tempAffected = this.vacanciesRepository.create({ ...updateVacancyDto, technologies: technologiesArray });
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

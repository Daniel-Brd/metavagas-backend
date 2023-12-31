import { HttpException, Injectable } from '@nestjs/common';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Technology } from '../../database/entities/technology.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectRepository(Technology)
    private technologiesRepository: Repository<Technology>,
  ) {}

  async create(createTechnologyDto: CreateTechnologyDto) {
    try {
      const tempTechnology =
        this.technologiesRepository.create(createTechnologyDto);
      const technologies = await this.technologiesRepository.save(
        tempTechnology,
      );

      return technologies;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }

  async findAll(tempTechNames?: string[]) {
    try {
      let techNames = tempTechNames;

      if (typeof tempTechNames === 'string') {
        techNames = [tempTechNames];
      }

      if (!techNames) {
        return this.technologiesRepository.find();
      } else {
        const technologies = await Promise.all(
          techNames.map(techName => this.findByName(techName)),
        );
        return technologies;
      }
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }

  async findByName(techName: string) {
    try {
      const technology = await this.technologiesRepository.findOne({
        where: { techName: ILike(`%${techName}%`) },
      });

      if (!technology) {
        throw new HttpException(`technology '${techName}' was not found`, 404);
      }

      return technology;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }

  async findById(id: string): Promise<Technology> {
    try {
      const technology = await this.technologiesRepository.findOneBy({ id });
      if (!technology) {
        throw new HttpException('Technology not found', 404);
      }
      return technology;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }

  async update(id: string, updateTechnologyDto: UpdateTechnologyDto) {
    const Technology = await this.findById(id);

    if (!Technology) {
      throw new HttpException('Technology not found', 404);
    }
    const tempAffected =
      this.technologiesRepository.create(updateTechnologyDto);
    const affected = await this.technologiesRepository.update(
      { id },
      tempAffected,
    );
    if (!affected) {
      throw new HttpException('Something went wrong with update.', 400);
    }
    return await this.findById(id);
  }

  async remove(id: string) {
    try {
      const technology = await this.findById(id);

      if (!technology) {
        throw new HttpException('Technology not found', 404);
      }

      await this.technologiesRepository.delete({ id });

      return {
        message: 'technology successfully deleted',
        removed: technology,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }
}

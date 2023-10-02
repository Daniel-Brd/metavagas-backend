import { HttpException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/database/entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>
  ){}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const newCompany = this.companyRepository.create(createCompanyDto)
      await this.companyRepository.save(newCompany);

      return newCompany;

    } catch (error: any) {
      
      throw new HttpException(error.message || 'Internal server error', error.status || 500)
    }
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findById(id: string): Promise<Company>{

    try {
      const company = await this.companyRepository.findOne({
        where: { id: id },
        relations: ['vacancies']
    });
  
      if (!company) {
        throw new HttpException('Company not found', 404)
      }
  
      return company;
    } catch (error: any) {

      throw new HttpException(error.message || 'Internal server error', error.status || 500)
    }
}

   async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const existingCompany = await this.findById(id);

    if (!existingCompany) {
      throw new HttpException('Company not found', 404);
    }
    const updatedCompany = this.companyRepository.merge(existingCompany, updateCompanyDto);

    const savedCompany = await this.companyRepository.save(updatedCompany);

    return savedCompany;

}

}
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from '../../database/entities/company.entity';
import { QueryCompanyDTO } from './dto/query-company.dto';
import { CreateCompanyDoc } from '../../docs/companies/company-create.doc';
import { CompanyEntityDoc } from '../../docs/companies/company-entity.doc';
import { CompanyUpdateDoc } from '../../docs/companies/company-update.doc';
import { Auth } from '../../decorators/auth.decorator';
import { RoleEnum } from '../../enums/role.enum';

@ApiTags('companies')
@ApiBearerAuth('JWT-auth')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @Auth([RoleEnum.admin])
  @ApiOperation({ summary: 'Create a new company' })
  @ApiBody({ type: CreateCompanyDoc })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new company',
    type: CompanyEntityDoc,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @Auth()
  @ApiOperation({ summary: 'List all registered companies' })
  @ApiResponse({
    status: 200,
    description: 'List of all registered companies',
    isArray: true,
    type: CreateCompanyDoc,
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll(@Query() query?: QueryCompanyDTO): Promise<Company[]> {
    return await this.companiesService.findAll(query);
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Search for a company by ID' })
  @ApiResponse({
    status: 200,
    description: 'Company found',
    type: CreateCompanyDoc,
  })
  @ApiResponse({ status: 404, description: 'Company not found' })
  findOne(@Param('id') id: string) {
    return this.companiesService.findById(id);
  }

  @Patch(':id')
  @Auth([RoleEnum.admin])
  @ApiOperation({ summary: 'Update a company by ID' })
  @ApiBody({ type: CreateCompanyDoc })
  @ApiResponse({
    status: 200,
    description: 'Company updated successfully',
    type: CompanyUpdateDoc,
  })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @Auth([RoleEnum.admin])
  @ApiOperation({ summary: 'Deletes a company by an ID' })
  @ApiResponse({ status: 200, description: 'Successfully deleted company' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}

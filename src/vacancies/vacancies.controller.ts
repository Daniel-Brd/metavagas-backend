import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { CurrentUser } from '../decorators/user.decorator';
import { Auth } from '../decorators/auth.decorator';
import { UsersService } from '../users/users.service';
import { RoleEnum } from '../enums/role.enum';
import { PermissionEnum } from 'src/enums/permission.enum';

@ApiTags('vacancies')
@ApiBearerAuth('JWT-auth')
@Controller('vacancies')
export class VacanciesController {
  constructor(
    private readonly vacanciesService: VacanciesService,
    private readonly usersService: UsersService
  ) { }

  @Post()
  @Auth([RoleEnum.advertiser])
  @ApiOperation({ summary: 'Create a new vacancy as an advertiser' })
  @ApiResponse({ status: 201, description: 'Vacancy created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request ' })
  @ApiResponse({ status: 401, description: 'Unauthorized ' })
  create(@Body() createVacancyDto: CreateVacancyDto, @CurrentUser() currentUser: any) {
    return this.vacanciesService.create(createVacancyDto, currentUser);
  }

  @Get()
  @ApiOperation({ summary: 'Search all registered vacancies' })
  @ApiResponse({ status: 200, description: 'List of all vacancies' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll() {
    return this.vacanciesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search for a vacancy by an ID' })
  @ApiResponse({ status: 200, description: 'Vacancy found' })
  @ApiResponse({ status: 404, description: 'Vacancy not found' })
  findById(@Param('id') id: string) {
    return this.vacanciesService.findById(id);
  }

  @Auth([RoleEnum.advertiser])
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized ' })
  findProfile(@CurrentUser() CurrentUser: any) {
    return this.usersService.findProfile(CurrentUser.userId)
  }

  @Patch(':id')
  @Auth([RoleEnum.admin], [PermissionEnum.owner])
  @ApiOperation({ summary: 'Update a vacancy by an ID' })
  @ApiResponse({ status: 200, description: 'Vacancy updated successfully' })
  @ApiResponse({ status: 404, description: 'Vacancy not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  update(@Param('id') id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacanciesService.update(id, updateVacancyDto);
  }

  @Delete(':id')
  @Auth([RoleEnum.admin], [PermissionEnum.owner])
  @ApiOperation({ summary: 'Deletes a vacancy by an ID' })
  @ApiResponse({ status: 200, description: 'Vacancy deleted successfully' })
  @ApiResponse({ status: 404, description: 'Vacancy not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  remove(@Param('id') id: string) {
    return this.vacanciesService.remove(id);
  }
}
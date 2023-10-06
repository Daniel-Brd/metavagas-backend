import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { CurrentUser } from '../decorators/user.decorator';
import { Auth } from '../decorators/auth.decorator';
import { UsersService } from '../users/users.service';
import { RoleEnum } from '../enums/role.enum';
import { PermissionEnum } from 'src/enums/permission.enum';

@ApiTags('vacancies')
@Controller('vacancies')
export class VacanciesController {
  constructor(
    private readonly vacanciesService: VacanciesService,
    private readonly usersService: UsersService
  ) { }

  @Post()
  @Auth([RoleEnum.advertiser])
  @ApiOperation({ summary: 'Create a new vacancy as an advertiser' })
  create(@Body() createVacancyDto: CreateVacancyDto, @CurrentUser() currentUser: any) {
    return this.vacanciesService.create(createVacancyDto, currentUser);
  }

  @Get()
  @ApiOperation({ summary: 'Search all registered vacancies' })
  findAll() {
    return this.vacanciesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search for a vacancy by an ID' })
  findById(@Param('id') id: string) {
    return this.vacanciesService.findById(id);
  }

  @Auth([RoleEnum.advertiser])
  findProfile(@CurrentUser() CurrentUser: any) {
    return this.usersService.findProfile(CurrentUser.userId)
  }

  @Patch(':id')
  @Auth([RoleEnum.admin], [PermissionEnum.owner])
  @ApiOperation({ summary: 'Update a vacancy by an ID' })
  update(@Param('id') id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacanciesService.update(id, updateVacancyDto);
  }

  @Delete(':id')
  @Auth([RoleEnum.admin], [PermissionEnum.owner])
  @ApiOperation({ summary: 'Deletes a vacancy by an ID' })
  remove(@Param('id') id: string) {
    return this.vacanciesService.remove(id);
  }
}
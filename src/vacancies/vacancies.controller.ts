import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { CurrentUser } from '../decorators/user.decorator';
import { Auth } from '../decorators/auth.decorator';
import { UsersService } from '../users/users.service';
import { RoleEnum } from '../enums/role.enum';

@Controller('vacancies')
export class VacanciesController {
  constructor(
    private readonly vacanciesService: VacanciesService,
    private readonly usersService: UsersService
  ) { }

  @Auth([RoleEnum.advertiser])
  @Post()
  create(@Body() createVacancyDto: CreateVacancyDto, @CurrentUser() currentUser: any) {
    return this.vacanciesService.create(createVacancyDto, currentUser);
  }

  @Get()
  findAll() {
    return this.vacanciesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.vacanciesService.findById(id);
  }

  @Auth()
  findProfile(@CurrentUser() CurrentUser: any) {
    return this.usersService.findProfile(CurrentUser.userId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacanciesService.update(id, updateVacancyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacanciesService.remove(id);
  }
}
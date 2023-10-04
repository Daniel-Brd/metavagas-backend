import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('vacancies')
@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}


  @Post()
  @ApiOperation({ summary: 'Create a new vacancy as an advertiser'})
  create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacanciesService.create(createVacancyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Search all registered vacancies'})
  findAll() {
    return this.vacanciesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search for a vacancy by an ID'})
  findById(@Param('id') id: string) {
    return this.vacanciesService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a vacancy by an ID'})
  update(@Param('id') id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacanciesService.update(id, updateVacancyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a vacancy by an ID'})
  remove(@Param('id') id: string) {
    return this.vacanciesService.remove(id);
  }
}


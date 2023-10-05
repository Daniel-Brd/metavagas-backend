import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import {  ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('technologies')
@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new technology as an admin'})
  create(@Body() createTechnologyDto: CreateTechnologyDto) {
    return this.technologiesService.create(createTechnologyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Search all registered technologies'})
  findAll() {
    return this.technologiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search for a technology by an ID'})
  findOne(@Param('id') id: string) {
    return this.technologiesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a technology by an ID'})
  update(@Param('id') id: string, @Body() updateTechnologyDto: UpdateTechnologyDto) {
    return this.technologiesService.update(+id, updateTechnologyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a technology by an ID'})
  remove(@Param('id') id: string) {
    return this.technologiesService.remove(+id);
  }
}

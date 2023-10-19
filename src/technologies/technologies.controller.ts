import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { RoleEnum } from '../enums/role.enum';

@ApiTags('technologies')
@ApiBearerAuth('JWT-auth')
@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Post()
  @Auth([RoleEnum.admin])
  @ApiOperation({ summary: 'Create a new technology as an admin' })
  @ApiResponse({ status: 201, description: 'Technology created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createTechnologyDto: CreateTechnologyDto) {
    return this.technologiesService.create(createTechnologyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Search all registered technologies' })
  @ApiResponse({ status: 200, description: 'Lists of all technologies' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll(@Query('techName') techNames?: string[]) {
    return this.technologiesService.findAll(techNames);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search for a technology by an ID' })
  @ApiResponse({ status: 200, description: 'Technology found' })
  @ApiResponse({ status: 404, description: 'Technology not found' })
  findOne(@Param('id') id: string) {
    return this.technologiesService.findById(id);
  }

  @Patch(':id')
  @Auth([RoleEnum.admin])
  @ApiOperation({ summary: 'Update a technology by an ID' })
  @ApiResponse({ status: 200, description: 'Technology updated' })
  @ApiResponse({ status: 404, description: 'Technology not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  update(
    @Param('id') id: string,
    @Body() updateTechnologyDto: UpdateTechnologyDto,
  ) {
    return this.technologiesService.update(id, updateTechnologyDto);
  }

  @Delete(':id')
  @Auth([RoleEnum.admin])
  @ApiOperation({ summary: 'Deletes a technology by an ID' })
  @ApiResponse({ status: 200, description: 'Successfully deleted technology' })
  @ApiResponse({ status: 404, description: 'Technology not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  remove(@Param('id') id: string) {
    return this.technologiesService.remove(id);
  }
}

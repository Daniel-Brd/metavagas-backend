import { Module } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { TechnologiesController } from './technologies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technology } from 'src/database/entities/technology.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Technology])],
  controllers: [TechnologiesController],
  providers: [TechnologiesService],
})
export class TechnologiesModule {}

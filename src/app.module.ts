import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TechnologiesModule } from './technologies/technologies.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, CompaniesModule, TechnologiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
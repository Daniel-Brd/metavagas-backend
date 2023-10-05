import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Documentation Metavagas')
    .setDescription('This documentation is about metavagas app.')
    .setVersion('1.0')
    .addTag('users')
    .addTag('companies')
    .addTag('technologies')
    .addTag('vacancies')
    .setContact(
      'API Diagram ',
      'https://drive.google.com/file/d/1Nk7m-U-1q4g2fZOHsmoUFRJbxC375ZMm/view',
      '',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT Token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/docs', app, document);

  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(+configService.get('APP_PORT'));
}
bootstrap();

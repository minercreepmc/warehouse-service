import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerOption } from '@driver-adapters/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerOption);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(new ValidationPipe({
forbidUnknownValues: false
  }));

  await app.listen(3000);
}
bootstrap();

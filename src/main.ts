import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerOption } from '@configs';
import { RmqService } from '@configs/rmq';
import { typeormDataSource } from '@configs/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerOption);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  );

  await typeormDataSource.initialize();

  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions());

  app.enableCors();

  await app.listen(3000);
  await app.startAllMicroservices();
}
bootstrap();

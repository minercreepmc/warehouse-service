import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerOption } from '@driver-adapters/config';
import { RmqService } from '@driven-adapters/configs/rmq';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerOption);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  );

  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions());

  await app.listen(3000);
  await app.startAllMicroservices();
}
bootstrap();

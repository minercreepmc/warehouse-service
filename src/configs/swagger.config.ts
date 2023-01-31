import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOption = new DocumentBuilder()
  .setTitle('Warehouse API')
  .setDescription('Interact and manipulate your warehouse')
  .setVersion('0.1')
  .build();

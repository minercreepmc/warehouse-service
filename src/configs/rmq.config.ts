import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { ClientModuleConfig } from './client';

const configService = new ConfigService();

export const rmqConfig: ClientModuleConfig = {
  user: configService.get('RABBITMQ_USER'),
  password: configService.get('RABBITMQ_PASSWORD'),
  host: configService.get('RABBITMQ_HOST'),
  queueName: configService.get('RABBITMQ_QUEUE_NAME'),
  domain: 'amqp',
  transport: Transport.RMQ,
};

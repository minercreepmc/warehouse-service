import { ConfigService } from '@nestjs/config';
import { ProductEventModel } from '@product-database/event-store';
import {
  AddProduct1673658469968,
  RemoveUnitFromProductInfo1673851035116,
  CreateOutbox1675417271897,
  ChangeOutboxPayload1675418315495,
} from '@product-database/migrations';
import { ProductInfoOrmModel } from '@product-database/repositories/product-info';
import { DataSource, DataSourceOptions } from 'typeorm';

const configService = new ConfigService();
export const typeOrmDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [ProductEventModel, ProductInfoOrmModel],
  migrations: [
    AddProduct1673658469968,
    RemoveUnitFromProductInfo1673851035116,
    CreateOutbox1675417271897,
    ChangeOutboxPayload1675418315495,
  ],
  //synchronize: true,
};
export const typeormDataSource = new DataSource(typeOrmDataSourceOptions);

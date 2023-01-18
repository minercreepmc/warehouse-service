import {
  AddProduct1673658469968,
  RemoveUnitFromProductInfo1673851035116,
} from '@driven-adapters/database/migrations';
import {
  ProductEventModel,
  ProductInfoOrmModel,
} from '@driven-adapters/database/models';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const configService = new ConfigService();
const typeormDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [ProductEventModel, ProductInfoOrmModel],
  migrations: [AddProduct1673658469968, RemoveUnitFromProductInfo1673851035116],
  //synchronize: true,
});

export default typeormDataSource;

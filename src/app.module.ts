import { RmqModule } from '@driven-adapters/configs/rmq';
import { typeormConfig } from '@driven-adapters/configs/typeorm';
import { productRmqDiToken } from '@gateway/driven-ports/product';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainModule } from './domain';
import { ViewsModule } from './views';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RmqModule.register({ name: productRmqDiToken }),
    TypeOrmModule.forRoot(typeormConfig),
    DomainModule,
    ViewsModule,
  ],
})
export class AppModule {}

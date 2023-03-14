import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RmqModule } from '@configs/rmq';
import { ProductEventModel } from '@product-database/event-store';
import { productMessageBrokerDiToken } from '@product-gateway/driven-ports';
import { CreateProductUseCaseModule } from '@product-use-case/create-product';
import { ImportProductUseCaseModule } from '@product-use-case/import-products';
import { ExportProductsUseCaseModule } from '@product-use-case/export-products';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ProductEventModel]),
    RmqModule.register({ name: productMessageBrokerDiToken }),
    CreateProductUseCaseModule,
    ImportProductUseCaseModule,
    ExportProductsUseCaseModule,
  ],
})
export class DomainModule {}

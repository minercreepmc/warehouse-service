import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RmqModule } from '@product-configs/rmq';
import { ProductEventModel } from '@product-database/event-store';
import { productMessageBrokerDiToken } from '@product-gateway/driven-ports';
import { AddProductThumbnailsUseCaseModule } from '@product-use-case/add-product-thumbnails/add-product-thumbnails.use-case.module';
import { CreateProductUseCaseModule } from '@product-use-case/create-product';
import { ImportProductUseCaseModule } from '@product-use-case/import-products';
import { ShipProductsUseCaseModule } from '@product-use-case/ship-products';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ProductEventModel]),
    RmqModule.register({ name: productMessageBrokerDiToken }),
    CreateProductUseCaseModule,
    ImportProductUseCaseModule,
    ShipProductsUseCaseModule,
    AddProductThumbnailsUseCaseModule,
  ],
})
export class DomainModule {}

import { ProductCreatedDomainEvent } from '@domain-events/product';
import { ProductCreatedDomainEventMessageDto } from '@gateway/channel';
import {
  productInfoRepositoryDiToken,
  ProductInfoRepositoryPort,
} from '@gateway/driven-ports/product';
import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProductInfoReadModel } from '../read-models';

@Controller()
export class ProductInfoProjector {
  constructor(
    @Inject(productInfoRepositoryDiToken)
    private readonly repository: ProductInfoRepositoryPort,
  ) {}

  @EventPattern(ProductCreatedDomainEvent.name)
  async create(@Payload() data: ProductCreatedDomainEventMessageDto) {
    const readModel = new ProductInfoReadModel({
      productId: data.productId,
      name: data.name,
      quantity: 0,
    });

    await this.repository.save(readModel);
  }
}

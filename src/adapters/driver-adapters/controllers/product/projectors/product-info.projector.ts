import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  ProductCreatedDomainEventMessageDto,
  ProductEvent,
  ProductImportedDomainEventMessageDto,
} from '@views/products/gateway/channel';
import {
  ProductInfoReadModel,
  productInfoRepositoryDiToken,
  ProductInfoRepositoryPort,
} from '@views/products/product-info';

@Controller()
export class ProductInfoProjector {
  constructor(
    @Inject(productInfoRepositoryDiToken)
    private readonly repository: ProductInfoRepositoryPort,
  ) {}

  @EventPattern(ProductEvent.productCreated)
  async create(@Payload() data: ProductCreatedDomainEventMessageDto) {
    const readModel = new ProductInfoReadModel({
      id: data.productId,
      name: data.name,
      quantity: 0,
    });

    await this.repository.save(readModel);
  }

  @EventPattern(ProductEvent.productImported)
  async update(@Payload() data: ProductImportedDomainEventMessageDto) {
    const productInfo = await this.repository.findOneById(data.productId);
    productInfo.quantity += data.quantity;

    await this.repository.update(data.productId, productInfo);
    // Add unit calculating
  }
}

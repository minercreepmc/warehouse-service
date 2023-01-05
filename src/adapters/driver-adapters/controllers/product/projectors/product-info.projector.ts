import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import {
  ProductCreatedDomainEventMessageDto,
  ProductEvent,
  ProductsImportedDomainEventMessageDto,
} from '@views/products/gateway/channel';
import { ProductInfoService } from '@views/products/product-info';

@Controller()
export class ProductInfoProjector {
  constructor(private readonly service: ProductInfoService) {}

  @EventPattern(ProductEvent.productCreated)
  async create(
    @Payload() data: ProductCreatedDomainEventMessageDto,
    @Ctx() context: RmqContext,
  ) {
    try {
      await this.service.create(data);
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);
    } catch (err) {
      throw err;
    }
  }

  @EventPattern(ProductEvent.productsImported)
  async update(
    @Payload() data: ProductsImportedDomainEventMessageDto,
    @Ctx() context: RmqContext,
  ) {
    try {
      await this.service.update(data);
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);
    } catch (err) {
      throw err;
    }
  }
}

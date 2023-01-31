import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import {
  ProductCreatedDomainEventMessageDto,
  ProductEvent,
  ProductsImportedDomainEventMessageDto,
  ProductsShippedDomainEventMessageDto,
} from '@product-views/gateway/channel';
import { ProductInfoService } from './product-info.service';

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
  async import(
    @Payload() data: ProductsImportedDomainEventMessageDto,
    @Ctx() context: RmqContext,
  ) {
    try {
      await this.service.addQuantity(data);
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);
    } catch (err) {
      throw err;
    }
  }

  @EventPattern(ProductEvent.productsShipped)
  async ship(
    @Payload() data: ProductsShippedDomainEventMessageDto,
    @Ctx() context: RmqContext,
  ) {
    try {
      await this.service.removeQuantity(data);
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);
    } catch (err) {
      throw err;
    }
  }
}

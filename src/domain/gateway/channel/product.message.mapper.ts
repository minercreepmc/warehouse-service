import { ProductDomainEvent } from '@domain-events/product';
import { MessageMapper } from 'common-base-classes';
import { ProductDomainEventMessageDto } from './product.message';

export class ProductMessageMapper
  implements MessageMapper<ProductDomainEvent, ProductDomainEventMessageDto>
{
  toMessage(event: ProductDomainEvent): ProductDomainEventMessageDto {
    const message: ProductDomainEventMessageDto = {
      productId: event.aggregateId.unpack(),
    };

    if (event.details.name) {
      message.name = event.details.name.unpack();
    }

    if (event.details.quantity) {
      message.quantity = event.details.quantity.unpack();
    }

    if (event.details.unit) {
      message.unit = event.details.unit.unpack();
    }

    return message;
  }
}
import { ProductDomainEvent } from '@product-domain-events';
import { MessageMapper } from 'common-base-classes';
import { ProductDomainEventMessageDto } from './product.message';

export class ProductMessageMapper
  implements MessageMapper<ProductDomainEvent, ProductDomainEventMessageDto>
{
  toMessage(event: ProductDomainEvent): ProductDomainEventMessageDto {
    const message: ProductDomainEventMessageDto = {
      productId: event.entityId.unpack(),
      eventName: event.eventName,
    };

    if (event.details.name) {
      message.name = event.details.name.unpack();
    }

    if (event.details.quantity) {
      message.quantity = event.details.quantity.unpack();
    }

    if (event.details.postponed) {
      message.postponed = event.details.postponed.unpack();
    }

    if (event.details.isPostponed) {
      message.isPostponed = event.details.isPostponed;
    }

    return message;
  }
}

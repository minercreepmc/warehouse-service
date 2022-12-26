import { DomainEvent } from 'common-base-classes';
import {
  ProductDomainEventDetails,
  ProductDomainEventProps,
} from './product.domain-event.interface';

export class ProductDomainEvent extends DomainEvent<ProductDomainEventDetails> {
  readonly details: ProductDomainEventDetails;
  // private readonly productEventDocuments = {
  //   [ProductCreatedDomainEvent.name]: ProductCreatedDomainEvent,
  //   [ProductImportedDomainEvent.name]: ProductImportedDomainEvent,
  //   [ProductShippedDomainEvent.name]: ProductShippedDomainEvent,
  // };
  constructor(props: ProductDomainEventProps) {
    super(props);
  }

  // getEventClass(event: ProductDomainEventInterfaces.eventEnum) {
  //   return this.productEventDocuments[event];
  // }
}

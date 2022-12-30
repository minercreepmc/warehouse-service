import type {
  ProductNameValueObject,
  ProductQuantityValueObject,
  ProductUnitValueObject,
} from '@value-objects/product';
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

  // get name(): ProductNameValueObject | undefined {
  //   return this.details.name;
  // }
  //
  // get quantity(): ProductQuantityValueObject | undefined {
  //   return this.details.quantity;
  // }
  //
  // get unit(): ProductUnitValueObject | undefined {
  //   return this.details.unit;
  // }

  // getEventClass(event: ProductDomainEventInterfaces.eventEnum) {
  //   return this.productEventDocuments[event];
  // }
}

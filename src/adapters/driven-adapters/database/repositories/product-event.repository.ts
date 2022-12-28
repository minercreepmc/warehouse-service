import { EventStoreTypeOrm } from 'common-base-classes';
import {
  ProductDomainEvent,
  ProductDomainEventDetails,
} from '@domain-events/product';
import {
  ProductEventModel,
  ProductEventModelDetails,
  productEventRelation,
} from '../models';
import { Repository } from 'typeorm';
import { ProductEventTypeOrmMapper } from '../mappers';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEventStorePort } from '@driven-ports/product/product.repository.port';
import {
  ProductAggregate,
  productAggregateApplyEventMethodNamesDocuments,
} from '@aggregates/product';
import { ProductNameValueObject } from '@value-objects/product';
import { ProductEventsRebuilded } from './product-event.interface';

@Injectable()
export class ProductEventStore
  extends EventStoreTypeOrm<
    ProductDomainEvent,
    ProductDomainEventDetails,
    ProductEventModel,
    ProductEventModelDetails
  >
  implements ProductEventStorePort
{
  constructor(
    @InjectRepository(ProductEventModel)
    typeOrmRepository: Repository<ProductEventModel>,
  ) {
    super(
      typeOrmRepository,
      new ProductEventTypeOrmMapper(ProductEventModel),
      new Logger(ProductEventStore.name),
    );
  }

  protected relations = [productEventRelation];
  protected static aggregate: ProductAggregate;

  async isProductExist(productName: ProductNameValueObject): Promise<boolean> {
    const products = await this.rebuildProducts();
    return Boolean(products[productName.unpack()]);
  }

  async getProduct(
    productName: ProductNameValueObject,
  ): Promise<ProductAggregate> {
    const products = await this.rebuildProducts();
    return products[productName.unpack()];
  }

  async rebuildProducts(): Promise<ProductEventsRebuilded> {
    return this.rebuild();
  }

  async rebuild() {
    const domainEvents = await this.getAllEvents();
    const products = domainEvents.reduce((products, event) => {
      const product =
        products[event.details.name.unpack()] ||
        new ProductAggregate(event.aggregateId);
      const applyMethod =
        productAggregateApplyEventMethodNamesDocuments[event.eventName];
      product.state[applyMethod](event);
      products[product.name.unpack()] = product;
      return products;
    }, {});
    return products;
  }
}

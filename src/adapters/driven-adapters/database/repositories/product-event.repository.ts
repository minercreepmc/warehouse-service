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
    return products.some((product) => product.name.equals(productName));
  }

  async rebuildProducts(): Promise<ProductAggregate[]> {
    return this.rebuild();
  }

  async rebuild(): Promise<ProductAggregate[]> {
    const domainEvents = await this.getAllEvents();
    const products = domainEvents.map((event) => {
      const product = new ProductAggregate();

      const applyMethod =
        productAggregateApplyEventMethodNamesDocuments[event.eventName];

      product.state[applyMethod](event);
      return product;
    });
    return products;
  }
}

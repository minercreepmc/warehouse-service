import { EventStoreTypeOrm, ID, UUID } from 'common-base-classes';
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
import {
  ProductAggregate,
  productAggregateApplyEventMethodNamesDocuments,
} from '@aggregates/product';
import { ProductNameValueObject } from '@value-objects/product';
import { ProductEventStorePort } from '@gateway/driven-ports/product';

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

  // async getProduct(
  //   productName: ProductNameValueObject,
  // ): Promise<ProductAggregate> {
  //   const products = await this.rebuildProducts();
  //   return products[productName.unpack()];
  // }
  //
  // async rebuildProducts(): Promise<ProductEventsRebuilded> {
  //   return this.rebuild();
  // }
  //
  // async rebuild() {
  //   const domainEvents = await this.getAllEvents();
  //   const products = domainEvents.reduce((products, event) => {
  //     const product =
  //       products[event.details.name.unpack()] ||
  //       new ProductAggregate(event.aggregateId);
  //     const applyMethod =
  //       productAggregateApplyEventMethodNamesDocuments[event.eventName];
  //     product.state[applyMethod](event);
  //     products[product.name.unpack()] = product;
  //     return products;
  //   }, {});
  //   return products;
  // }

  getDomainEvents(databaseStream: ProductEventModel[]) {
    return databaseStream.map((event) => this.typeOrmMapper.toDomain(event));
  }

  async getProduct(productName: ProductNameValueObject) {
    const eventStream = await this.eventRepository.find({
      where: { productName: productName.unpack() },
    });
    const domainEvents = this.getDomainEvents(eventStream);
    const productId = UUID.create(eventStream[0].entityId);
    return this.rebuildStream(productId, domainEvents);
  }

  async isProductExist(productName: ProductNameValueObject): Promise<boolean> {
    const found = await this.eventRepository.find({
      where: { productName: productName.unpack() },
    });

    return found.length !== 0;
  }

  async rebuildStream(productId: ID, eventStream: ProductDomainEvent[]) {
    const product = new ProductAggregate(productId);
    eventStream.forEach((event) => {
      const applyMethod =
        productAggregateApplyEventMethodNamesDocuments[event.eventName];
      product.state[applyMethod](event);
    });

    return product;
  }
}

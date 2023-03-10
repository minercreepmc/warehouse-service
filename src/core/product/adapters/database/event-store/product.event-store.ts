import { EventStoreTypeOrm, ID, UUID } from 'common-base-classes';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ProductDomainEvent,
  ProductDomainEventDetails,
  productDomainEventNames,
} from '@product-domain-events';
import {
  ProductEventModel,
  ProductEventModelDetails,
  productEventRelation,
} from './product-event.model';
import { ProductEventStorePort } from '@product-gateway/driven-ports';
import { ProductEventTypeOrmMapper } from './product-event.mapper';
import {
  ProductAggregate,
  ProductApplyEventMethodNames,
} from '@product-aggregate';
import { ProductNameValueObject } from '@product-value-object';
import { typeormDataSource } from '@configs/typeorm/typeorm.data-source';

export const productApplyEventMethods = {
  [productDomainEventNames.PRODUCT_CREATED]:
    ProductApplyEventMethodNames.CREATE_PRODUCT,
  [productDomainEventNames.PRODUCTS_IMPORTED]:
    ProductApplyEventMethodNames.IMPORT_PRODUCTS,
  [productDomainEventNames.PRODUCTS_EXPORTED]:
    ProductApplyEventMethodNames.SHIP_PRODUCTS,
};

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
      typeormDataSource,
    );
  }

  protected relations = [productEventRelation];
  protected static aggregate: ProductAggregate;
  modelClass = ProductEventModel;

  getDomainEvents(databaseStream: ProductEventModel[]) {
    return databaseStream.map((event) => this.typeOrmMapper.toDomain(event));
  }

  async getProductStream(productName: ProductNameValueObject) {
    return this.eventRepository.find({
      where: { productName: productName.unpack() },
    });
  }

  async getProduct(productName: ProductNameValueObject) {
    const eventStream = await this.eventRepository.find({
      where: { productName: productName.unpack() },
    });
    const domainEvents = this.getDomainEvents(eventStream);
    const productId = UUID.create(eventStream[0].entityId);
    return productId ? this.rebuildStream(productId, domainEvents) : undefined;
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
      const applyMethod = productApplyEventMethods[event.eventName];
      product.state[applyMethod](event);
    });

    return product;
  }
}

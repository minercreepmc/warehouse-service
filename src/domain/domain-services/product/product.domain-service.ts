import { ProductAggregate } from '@aggregates/product';
import { ProductDomainError } from '@domain-errors/product';
import { ProductMessageMapper } from '@driven-ports/product/channel';
import {
  productEventStoreDiToken,
  ProductEventStorePort,
  productRmqDiToken,
} from '@driven-ports/product/ports';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@value-objects/product';
import { ID } from 'common-base-classes';
import {
  CreateProductDomainService,
  CreateProductDomainServiceData,
} from './services/create-product.domain-service';
import {
  ImportProductDomainService,
  ImportProductDomainServiceData,
} from './services/import-products.domain-service';
import {
  ShipProductsDomainService,
  ShipProductsDomainServiceData,
} from './services/ship-products.domain-service';

@Injectable()
export class ProductDomainService {
  constructor(
    @Inject(productEventStoreDiToken)
    private readonly eventStore: ProductEventStorePort,

    @Inject(productRmqDiToken)
    private readonly messageBroker: ClientProxy,

    private readonly mapper: ProductMessageMapper,
  ) {}

  private readonly importProductDomainService = new ImportProductDomainService(
    this.eventStore,
    this.messageBroker,
    this.mapper,
  );
  private readonly createProductDomainService = new CreateProductDomainService(
    this.eventStore,
    this.messageBroker,
    this.mapper,
  );

  private readonly shipProductsDomainService = new ShipProductsDomainService(
    this.eventStore,
  );

  async createProduct(data: CreateProductDomainServiceData) {
    return this.createProductDomainService.execute(data);
  }

  async importProducts(data: ImportProductDomainServiceData) {
    return this.importProductDomainService.execute(data);
  }

  async shipProducts(data: ShipProductsDomainServiceData) {
    return this.shipProductsDomainService.execute(data);
  }

  async isProductExist(productName: ProductNameValueObject): Promise<boolean> {
    return this.eventStore.isProductExist(productName);
  }

  async getProduct(
    productName: ProductNameValueObject,
  ): Promise<ProductAggregate> {
    const found = this.isProductExist(productName);
    if (!found) {
      throw new ProductDomainError.NameIsNotExist();
    }

    return this.eventStore.getProduct(productName);
  }

  async isProductEnoughToShip(
    productName: ProductNameValueObject,
    amount: ProductQuantityValueObject,
  ): Promise<boolean> {
    const product = await this.getProduct(productName);
    return product.quantity.unpack() > amount.unpack();
  }
}

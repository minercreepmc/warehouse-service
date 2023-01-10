import { ProductAggregate } from '@aggregates/product';
import { ProductDomainError } from '@domain-errors/product';
import { ProductMessageMapper } from '@gateway/channel';
import {
  productEventStoreDiToken,
  ProductEventStorePort,
  productRmqDiToken,
} from '@gateway/driven-ports/product';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@value-objects/product';
import {
  AddProductThumbnailsDomainService,
  AddProductThumbnailsDomainServiceData,
} from './services/add-product-thumbnails.domain-service';
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
    this.messageBroker,
    this.mapper,
  );

  private readonly addProductThumbnailsDomainService =
    new AddProductThumbnailsDomainService(
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

  async addProductThumbnails(data: AddProductThumbnailsDomainServiceData) {
    return this.addProductThumbnailsDomainService.execute(data);
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
    return product.quantity.unpack() >= amount.unpack();
  }
}

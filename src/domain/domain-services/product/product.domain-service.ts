import { ProductAggregate } from '@aggregates/product';
import { ProductDomainError } from '@domain-errors/product';
import {
  productEventStoreDiToken,
  ProductEventStorePort,
} from '@driven-ports/product/product.repository.port';
import { Inject, Injectable } from '@nestjs/common';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@value-objects/product';
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
  ) {}

  private readonly importProductDomainService = new ImportProductDomainService(
    this.eventStore,
  );

  private readonly createProductDomainService = new CreateProductDomainService(
    this.eventStore,
  );

  private readonly shipProductsDomainService = new ShipProductsDomainService(
    this.eventStore,
  );

  async importProducts(data: ImportProductDomainServiceData) {
    return this.importProductDomainService.execute(data);
  }

  async createProduct(data: CreateProductDomainServiceData) {
    return this.createProductDomainService.execute(data);
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

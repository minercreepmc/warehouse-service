import { ProductImportedDomainEvent } from '@domain-events/product/product-imported';
import {
  productEventStoreDiToken,
  ProductEventStorePort,
} from '@driven-ports/product/product.repository.port';
import { Inject, Injectable } from '@nestjs/common';
import { ProductNameValueObject } from '@value-objects/product';
import {
  CreateProductDomainService,
  CreateProductDomainServiceProps,
} from './services/create-product.domain-service';
import {
  ImportProductDomainService,
  ImportProductDomainServiceProps,
} from './services/import-product.domain-service';

@Injectable()
export class ProductDomainService {
  // constructor(
  //   @Inject(productEventStoreDiToken)
  //   private readonly eventStore: ProductEventStorePort,
  // ) {}

  // private readonly importProductDomainService = new ImportProductDomainService(
  //   this.eventStore,
  // );

  private readonly createProductDomainService =
    new CreateProductDomainService();

  async importProduct(props: ImportProductDomainServiceProps) {
    console.log('implement');
    //  return this.importProductDomainService.execute(props);
  }

  async createProduct(props: CreateProductDomainServiceProps) {
    return this.createProductDomainService.execute(props);
  }

  // async isProductExist(productName: ProductNameValueObject) {
  //   return this.eventStore.isProductExist(productName);
  // }
}

import {
  productEventStoreDiToken,
  ProductEventStorePort,
} from '@driven-ports/product/product.repository.port';
import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProductDomainService,
  CreateProductDomainServiceData,
} from './services/create-product.domain-service';
import { ImportProductDomainServiceData } from './services/import-product.domain-service';

@Injectable()
export class ProductDomainService {
  constructor(
    @Inject(productEventStoreDiToken)
    private readonly eventStore: ProductEventStorePort,
  ) {}

  // private readonly importProductDomainService = new ImportProductDomainService(
  //   this.eventStore,
  // );

  private readonly createProductDomainService = new CreateProductDomainService(
    this.eventStore,
  );

  async importProduct(props: ImportProductDomainServiceData) {
    console.log('implement');
    //  return this.importProductDomainService.execute(props);
  }

  async createProduct(props: CreateProductDomainServiceData) {
    return this.createProductDomainService.execute(props);
  }

  // async isProductExist(productName: ProductNameValueObject) {
  //   return this.eventStore.isProductExist(productName);
  // }
}

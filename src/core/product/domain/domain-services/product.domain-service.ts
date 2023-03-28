import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductMessageMapper } from '@product-gateway/channel';
import {
  productEventStoreDiToken,
  ProductEventStorePort,
  productMessageBrokerDiToken,
} from '@product-gateway/driven-ports';
import { ProductNameValueObject } from '@product-value-object';
import {
  isEnoughToExportOptions,
  ProductInventoryDomainService,
} from './services';
import {
  CreateProductDomainService,
  CreateProductDomainServiceOptions,
} from './services/create-product.domain-service';
import {
  ImportProductsDomainService,
  ImportProductsDomainServiceOptions,
} from './services/import-products.domain-service';
import {
  ExportProductsDomainService,
  ExportProductsDomainServiceOptions,
} from './services/export-products.domain-service';

@Injectable()
export class ProductDomainService {
  constructor(
    @Inject(productEventStoreDiToken)
    private readonly eventStore: ProductEventStorePort,

    @Inject(productMessageBrokerDiToken)
    private readonly messageBroker: ClientProxy,

    private readonly mapper: ProductMessageMapper,
  ) {}
  private readonly productInventoryDomainService =
    new ProductInventoryDomainService(this.eventStore);

  private readonly importProductDomainService = new ImportProductsDomainService(
    this.productInventoryDomainService,
    this.eventStore,
    this.messageBroker,
    this.mapper,
  );
  private readonly createProductDomainService = new CreateProductDomainService(
    this.productInventoryDomainService,
    this.eventStore,
    this.messageBroker,
    this.mapper,
  );

  private readonly exportProductsDomainService =
    new ExportProductsDomainService(
      this.productInventoryDomainService,
      this.eventStore,
      this.messageBroker,
      this.mapper,
    );

  async createProduct(data: CreateProductDomainServiceOptions) {
    return this.createProductDomainService.execute(data);
  }

  async importProducts(data: ImportProductsDomainServiceOptions) {
    return this.importProductDomainService.execute(data);
  }

  async exportProducts(data: ExportProductsDomainServiceOptions) {
    return this.exportProductsDomainService.execute(data);
  }

  async getProduct(productName: ProductNameValueObject) {
    return this.productInventoryDomainService.getProduct(productName);
  }

  async isEnoughToExport(options: isEnoughToExportOptions) {
    return this.productInventoryDomainService.isEnoughToExport(options);
  }

  async isProductExist(productName: ProductNameValueObject) {
    return this.eventStore.isProductExist(productName);
  }
}

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
  CreateProductDomainServiceData,
} from './services/create-product.domain-service';
import {
  ImportProductsDomainService,
  ImportProductsDomainServiceData,
} from './services/import-products.domain-service';
import {
  ExportProductsDomainService,
  ExportProductsDomainServiceData,
} from './services/ship-products.domain-service';

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

  private readonly shipProductsDomainService = new ExportProductsDomainService(
    this.productInventoryDomainService,
    this.eventStore,
    this.messageBroker,
    this.mapper,
  );

  async createProduct(data: CreateProductDomainServiceData) {
    return this.createProductDomainService.execute(data);
  }

  async importProducts(data: ImportProductsDomainServiceData) {
    return this.importProductDomainService.execute(data);
  }

  async shipProducts(data: ExportProductsDomainServiceData) {
    return this.shipProductsDomainService.execute(data);
  }

  async getProduct(productName: ProductNameValueObject) {
    return this.productInventoryDomainService.getProduct(productName);
  }

  async isEnoughToExport(options: isEnoughToExportOptions) {
    return this.productInventoryDomainService.isEnoughToExport(options);
  }

  async isProductExist(productName: ProductNameValueObject) {
    return this.isProductExist(productName);
  }
}

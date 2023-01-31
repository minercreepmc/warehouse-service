import { ClientProxy } from '@nestjs/microservices';
import { ImportProductsAggregateData } from '@product-aggregate';
import { ProductBusinessRules } from '@product-business-rules';
import { ProductDomainError } from '@product-domain-errors';
import { ProductsImportedDomainEvent } from '@product-domain-events';
import { ProductMessageMapper } from '@product-gateway/channel';
import { ProductEventStorePort } from '@product-gateway/driven-ports';

export interface ImportProductDomainServiceData
  extends ImportProductsAggregateData {}

export class ImportProductDomainService {
  constructor(
    private readonly businessRules: ProductBusinessRules,
    private readonly eventStore: ProductEventStorePort,
    private readonly messageBroker: ClientProxy,
    private readonly mapper: ProductMessageMapper,
  ) {}
  async execute(data: ImportProductDomainServiceData) {
    if (!this.businessRules.isProductNameExist(data.name)) {
      throw new ProductDomainError.NameIsNotExist();
    }

    const product = await this.eventStore.getProduct(data.name);

    const productsImported = product.importProducts(data);
    await this.eventStore.save(productsImported);

    const message = this.mapper.toMessage(productsImported);
    this.messageBroker.emit(ProductsImportedDomainEvent.name, message);
    return productsImported;
  }
}

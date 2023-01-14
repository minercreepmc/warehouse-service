import { ProductAggregateDetails } from '@aggregates/product/product.aggregate.interface';
import { ProductBusinessRules } from '@business-rules/product.business-rules';
import { ProductDomainError } from '@domain-errors/product';
import { ProductsImportedDomainEvent } from '@domain-events/product';
import { ProductMessageMapper } from '@gateway/channel';
import { ProductEventStorePort } from '@gateway/driven-ports/product';
import { ClientProxy } from '@nestjs/microservices';

export interface ImportProductDomainServiceData
  extends ProductAggregateDetails {}

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

    const productsImported = product.importProducts({
      id: product.id,
      details: data,
    });
    await this.eventStore.save(productsImported);

    const message = this.mapper.toMessage(productsImported);
    this.messageBroker.emit(ProductsImportedDomainEvent.name, message);
    return productsImported;
  }
}

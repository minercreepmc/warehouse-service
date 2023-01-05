import { ProductAggregateDetails } from '@aggregates/product/product.aggregate.interface';
import { ProductDomainError } from '@domain-errors/product';
import { ProductsImportedDomainEvent } from '@domain-events/product';
import { ProductMessageMapper } from '@gateway/channel';
import { ProductEventStorePort } from '@gateway/driven-ports/product';
import { ClientProxy } from '@nestjs/microservices';

export interface ImportProductDomainServiceData
  extends ProductAggregateDetails {}

export class ImportProductDomainService {
  constructor(
    private readonly eventStore: ProductEventStorePort,
    private readonly messageBroker: ClientProxy,
    private readonly mapper: ProductMessageMapper,
  ) {}
  async execute(data: ImportProductDomainServiceData) {
    const product = await this.eventStore.getProduct(data.name);
    if (!product) {
      throw new ProductDomainError.NameIsNotExist();
    }
    const productImported = product.importProducts({
      id: product.id,
      details: data,
    });
    await this.eventStore.save(productImported);

    const message = this.mapper.toMessage(productImported);
    this.messageBroker.emit(ProductsImportedDomainEvent.name, message);
    return productImported;
  }
}

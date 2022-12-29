import { ProductAggregateDetails } from '@aggregates/product/product.aggregate.interface';
import { ProductDomainError } from '@domain-errors/product';
import { ProductEventStorePort } from '@driven-ports/product/product.repository.port';

export interface ImportProductDomainServiceData
  extends ProductAggregateDetails {}

export class ImportProductDomainService {
  constructor(private readonly eventStore: ProductEventStorePort) {}
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
    // publish event
    return productImported;
  }
}

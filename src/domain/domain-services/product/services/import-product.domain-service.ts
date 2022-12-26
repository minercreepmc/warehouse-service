import { ProductAggregate } from '@aggregates/product';
import { ProductAggregateDetails } from '@aggregates/product/product.aggregate.interface';
import { ProductEventStorePort } from '@driven-ports/product/product.repository.port';

export interface ImportProductDomainServiceData
  extends ProductAggregateDetails {}

export class ImportProductDomainService {
  constructor(private readonly eventStore: ProductEventStorePort) {}
  async execute(data: ImportProductDomainServiceData) {
    //const product = this.eventStore.getProduct(data.name);
    const product = new ProductAggregate();
    const productImported = product.importProducts({
      id: product.id,
      details: data,
    });
    await this.eventStore.save(productImported);
    return productImported;
  }
}

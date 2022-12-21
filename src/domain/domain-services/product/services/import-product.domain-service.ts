import { ProductAggregateInterfaces } from '@aggregates/product/product.aggregate.interface';
import { ProductEventStorePort } from '@driven-ports/product/product.repository.port';

export interface ImportProductDomainServiceProps
  extends ProductAggregateInterfaces.Details {}

export class ImportProductDomainService {
  constructor(private readonly eventStore: ProductEventStorePort) {}
  async execute(props: ImportProductDomainServiceProps) {
    const product = this.eventStore.getProduct(props.name);
    const productImported = product.importProducts({
      id: product.id,
      details: props,
    });
    await this.eventStore.save(productImported);
    return productImported;
  }
}

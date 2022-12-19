import { ProductAggregate } from '@aggregates/product/product.aggregate';
import { IProductAggregate } from '@aggregates/product/product.aggregate.interface';
import { ProductEventStorePort } from '@driven-ports/product/product.repository.port';

export class ImportProductDomainService {
  constructor(private readonly eventStore: ProductEventStorePort) {}
  async execute(props: IProductAggregate.ImportProps) {
    const product = new ProductAggregate();
    product.importProducts(props);
    await this.eventStore.saveMany(product.domainEvents);
  }
}

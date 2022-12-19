import { IProductAggregate } from '@aggregates/product/product.aggregate.interface';
import {
  productEventStoreDiToken,
  ProductEventStorePort,
} from '@driven-ports/product/product.repository.port';
import { Inject, Injectable } from '@nestjs/common';
import { ImportProductDomainService } from './services/import-product.domain-service';

@Injectable()
export class ProductDomainService {
  constructor(
    @Inject(productEventStoreDiToken)
    private readonly eventStore: ProductEventStorePort,
  ) {}

  private readonly importProductDomainService = new ImportProductDomainService(
    this.eventStore,
  );

  async importProduct(props: IProductAggregate.ImportProps) {
    return this.importProductDomainService.execute(props);
  }
}

import { ClientProxy } from '@nestjs/microservices';
import { ImportProductsAggregateOptions } from '@product-aggregate';
import { ProductDomainError } from '@product-domain-errors';
import { ProductsImportedDomainEvent } from '@product-domain-events';
import { ProductMessageMapper } from '@product-gateway/channel';
import { ProductEventStorePort } from '@product-gateway/driven-ports';
import { ProductInventoryDomainService } from './product-inventory.domain-service';

export interface ImportProductsDomainServiceData
  extends ImportProductsAggregateOptions {}

export class ImportProductsDomainService {
  constructor(
    private readonly inventoryService: ProductInventoryDomainService,
    private readonly eventStore: ProductEventStorePort,
    private readonly messageBroker: ClientProxy,
    private readonly mapper: ProductMessageMapper,
  ) {}
  async execute(
    data: ImportProductsDomainServiceData,
  ): Promise<ProductsImportedDomainEvent> {
    if (!this.inventoryService.isProductExist(data.name)) {
      throw new ProductDomainError.NameIsNotExist();
    }

    return await this.eventStore.runInTransaction(async () => {
      const product = await this.eventStore.getProduct(data.name);
      const productsImported = product.importProducts(data);
      await this.eventStore.save(productsImported);
      const message = this.mapper.toMessage(productsImported);
      this.messageBroker.emit(ProductsImportedDomainEvent.name, message);
      await this.eventStore.commitTransaction();
      return productsImported;
    });
  }
}

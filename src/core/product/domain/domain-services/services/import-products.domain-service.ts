import { ClientProxy } from '@nestjs/microservices';
import { ImportProductsAggregateOptions } from '@product-aggregate';
import { ProductDomainException } from '@product-domain-exceptions';
import { ProductsImportedDomainEvent } from '@product-domain-events';
import { ProductMessageMapper } from '@product-gateway/channel';
import { ProductEventStorePort } from '@product-gateway/driven-ports';
import { ProductInventoryDomainService } from './product-inventory.domain-service';

export interface ImportProductsDomainServiceOptions
  extends ImportProductsAggregateOptions {}

export class ImportProductsDomainService {
  constructor(
    private readonly inventoryService: ProductInventoryDomainService,
    private readonly eventStore: ProductEventStorePort,
    private readonly messageBroker: ClientProxy,
    private readonly mapper: ProductMessageMapper,
  ) {}
  async execute(
    options: ImportProductsDomainServiceOptions,
  ): Promise<ProductsImportedDomainEvent> {
    return await this.eventStore.runInTransaction(async () => {
      if (!(await this.inventoryService.isProductExist(options.name))) {
        throw new ProductDomainException.NameIsNotExist();
      }

      const product = await this.eventStore.getProduct(options.name);

      const productsImported = product.importProducts(options);
      await this.eventStore.save(productsImported);
      const message = this.mapper.toMessage(productsImported);
      this.messageBroker.emit(ProductsImportedDomainEvent.name, message);
      return productsImported;
    });
  }
}

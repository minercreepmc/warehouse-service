import { ClientProxy } from '@nestjs/microservices';
import { ExportProductsAggregateOptions } from '@product-aggregate';
import { ProductDomainException } from '@product-domain-exceptions';
import { ProductsExportedDomainEvent } from '@product-domain-events';
import { ProductMessageMapper } from '@product-gateway/channel';
import { ProductEventStorePort } from '@product-gateway/driven-ports';
import { ProductInventoryDomainService } from './product-inventory.domain-service';

export interface ExportProductsDomainServiceOptions
  extends ExportProductsAggregateOptions {}

export class ExportProductsDomainService {
  constructor(
    private readonly inventoryService: ProductInventoryDomainService,
    private readonly eventStore: ProductEventStorePort,
    private readonly messageBroker: ClientProxy,
    private readonly mapper: ProductMessageMapper,
  ) {}

  async execute(
    options: ExportProductsDomainServiceOptions,
  ): Promise<ProductsExportedDomainEvent> {
    return this.eventStore.runInTransaction(async () => {
      await this.checkForException(options);
      const product = await this.eventStore.getProduct(options.name);
      const productsExportedEvent = product.exportProducts(options);

      this.eventStore.save(productsExportedEvent);

      const message = this.mapper.toMessage(productsExportedEvent);
      this.messageBroker.emit(ProductsExportedDomainEvent.name, message);

      this.eventStore.commitTransaction();
      return productsExportedEvent;
    });
  }

  async checkForException(data: ExportProductsDomainServiceOptions) {
    if (!(await this.inventoryService.isProductExist(data.name))) {
      throw new ProductDomainException.NameIsNotExist();
    }

    if (
      !(await this.inventoryService.isEnoughToExport({
        productName: data.name,
        amount: data.quantity,
      }))
    ) {
      throw new ProductDomainException.QuantityIsNotEnough();
    }
  }
}

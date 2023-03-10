import { ClientProxy } from '@nestjs/microservices';
import { ExportProductsAggregateOptions } from '@product-aggregate';
import { ProductDomainError } from '@product-domain-errors';
import { ProductsExportedDomainEvent } from '@product-domain-events';
import { ProductMessageMapper } from '@product-gateway/channel';
import { ProductEventStorePort } from '@product-gateway/driven-ports';
import { ProductInventoryDomainService } from './product-inventory.domain-service';

export interface ExportProductsDomainServiceData
  extends ExportProductsAggregateOptions {}

export class ExportProductsDomainService {
  constructor(
    private readonly inventoryService: ProductInventoryDomainService,
    private readonly eventStore: ProductEventStorePort,
    private readonly messageBroker: ClientProxy,
    private readonly mapper: ProductMessageMapper,
  ) {}

  async execute(
    data: ExportProductsDomainServiceData,
  ): Promise<ProductsExportedDomainEvent> {
    this.checkForError(data);
    return this.eventStore.runInTransaction(async () => {
      const product = await this.eventStore.getProduct(data.name);
      const productsExportedEvent = product.exportProducts(data);

      this.eventStore.save(productsExportedEvent);

      const message = this.mapper.toMessage(productsExportedEvent);
      this.messageBroker.emit(ProductsExportedDomainEvent.name, message);

      this.eventStore.commitTransaction();
      return productsExportedEvent;
    });
  }

  async checkForError(data: ExportProductsDomainServiceData) {
    if (!this.inventoryService.isProductExist(data.name)) {
      throw new ProductDomainError.NameIsNotExist();
    }

    if (
      !this.inventoryService.isEnoughToExport({
        productName: data.name,
        amount: data.quantity,
      })
    ) {
      throw new ProductDomainError.QuantityIsNotEnough();
    }
  }
}

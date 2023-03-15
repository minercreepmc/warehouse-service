import {
  ProductCreatedDomainEvent,
  ProductsExportedDomainEvent,
  ProductsImportedDomainEvent,
} from '@product-domain-events';
import { ProductLoadEntity } from '@product-entities';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { AbstractAggregateRoot, UUID } from 'common-base-classes';
import { Queue } from 'typescript-collections';
import { ProductIdValueObject } from '../value-objects/product-id.value-object';
import type {
  CreateProductAggegateOptions,
  ExportProductsAggregateOptions,
  ImportProductsAggregateOptions,
  ProductAggregateDetails,
} from './product.aggregate.interface';
import { InitialProductState, ProductState } from './states';

export class ProductAggregate extends AbstractAggregateRoot<
  Partial<ProductAggregateDetails>
> {
  constructor(id?: ProductIdValueObject) {
    const productId = id ? id : UUID.create();
    const details = {};
    super({ id: productId, details });
    this.state = new InitialProductState(this);
  }
  state: ProductState;
  changeState(newState: ProductState): void {
    this.state = newState;
  }

  createProduct(
    options: CreateProductAggegateOptions,
  ): ProductCreatedDomainEvent {
    const { name } = options;
    const event = new ProductCreatedDomainEvent({
      productId: this.id,
      eventDetails: {
        name,
      },
    });
    this.state.applyCreateProduct(event);
    return event;
  }

  importProducts(
    options: ImportProductsAggregateOptions,
  ): ProductsImportedDomainEvent {
    const { name, quantity } = options;
    const event = new ProductsImportedDomainEvent({
      productId: this.id,
      eventDetails: {
        name,
        quantity,
      },
    });
    this.state.applyImportProducts(event);
    return event;
  }

  exportProducts(
    options: ExportProductsAggregateOptions,
  ): ProductsExportedDomainEvent {
    const { name, quantity } = options;
    const event = new ProductsExportedDomainEvent({
      productId: this.id,
      eventDetails: {
        name,
        quantity,
      },
    });
    this.state.applyExportProducts(event);
    return event;
  }

  isEnoughToExport(need: ProductQuantityValueObject): boolean {
    return this.totalQuantity.isGreaterThanOrEqualTo(need);
  }

  get name(): ProductNameValueObject {
    return this.details.name;
  }

  set name(newName: ProductNameValueObject) {
    this.details.name = newName;
  }

  getNameValue(): string {
    return this.details.name.unpack();
  }

  setName(newName: string) {
    this.details.name = new ProductNameValueObject(newName);
  }

  get loads(): Queue<ProductLoadEntity> {
    return this.details.loads;
  }

  set loads(loads: Queue<ProductLoadEntity>) {
    this.details.loads = loads;
  }

  setLoads(loads: number[]) {
    const productLoadQueue = new Queue<ProductLoadEntity>();
    loads.forEach((load) => {
      const productLoad = new ProductLoadEntity({
        productId: this.id,
        productLoadBarcode: UUID.create(),
        productQuantity: new ProductQuantityValueObject(load),
      });
      productLoadQueue.enqueue(productLoad);
    });

    this.details.loads = productLoadQueue;
  }

  get totalQuantity(): ProductQuantityValueObject {
    return this.details.totalQuantity;
  }

  set totalQuantity(newQuantity: ProductQuantityValueObject) {
    this.details.totalQuantity = newQuantity;
  }

  getTotalQuantityValue(): number {
    return this.details.totalQuantity.unpack();
  }

  setTotalQuantity(newQuantity: number) {
    this.details.totalQuantity = new ProductQuantityValueObject(newQuantity);
  }
}

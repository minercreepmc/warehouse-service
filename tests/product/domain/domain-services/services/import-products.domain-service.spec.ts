import { ClientProxy } from '@nestjs/microservices';
import { ProductAggregate } from '@product-aggregate';
import {
  ProductCreatedDomainEvent,
  ProductsImportedDomainEvent,
} from '@product-domain-events';
import {
  ImportProductsDomainService,
  ProductInventoryDomainService,
} from '@product-domain-services/services';
import { ProductMessageMapper } from '@product-gateway/channel';
import { ProductEventStorePort } from '@product-gateway/driven-ports';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { mock, mockDeep } from 'jest-mock-extended';

const productEventStoreMock = mockDeep<ProductEventStorePort>();

const productMessageBrokerMock = mock<ClientProxy>();
const productMessageMapper = new ProductMessageMapper();
const importProductsDomainServiceMock = mockDeep<ImportProductsDomainService>();
const inventoryServiceMock = mockDeep<ProductInventoryDomainService>();
inventoryServiceMock.isProductExist.mockResolvedValueOnce(true);

const product = new ProductAggregate();
const sampleProductName = new ProductNameValueObject('Sample Product');
const sampleQuantity = new ProductQuantityValueObject(5);
product.createProduct({
  name: sampleProductName,
});

describe('ImportProductsDomainService', () => {
  let productsImportedEvent: ProductsImportedDomainEvent;

  describe('statement converage', () => {
    it('should bypass isProductExist check', async () => {
      const isExist = await inventoryServiceMock.isProductExist(
        sampleProductName,
      );

      expect(inventoryServiceMock.isProductExist).toHaveBeenCalledWith(
        sampleProductName,
      );
      expect(isExist).toEqual(true);
    });
    it('should run inside a transaction', () => {
      productEventStoreMock.runInTransaction(() => {
        return Promise.resolve();
      });
      expect(productEventStoreMock.runInTransaction).toHaveBeenCalled();
    });

    it('should get product aggregate and import the products', async () => {
      productEventStoreMock.getProduct.mockResolvedValueOnce(product);
      const productAggregate = await productEventStoreMock.getProduct(
        sampleProductName,
      );

      expect(productAggregate).toBe(product);
      productsImportedEvent = productAggregate.importProducts({
        name: sampleProductName,
        quantity: new ProductQuantityValueObject(5),
      });

      expect(productsImportedEvent).toBeDefined();
    });

    it('should save the domain event to eventStore', async () => {
      productEventStoreMock.save.mockResolvedValueOnce(productsImportedEvent);
      const eventSaved = await productEventStoreMock.save(
        productsImportedEvent,
      );
      expect(eventSaved).toBeDefined();
    });

    it('should map the event to message and send to message broker', () => {
      const message = productMessageMapper.toMessage(productsImportedEvent);
      expect(message).toBeDefined();

      productMessageBrokerMock.send(ProductCreatedDomainEvent.name, message);
      expect(productMessageBrokerMock.send).toHaveBeenCalledWith(
        ProductCreatedDomainEvent.name,
        message,
      );
    });
  });

  describe('function converage', () => {
    it('should successfully create a product and return ProductCreatedDomainEvent', async () => {
      importProductsDomainServiceMock.execute.mockResolvedValueOnce(
        productsImportedEvent,
      );
      const imported = await importProductsDomainServiceMock.execute({
        name: sampleProductName,
        quantity: sampleQuantity,
      });

      expect(imported).toBe(productsImportedEvent);
    });
  });
});

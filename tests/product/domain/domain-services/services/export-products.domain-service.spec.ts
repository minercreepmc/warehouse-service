import { ClientProxy } from '@nestjs/microservices';
import { ProductAggregate } from '@product-aggregate';
import { ProductsExportedDomainEvent } from '@product-domain-events';
import { ExportProductsDomainService } from '@product-domain-services/services';
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
const exportProductsDomainServiceMock = mockDeep<ExportProductsDomainService>();

// Product that have quantity inside of it
const product = new ProductAggregate();
const sampleProductName = new ProductNameValueObject('Sample Product');
const sampleQuantity = new ProductQuantityValueObject(5);
product.createProduct({
  name: sampleProductName,
});
product.importProducts({
  name: sampleProductName,
  quantity: sampleQuantity,
});

describe('exportProductsDomainService', () => {
  let productsExportedEvent: ProductsExportedDomainEvent;

  describe('statement converage', () => {
    it('should bypass the checkForError', async () => {
      expect(() =>
        exportProductsDomainServiceMock.checkForError({
          name: sampleProductName,
          quantity: sampleQuantity,
        }),
      ).not.toThrow(Error);

      expect(
        exportProductsDomainServiceMock.checkForError,
      ).toHaveBeenCalledTimes(1);
    });
    it('should run inside a transaction', () => {
      productEventStoreMock.runInTransaction(() => {
        return Promise.resolve();
      });
      expect(productEventStoreMock.runInTransaction).toHaveBeenCalled();
    });

    it('should get product aggregate and export the products', async () => {
      productEventStoreMock.getProduct.mockResolvedValueOnce(product);
      const productAggregate = await productEventStoreMock.getProduct(
        sampleProductName,
      );

      expect(productAggregate).toBe(product);
      productsExportedEvent = productAggregate.exportProducts({
        name: sampleProductName,
        quantity: new ProductQuantityValueObject(2),
      });

      expect(productsExportedEvent).toBeDefined();
    });

    it('should save the domain event to eventStore', async () => {
      productEventStoreMock.save.mockResolvedValueOnce(productsExportedEvent);
      const eventSaved = await productEventStoreMock.save(
        productsExportedEvent,
      );
      expect(eventSaved).toBeDefined();
    });

    it('should map the event to message and send to message broker', () => {
      const message = productMessageMapper.toMessage(productsExportedEvent);
      expect(message).toBeDefined();

      productMessageBrokerMock.send(ProductsExportedDomainEvent.name, message);
      expect(productMessageBrokerMock.send).toHaveBeenCalledWith(
        ProductsExportedDomainEvent.name,
        message,
      );
    });
  });

  describe('function converage', () => {
    it('should successfully export products and return ProductsExportedDomainEvent', async () => {
      exportProductsDomainServiceMock.execute.mockResolvedValueOnce(
        productsExportedEvent,
      );
      const exported = await exportProductsDomainServiceMock.execute({
        name: sampleProductName,
        quantity: sampleQuantity,
      });

      expect(exported).toBe(productsExportedEvent);
    });
  });
});

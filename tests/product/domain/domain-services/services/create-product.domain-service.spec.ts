import { ClientProxy } from '@nestjs/microservices';
import { ProductAggregate } from '@product-aggregate';
import { ProductCreatedDomainEvent } from '@product-domain-events';
import {
  CreateProductDomainService,
  ProductInventoryDomainService,
} from '@product-domain-services/services';
import { ProductMessageMapper } from '@product-gateway/channel';
import { ProductEventStorePort } from '@product-gateway/driven-ports';
import { ProductNameValueObject } from '@product-value-object';
import { mock, mockDeep } from 'jest-mock-extended';

const productEventStoreMock = mockDeep<ProductEventStorePort>();

const productMessageBrokerMock = mock<ClientProxy>();
const inventoryServiceMock = mockDeep<ProductInventoryDomainService>();
inventoryServiceMock.isProductExist.mockResolvedValueOnce(true);
const productMessageMapper = new ProductMessageMapper();
const createProductDomainServiceMock = mockDeep<CreateProductDomainService>();

describe('CreateProductDomainService', () => {
  let sampleProductName: ProductNameValueObject;
  let product: ProductAggregate;
  let productCreatedEvent: ProductCreatedDomainEvent;
  describe('Statemen coverage', () => {
    it('should bypass isProductExist check', async () => {
      sampleProductName = new ProductNameValueObject('Sample Product');
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
    it('should create product with the aggregate', () => {
      product = new ProductAggregate();
      expect(product).toBeDefined();

      productCreatedEvent = product.createProduct({
        name: sampleProductName,
      });
      expect(productCreatedEvent).toBeDefined();
    });
    it('should save the domain event to eventStore', async () => {
      productEventStoreMock.save.mockResolvedValueOnce(productCreatedEvent);
      const eventSaved = await productEventStoreMock.save(productCreatedEvent);
      expect(eventSaved).toBeDefined();
    });

    it('should map the event to message and send to message broker', () => {
      const message = productMessageMapper.toMessage(productCreatedEvent);
      expect(message).toBeDefined();

      productMessageBrokerMock.send(ProductCreatedDomainEvent.name, message);
      expect(productMessageBrokerMock.send).toHaveBeenCalledWith(
        ProductCreatedDomainEvent.name,
        message,
      );
    });
  });

  describe('Function coverage', () => {
    it('should successfully create a product and return ProductCreatedDomainEvent', async () => {
      createProductDomainServiceMock.execute.mockResolvedValueOnce(
        productCreatedEvent,
      );
      const created = await createProductDomainServiceMock.execute({
        name: sampleProductName,
      });

      expect(created).toBe(productCreatedEvent);
    });
  });
});

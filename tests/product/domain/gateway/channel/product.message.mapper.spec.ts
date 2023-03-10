import { ProductAggregate } from '@product-aggregate';
import { ProductsImportedDomainEvent } from '@product-domain-events';
import { ProductMessageMapper } from '@product-gateway/channel';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';

describe('ProductMessageMapper', () => {
  let mapper: ProductMessageMapper;
  let product: ProductAggregate;
  const name = new ProductNameValueObject('Product 1');
  const quantity = new ProductQuantityValueObject(5);
  let productsImportedEvent: ProductsImportedDomainEvent;

  beforeEach(() => {
    product = new ProductAggregate();
    product.createProduct({
      name,
    });
    productsImportedEvent = product.importProducts({ name, quantity });
    mapper = new ProductMessageMapper();
  });

  it('should map domain event to message', () => {
    const message = mapper.toMessage(productsImportedEvent);
    expect(message.name).toEqual(name.unpack());
    expect(message.quantity).toEqual(quantity.unpack());
  });
});

import {
  ProductsImportedDomainEvent,
  ProductsImportedDomainEventDetails,
} from '@product-domain-events';
import { ImportProductsMapper } from '@product-use-case/import-products/application-services';
import {
  ImportProductsCommand,
  ImportProductsDomainData,
  ImportProductsResponseDto,
} from '@product-use-case/import-products/application-services/dtos';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { ID } from 'common-base-classes';

describe('ImportProductsMapper', () => {
  let mapper: ImportProductsMapper;

  beforeEach(() => {
    mapper = new ImportProductsMapper();
  });

  describe('toDomain', () => {
    it('should map command to domain data', () => {
      // Arrange
      const command: ImportProductsCommand = {
        name: 'Product A',
        quantity: 10,
      };

      // Act
      const domainData: ImportProductsDomainData = mapper.toDomain(command);

      // Assert
      expect(domainData.name).toEqual(new ProductNameValueObject('Product A'));
      expect(domainData.quantity).toEqual(new ProductQuantityValueObject(10));
    });
  });

  describe('toResponseDTO', () => {
    it('should map domain event to response DTO', () => {
      // Arrange
      const eventDetails: ProductsImportedDomainEventDetails = {
        name: new ProductNameValueObject('Product A'),
        quantity: new ProductQuantityValueObject(10),
      };
      const event = new ProductsImportedDomainEvent({
        productId: new ID('123'),
        eventDetails,
      });

      // Act
      const responseDTO: ImportProductsResponseDto =
        mapper.toResponseDTO(event);

      // Assert
      expect(responseDTO).toEqual(
        new ImportProductsResponseDto({ name: 'Product A', quantity: 10 }),
      );
    });
  });
});

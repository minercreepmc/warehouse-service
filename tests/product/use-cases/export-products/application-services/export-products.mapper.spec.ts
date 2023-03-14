import { ProductsExportedDomainEvent } from '@product-domain-events';
import { ExportProductsMapper } from '@product-use-case/export-products/application-services';
import {
  ExportProductsCommand,
  ExportProductsDomainData,
  ExportProductsResponseDto,
} from '@product-use-case/export-products/application-services/dtos';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { ID } from 'common-base-classes';

describe('ExportProductsMapper', () => {
  let mapper: ExportProductsMapper;

  beforeEach(() => {
    mapper = new ExportProductsMapper();
  });

  describe('toDomain', () => {
    it('should map an ExportProductsCommand to an ExportProductsDomainData', () => {
      const command: ExportProductsCommand = {
        name: 'Product 1',
        quantity: 5,
      };
      const expectedDomainData: ExportProductsDomainData = {
        name: new ProductNameValueObject('Product 1'),
        quantity: new ProductQuantityValueObject(5),
      };
      const domainData = mapper.toDomain(command);
      expect(domainData).toEqual(expectedDomainData);
    });
  });

  describe('toResponseDTO', () => {
    it('should map a ProductsExportedDomainEvent to an ExportProductsResponseDto', () => {
      const event = new ProductsExportedDomainEvent({
        productId: new ID('123'),
        eventDetails: {
          name: new ProductNameValueObject('Product 1'),
          quantity: new ProductQuantityValueObject(5),
        },
      });
      const expectedDto = new ExportProductsResponseDto({
        name: 'Product 1',
        quantity: 5,
      });
      const dto = mapper.toResponseDTO(event);
      expect(dto).toEqual(expectedDto);
    });
  });
});

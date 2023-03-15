import { ProductCreatedDomainEvent } from '@product-domain-events';
import { CreateProductMapper } from '@product-use-case/create-product/application-services';
import {
  CreateProductCommand,
  CreateProductDomainData,
  CreateProductResponseDto,
} from '@product-use-case/create-product/application-services/dtos';
import { ProductNameValueObject } from '@product-value-object';
import { ID } from 'common-base-classes';

describe('CreateProductMapper', () => {
  let createProductMapper: CreateProductMapper;

  beforeEach(() => {
    createProductMapper = new CreateProductMapper();
  });

  describe('toDomain', () => {
    it('should map a CreateProductCommand to a CreateProductDomainData object', () => {
      // Arrange
      const command: CreateProductCommand = { name: 'Product 1' };

      // Act
      const result: CreateProductDomainData =
        createProductMapper.toDomain(command);

      // Assert
      expect(result.name.unpack()).toEqual('Product 1');
    });
  });

  describe('toResponseDTO', () => {
    it('should map a ProductCreatedDomainEvent to a CreateProductResponseDto object', () => {
      // Arrange
      const event = new ProductCreatedDomainEvent({
        productId: new ID('123'),
        eventDetails: {
          name: new ProductNameValueObject('Product 1'),
        },
      });

      // Act
      const result: CreateProductResponseDto =
        createProductMapper.toResponseDTO(event);

      // Assert
      expect(result.name).toEqual('Product 1');
    });
  });
});

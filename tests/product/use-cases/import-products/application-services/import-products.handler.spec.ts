import { ProductsImportedDomainEvent } from '@product-domain-events';
import { ProductDomainException } from '@product-domain-exceptions';
import { ProductDomainService } from '@product-domain-services';
import {
  ImportProductsBusinessValidator,
  ImportProductsCommandValidator,
  ImportProductsHandler,
  ImportProductsMapper,
} from '@product-use-case/import-products/application-services';
import {
  ImportProductsCommand,
  ImportProductsResponseDto,
} from '@product-use-case/import-products/application-services/dtos';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { ID } from 'common-base-classes';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('ImportProductsHandler', () => {
  let handler: ImportProductsHandler;
  let mapper: ImportProductsMapper;
  let commandValidator: ImportProductsCommandValidator;
  let businessValidator: ImportProductsBusinessValidator;
  let domainServiceMock: DeepMockProxy<ProductDomainService>;

  beforeEach(() => {
    mapper = new ImportProductsMapper();
    commandValidator = new ImportProductsCommandValidator();
    domainServiceMock = mockDeep<ProductDomainService>();
    businessValidator = new ImportProductsBusinessValidator(domainServiceMock);
    handler = new ImportProductsHandler(
      mapper,
      commandValidator,
      businessValidator,
      domainServiceMock,
    );
  });

  describe('execute', () => {
    it('should return Err with validation errors when command validation fails', async () => {
      // Arrange
      const command = {
        name: '',
        quantity: 0,
      };

      // Act
      const result = await handler.execute(command);

      // Assert
      expect(result.isErr()).toBe(true);
      expect(result.unwrapErr()).toHaveLength(2);
    });

    it('should return Err if the product not exist', async () => {
      // Arrange
      const dto = {
        name: 'Product',
        quantity: 1,
      };
      const command = new ImportProductsCommand(dto);
      domainServiceMock.isProductExist.mockResolvedValueOnce(false);

      // Act
      const result = await handler.execute(command);

      // Assert
      expect(result.isErr()).toBe(true);
      expect(result.unwrapErr()).toEqual(
        expect.arrayContaining([new ProductDomainException.NameIsNotExist()]),
      );
    });

    it('should return Ok with response DTO when execution succeeds', async () => {
      // Arrange
      const dto = {
        name: 'Product',
        quantity: 1,
      };
      const command = new ImportProductsCommand(dto);
      domainServiceMock.isProductExist.mockResolvedValueOnce(true);

      domainServiceMock.importProducts.mockResolvedValueOnce(
        new ProductsImportedDomainEvent({
          productId: new ID('123'),
          eventDetails: {
            name: new ProductNameValueObject(dto.name),
            quantity: new ProductQuantityValueObject(dto.quantity),
          },
        }),
      );

      // Act
      const result = await handler.execute(command);

      // Assert
      expect(result.isOk()).toBe(true);
      expect(result.unwrap()).toEqual(
        new ImportProductsResponseDto({
          name: dto.name,
          quantity: dto.quantity,
        }),
      );
    });
  });
});

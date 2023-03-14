import { ArgumentContainsEmptyStringException } from '@common-exceptions';
import { ProductsExportedDomainEvent } from '@product-domain-events';
import { ProductDomainException } from '@product-domain-exceptions';
import { ProductDomainService } from '@product-domain-services';
import {
  ExportProductsBusinessValidator,
  ExportProductsCommandValidator,
  ExportProductsHandler,
  ExportProductsMapper,
} from '@product-use-case/export-products/application-services';
import {
  ExportProductsCommand,
  ExportProductsResponseDto,
} from '@product-use-case/export-products/application-services/dtos';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { ID } from 'common-base-classes';
import { mock, MockProxy } from 'jest-mock-extended';

describe('ExportProductsHandler', () => {
  let handler: ExportProductsHandler;
  let mapper: ExportProductsMapper;
  let commandValidator: MockProxy<ExportProductsCommandValidator>;
  let businessValidator: MockProxy<ExportProductsBusinessValidator>;
  let domainService: MockProxy<ProductDomainService>;

  beforeEach(() => {
    mapper = new ExportProductsMapper();
    commandValidator = mock<ExportProductsCommandValidator>();
    domainService = mock<ProductDomainService>();
    businessValidator = mock<ExportProductsBusinessValidator>();

    handler = new ExportProductsHandler(
      mapper,
      commandValidator,
      businessValidator,
      domainService,
    );
  });

  describe('execute', () => {
    const dto = {
      name: 'Product A',
      quantity: 10,
    };
    const command = new ExportProductsCommand({
      name: dto.name,
      quantity: dto.quantity,
    });

    it('should return an error if the command is not valid', async () => {
      commandValidator.validate.mockReturnValue({
        isValid: false,
        exceptions: [new ArgumentContainsEmptyStringException()],
      });

      const result = await handler.execute(command);

      expect(commandValidator.validate).toHaveBeenCalledWith(command);
      expect(result.isErr()).toBe(true);
      expect(result.unwrapErr()).toContainEqual(
        new ArgumentContainsEmptyStringException(),
      );
    });

    it('should return an error if the business rules are not satisfied', async () => {
      commandValidator.validate.mockReturnValue({
        isValid: true,
        exceptions: [],
      });
      businessValidator.validate.mockResolvedValue({
        isValid: false,
        exceptions: [new ProductDomainException.QuantityIsNotEnough()],
      });

      const result = await handler.execute(command);

      expect(commandValidator.validate).toHaveBeenCalledWith(command);
      expect(businessValidator.validate).toHaveBeenCalledWith({
        name: new ProductNameValueObject(dto.name),
        quantity: new ProductQuantityValueObject(dto.quantity),
      });
      expect(result.isErr()).toBe(true);
      expect(result.unwrapErr()).toContainEqual(
        new ProductDomainException.QuantityIsNotEnough(),
      );
    });

    it('should call the domain service to export the products and return the result', async () => {
      commandValidator.validate.mockReturnValue({
        isValid: true,
        exceptions: [],
      });
      businessValidator.validate.mockResolvedValue({
        isValid: true,
        exceptions: [],
      });
      const event = new ProductsExportedDomainEvent({
        productId: new ID('123'),
        eventDetails: {
          name: new ProductNameValueObject(dto.name),
          quantity: new ProductQuantityValueObject(dto.quantity),
        },
      });
      domainService.exportProducts.mockResolvedValue(event);

      const result = await handler.execute(command);

      expect(commandValidator.validate).toHaveBeenCalledWith(command);
      expect(businessValidator.validate).toHaveBeenCalledWith({
        name: new ProductNameValueObject(dto.name),
        quantity: new ProductQuantityValueObject(dto.quantity),
      });
      expect(domainService.exportProducts).toHaveBeenCalledWith({
        name: new ProductNameValueObject(dto.name),
        quantity: new ProductQuantityValueObject(dto.quantity),
      });
      expect(result.isOk()).toBe(true);
      expect(result.unwrap()).toEqual(
        new ExportProductsResponseDto({
          name: dto.name,
          quantity: dto.quantity,
        }),
      );
    });
  });
});

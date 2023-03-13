import { ArgumentContainsEmptyStringException } from '@common-exceptions';
import { ProductCreatedDomainEvent } from '@product-domain-events';
import { ProductDomainException } from '@product-domain-exceptions';
import { ProductDomainService } from '@product-domain-services';
import {
  CreateProductBusinessValidator,
  CreateProductCommandValidator,
  CreateProductHandler,
  CreateProductMapper,
} from '@product-use-case/create-product/application-services';
import { CreateProductCommand } from '@product-use-case/create-product/application-services/dtos';
import { ProductNameValueObject } from '@product-value-object';
import { ID } from 'common-base-classes';
import { MockProxy, mock } from 'jest-mock-extended';

describe('CreateProductHandler', () => {
  let mapper: CreateProductMapper;
  let commandValidator: MockProxy<CreateProductCommandValidator>;
  let businessValidator: MockProxy<CreateProductBusinessValidator>;
  let domainServiceMock: MockProxy<ProductDomainService>;
  let handler: CreateProductHandler;

  beforeEach(() => {
    domainServiceMock = mock<ProductDomainService>();
    commandValidator = mock<CreateProductCommandValidator>();
    businessValidator = mock<CreateProductBusinessValidator>();
    mapper = new CreateProductMapper();
    handler = new CreateProductHandler(
      mapper,
      commandValidator,
      businessValidator,
      domainServiceMock,
    );
    jest.resetAllMocks();
  });

  it('should create a product successfully', async () => {
    // Arrange
    const command = new CreateProductCommand({
      name: 'Test Product',
    });
    commandValidator.validate.mockReturnValue({
      exceptions: [],
      isValid: true,
    });
    businessValidator.validate.mockResolvedValue({
      exceptions: [],
      isValid: true,
    });
    domainServiceMock.createProduct.mockResolvedValue(
      new ProductCreatedDomainEvent({
        productId: new ID('123'),
        eventDetails: {
          name: new ProductNameValueObject('Test Product'),
        },
      }),
    );

    // Act
    const result = await handler.execute(command);

    // Assert
    expect(result.isOk()).toBe(true);
  });

  it('should return error when command is invalid', async () => {
    // Arrange
    const command = new CreateProductCommand({
      name: '',
    });
    commandValidator.validate.mockReturnValue({
      exceptions: [new ArgumentContainsEmptyStringException()],
      isValid: false,
    });

    // Act
    const result = await handler.execute(command);

    // Assert
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr()).toEqual(
      expect.arrayContaining([new ArgumentContainsEmptyStringException()]),
    );
  });

  it('should return error when product already exists', async () => {
    // Arrange
    const command = new CreateProductCommand({
      name: 'Product A',
    });
    commandValidator.validate.mockReturnValue({
      exceptions: [],
      isValid: true,
    });
    businessValidator.validate.mockResolvedValue({
      exceptions: [new ProductDomainException.NameIsExist()],
      isValid: false,
    });

    // Act
    const result = await handler.execute(command);

    // Assert
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr()).toEqual(
      expect.arrayContaining([new ProductDomainException.NameIsExist()]),
    );
  });
});

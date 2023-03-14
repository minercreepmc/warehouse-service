import { CommandBus } from '@nestjs/cqrs';
import {
  CreateProductHttpController,
  CreateProductHttpResponse,
} from '@product-use-case/create-product/controllers/http';
import { Test } from '@nestjs/testing';
import { CreateProductCommand } from '@product-use-case/create-product/application-services/dtos';
import { ProductDomainException } from '@product-domain-exceptions';
import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Err, Ok } from 'oxide.ts';

describe('CreateProductHttpController', () => {
  let controller: CreateProductHttpController;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CreateProductHttpController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get(CreateProductHttpController);
    commandBus = moduleRef.get(CommandBus);
  });

  describe('create', () => {
    it('should create a product and return the response', async () => {
      const dto = {
        name: 'Product',
        price: 9.99,
      };
      const commandResult = Ok({
        id: '123',
        name: dto.name,
        price: dto.price,
      });
      jest.spyOn(commandBus, 'execute').mockResolvedValueOnce(commandResult);

      const response = await controller.execute(dto);

      expect(commandBus.execute).toHaveBeenCalledWith(
        new CreateProductCommand(dto),
      );
      expect(response).toEqual(
        new CreateProductHttpResponse({
          name: dto.name,
        }),
      );
    });

    it('should throw an UnprocessableEntityException if validation errors occurred', async () => {
      const dto = {
        name: 'Product',
        price: -9.99,
      };
      const validationErrors = Err([
        new ProductDomainException.QuantityIsNotValid(),
      ]);
      jest.spyOn(commandBus, 'execute').mockResolvedValueOnce(validationErrors);

      await expect(controller.execute(dto)).rejects.toThrowError(
        UnprocessableEntityException,
      );
      expect(commandBus.execute).toHaveBeenCalledWith(
        new CreateProductCommand(dto),
      );
    });

    it('should throw a ConflictException if business rule errors occurred', async () => {
      const dto = {
        name: 'Product',
        price: 9.99,
      };
      const businessErrors = Err([new ProductDomainException.NameIsExist()]);
      jest.spyOn(commandBus, 'execute').mockResolvedValueOnce(businessErrors);

      await expect(controller.execute(dto)).rejects.toThrowError(
        ConflictException,
      );
      expect(commandBus.execute).toHaveBeenCalledWith(
        new CreateProductCommand(dto),
      );
    });

    it('should throw an error if an unexpected error occurred', async () => {
      const dto = {
        name: 'Product',
        price: 9.99,
      };
      const unexpectedError = new Error('Unexpected error');
      jest.spyOn(commandBus, 'execute').mockRejectedValueOnce(unexpectedError);

      await expect(controller.execute(dto)).rejects.toThrowError(
        unexpectedError,
      );
      expect(commandBus.execute).toHaveBeenCalledWith(
        new CreateProductCommand(dto),
      );
    });
  });
});

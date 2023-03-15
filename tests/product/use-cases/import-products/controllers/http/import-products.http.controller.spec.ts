import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { ProductDomainException } from '@product-domain-exceptions';
import {
  ImportProductsCommand,
  ImportProductsResponseDto,
} from '@product-use-case/import-products/application-services/dtos';
import {
  ImportProductsHttpController,
  ImportProductsHttpRequest,
} from '@product-use-case/import-products/controllers/http';
import { Err, Ok } from 'oxide.ts';

describe('ImportProductsHttpController', () => {
  let controller: ImportProductsHttpController;
  let commandBus: CommandBus;
  let sampleProductName: string;
  let sampleProductQuantity: number;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ImportProductsHttpController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get(ImportProductsHttpController);
    commandBus = moduleRef.get(CommandBus);
    sampleProductName = 'Product 1';
    sampleProductQuantity = 5;
  });

  describe('execute', () => {
    it('should import products and return the response', async () => {
      const requestDto = new ImportProductsHttpRequest({
        name: sampleProductName,
        quantity: sampleProductQuantity,
      });
      const responseDto = new ImportProductsResponseDto({
        name: 'Product 1',
        quantity: 5,
      });
      const commandResult = Ok(responseDto);
      jest.spyOn(commandBus, 'execute').mockResolvedValueOnce(commandResult);

      const response = await controller.execute(requestDto);

      expect(commandBus.execute).toHaveBeenCalledWith(
        new ImportProductsCommand(requestDto),
      );
      expect(response).toEqual(commandResult.unwrap());
    });

    it('should throw an UnprocessableEntityException if validation errors occurred', async () => {
      const dto = new ImportProductsHttpRequest({
        name: '',
        quantity: sampleProductQuantity,
      });
      const validationExceptions = Err([
        new ProductDomainException.NameIsNotValid(),
      ]);
      jest
        .spyOn(commandBus, 'execute')
        .mockResolvedValueOnce(validationExceptions);

      await expect(controller.execute(dto)).rejects.toThrowError(
        UnprocessableEntityException,
      );
      expect(commandBus.execute).toHaveBeenCalledWith(
        new ImportProductsCommand(dto),
      );
    });

    it('should throw a ConflictException if business rule errors occurred', async () => {
      const dto = new ImportProductsHttpRequest({
        name: 'Whatever',
        quantity: 0,
      });
      const businessExceptions = Err([
        new ProductDomainException.NameIsNotExist(),
      ]);
      jest
        .spyOn(commandBus, 'execute')
        .mockResolvedValueOnce(businessExceptions);

      await expect(controller.execute(dto)).rejects.toThrowError(
        ConflictException,
      );
      expect(commandBus.execute).toHaveBeenCalledWith(
        new ImportProductsCommand(dto),
      );
    });

    it('should throw an error if an unexpected error occurred', async () => {
      const dto = new ImportProductsHttpRequest({
        name: 'Whatever',
        quantity: 0,
      });
      const unexpectedError = new Error('Unexpected error');
      jest.spyOn(commandBus, 'execute').mockRejectedValueOnce(unexpectedError);

      await expect(controller.execute(dto)).rejects.toThrowError(
        unexpectedError,
      );
      expect(commandBus.execute).toHaveBeenCalledWith(
        new ImportProductsCommand(dto),
      );
    });
  });
});

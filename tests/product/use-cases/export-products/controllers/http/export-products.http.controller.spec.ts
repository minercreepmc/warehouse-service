import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductDomainException } from '@product-domain-exceptions';
import {
  ExportProductsCommand,
  ExportProductsResponseDto,
} from '@product-use-case/export-products/application-services/dtos';
import {
  ExportProductsHttpController,
  ExportProductsHttpRequest,
} from '@product-use-case/export-products/controllers/http';
import { Err, Ok } from 'oxide.ts';

describe('ExportProductsHttpController', () => {
  let controller: ExportProductsHttpController;
  let commandBus: CommandBus;
  let sampleProductName: string;
  let sampleProductQuantity: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExportProductsHttpController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ExportProductsHttpController>(
      ExportProductsHttpController,
    );
    commandBus = module.get<CommandBus>(CommandBus);
    sampleProductName = 'Product 1';
    sampleProductQuantity = 10;
  });

  describe('execute', () => {
    it('should return the result of ExportProductsCommand', async () => {
      const requestDto: ExportProductsHttpRequest = {
        name: sampleProductName,
        quantity: sampleProductQuantity,
      };
      const responseDto = new ExportProductsResponseDto({
        name: sampleProductName,
        quantity: sampleProductQuantity,
      });
      const expectedResult = Ok(responseDto);
      jest.spyOn(commandBus, 'execute').mockResolvedValueOnce(expectedResult);

      const result = await controller.execute(requestDto);

      expect(commandBus.execute).toHaveBeenCalledWith(
        new ExportProductsCommand(requestDto),
      );
      expect(result).toEqual(expectedResult.unwrap());
    });

    it('should throw UnprocessableEntityException when validation errors occur', async () => {
      const requestDto: ExportProductsHttpRequest = {
        name: '',
        quantity: sampleProductQuantity,
      };
      const validationException = Err([
        new ProductDomainException.NameIsNotValid(),
      ]);
      jest
        .spyOn(commandBus, 'execute')
        .mockResolvedValueOnce(validationException);

      await expect(controller.execute(requestDto)).rejects.toThrowError(
        UnprocessableEntityException,
      );
      expect(commandBus.execute).toHaveBeenCalledWith(
        new ExportProductsCommand(requestDto),
      );
    });

    it('should throw ConflictException when business exceptions occur', async () => {
      const requestDto: ExportProductsHttpRequest = {
        name: 'Whatever',
        quantity: sampleProductQuantity,
      };
      const businessExceptions = Err([
        new ProductDomainException.NameIsNotExist(),
      ]);
      jest
        .spyOn(commandBus, 'execute')
        .mockResolvedValueOnce(businessExceptions);

      await expect(controller.execute(requestDto)).rejects.toThrowError(
        ConflictException,
      );
      expect(commandBus.execute).toHaveBeenCalledWith(
        new ExportProductsCommand(requestDto),
      );
    });

    it('should throw ExportProductsUseCaseExceptions when unexpected errors occur', async () => {
      const requestDto: ExportProductsHttpRequest = {
        name: 'Whatever',
        quantity: sampleProductQuantity,
      };
      const errors = new Error('Unexpected error');
      jest.spyOn(commandBus, 'execute').mockRejectedValueOnce(errors);

      await expect(controller.execute(requestDto)).rejects.toThrowError(errors);
      expect(commandBus.execute).toHaveBeenCalledWith(
        new ExportProductsCommand(requestDto),
      );
    });
  });
});

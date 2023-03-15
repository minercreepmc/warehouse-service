import { ConflictException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import {
  GetProductHttpController,
  GetProductHttpRequest,
  GetProductHttpResponse,
} from '@product-use-case/get-product/controllers/http';
import { GetProductQuery } from '@product-use-case/get-product/dtos';
import { ProductInfoException } from '@product-views/product-info';
import { Err, Ok } from 'oxide.ts';

describe('GetProductHttpController', () => {
  let controller: GetProductHttpController;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetProductHttpController],
      providers: [
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();
    queryBus = module.get<QueryBus>(QueryBus);
    controller = new GetProductHttpController(queryBus);
  });

  describe('execute', () => {
    it('should return the product info', async () => {
      // Arrange
      const productName = 'Product A';
      const queryResponse: Ok<GetProductHttpResponse> = Ok({
        id: '1',
        name: productName,
        quantity: 100,
      });
      jest
        .spyOn(queryBus, 'execute')
        .mockImplementationOnce(async () => queryResponse);

      const request: GetProductHttpRequest = { name: productName };

      // Act
      const response = await controller.execute(request);

      // Assert
      expect(queryBus.execute).toHaveBeenCalledTimes(1);
      expect(queryBus.execute).toHaveBeenCalledWith(
        new GetProductQuery(productName),
      );
      expect(response).toEqual(queryResponse.unwrap());
    });

    it('should throw ConflictException if ProductInfoLogicException is thrown', async () => {
      // Arrange
      const productName = 'Product A';
      const exceptionResult = Err(new ProductInfoException.NameIsNotExist());
      jest.spyOn(queryBus, 'execute').mockResolvedValue(exceptionResult);

      const request: GetProductHttpRequest = { name: productName };

      // Act
      const promise = controller.execute(request);

      // Assert
      await expect(promise).rejects.toThrow(ConflictException);
    });
  });
});

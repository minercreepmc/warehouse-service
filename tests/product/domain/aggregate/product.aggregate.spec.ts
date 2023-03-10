import {
  CreateProductAggegateOptions,
  ExportProductsAggregateOptions,
  ImportProductsAggregateOptions,
  ProductAggregate,
} from '@product-aggregate';
import {
  InitialProductState,
  ProductCreatedState,
  ProductInStockState,
  ProductOutOfStockState,
} from '@product-aggregate/states';
import { ProductDomainError } from '@product-domain-errors';
import {
  ProductCreatedDomainEvent,
  ProductsExportedDomainEvent,
  ProductsImportedDomainEvent,
} from '@product-domain-events';
import { ProductLoadEntity } from '@product-entities';
import {
  ProductNameValueObject,
  ProductQuantityValueObject,
} from '@product-value-object';
import { Queue } from 'typescript-collections';

describe('ProductAggregate', () => {
  let product: ProductAggregate;
  let createOptions: CreateProductAggegateOptions;
  let importFiveOptions: ImportProductsAggregateOptions;
  let exportTwoOptions: ExportProductsAggregateOptions;
  let exportThreeOptions: ExportProductsAggregateOptions;

  beforeEach(() => {
    product = new ProductAggregate();
    createOptions = {
      name: new ProductNameValueObject('Product Name'),
    };
    importFiveOptions = {
      name: new ProductNameValueObject('Product Name'),
      quantity: new ProductQuantityValueObject(5),
    };
    exportTwoOptions = {
      name: new ProductNameValueObject('Product Name'),
      quantity: new ProductQuantityValueObject(2),
    };
    exportThreeOptions = {
      name: new ProductNameValueObject('Product Name'),
      quantity: new ProductQuantityValueObject(3),
    };
  });

  describe('constructor', () => {
    it('should set the initial state to InitialProductState', () => {
      expect(product.state).toBeInstanceOf(InitialProductState);
    });
  });

  describe('createProduct', () => {
    it('should return a ProductCreatedDomainEvent', () => {
      const event = product.createProduct(createOptions);
      expect(event).toBeInstanceOf(ProductCreatedDomainEvent);
    });

    it('should call applyCreateProduct on the state', () => {
      const applyCreateProductSpy = jest.spyOn(
        product.state,
        'applyCreateProduct',
      );
      product.createProduct(createOptions);
      expect(applyCreateProductSpy).toHaveBeenCalledTimes(1);
    });
    it('should make the state become ProductCreatedState', () => {
      product.createProduct(createOptions);
      expect(product.state).toBeInstanceOf(ProductCreatedState);
    });
  });

  describe('importProducts', () => {
    it('should import the product and return ProductsImportedDomainEvent', () => {
      product.createProduct(createOptions);
      const event = product.importProducts(importFiveOptions);
      expect(event).toBeInstanceOf(ProductsImportedDomainEvent);
    });

    it('should call applyImportProducts on the state', () => {
      product.createProduct(createOptions);

      const applyImportProductsSpy = jest.spyOn(
        product.state,
        'applyImportProducts',
      );
      product.importProducts(importFiveOptions);
      expect(applyImportProductsSpy).toHaveBeenCalledTimes(1);
    });
    it('should make the state become ProductInStockState', () => {
      product.createProduct(createOptions);
      product.importProducts(importFiveOptions);
      expect(product.state).toBeInstanceOf(ProductInStockState);
    });
  });

  describe('exportProduct', () => {
    it('should return ProductExportedDomainEvent', () => {
      product.createProduct(createOptions);
      product.importProducts(importFiveOptions);
      const event = product.exportProducts(exportThreeOptions);
      expect(event).toBeInstanceOf(ProductsExportedDomainEvent);
    });
    it('should call applyExportProducts on the state', () => {
      product.createProduct(createOptions);
      product.importProducts(importFiveOptions);

      const applyExportProductsSpy = jest.spyOn(
        product.state,
        'applyExportProducts',
      );
      product.exportProducts(exportThreeOptions);
      expect(applyExportProductsSpy).toHaveBeenCalledTimes(1);
    });
    it('should make the state become ProductInStockState if the product still in stock', () => {
      product.createProduct(createOptions);
      product.importProducts(importFiveOptions);
      product.exportProducts(exportThreeOptions);
      expect(product.state).toBeInstanceOf(ProductInStockState);
    });
    it('should throw an QuantityIsNotEnough error if try to export product that quantity higher than the stock in the warehouse', () => {
      product.createProduct(createOptions);
      product.importProducts(importFiveOptions);
      product.exportProducts(exportThreeOptions);
      expect(() => product.exportProducts(exportThreeOptions)).toThrow(
        ProductDomainError.QuantityIsNotEnough,
      );
    });
    it('should make the state become ProductOutOfStockState if the product is out of stock', () => {
      product.createProduct(createOptions);
      product.importProducts(importFiveOptions);
      product.exportProducts(exportThreeOptions);
      product.exportProducts(exportTwoOptions);
      expect(product.state).toBeInstanceOf(ProductOutOfStockState);
    });
  });

  describe('name', () => {
    it('should get and set the name of the product', () => {
      const newName = 'New Product Name';
      product.setName(newName);
      expect(product.getNameValue()).toEqual(newName);
    });
  });

  describe('loads', () => {
    it('should get and set the loads of the product', () => {
      const newLoads = [];
      product.setLoads(newLoads);
      expect(product.loads).toEqual(new Queue<ProductLoadEntity>());
    });
  });

  describe('totalQuantity', () => {
    it('should get and set the total quantity of the product', () => {
      const newQuantity = 20;
      product.setTotalQuantity(newQuantity);
      expect(product.getTotalQuantityValue()).toEqual(newQuantity);
    });
  });
});

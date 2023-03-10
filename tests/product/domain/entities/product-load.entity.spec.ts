import { ProductLoadOptions, ProductLoadEntity } from '@product-entities';
import { ProductQuantityValueObject } from '@product-value-object';
import { ID } from 'common-base-classes';

describe('ProductLoadEntity', () => {
  const options: ProductLoadOptions = {
    productLoadBarcode: new ID('123'),
    productQuantity: new ProductQuantityValueObject(5),
    productId: new ID('456'),
  };
  let productLoadEntity: ProductLoadEntity;

  beforeEach(() => {
    productLoadEntity = new ProductLoadEntity(options);
  });

  describe('constructor', () => {
    it('should set the id and details', () => {
      expect(productLoadEntity.id.unpack()).toBe('123');
      expect(productLoadEntity.details).toEqual({
        productQuantity: new ProductQuantityValueObject(5),
        productId: new ID('456'),
      });
    });
  });

  describe('exportAmountAndReturnLeftOver', () => {
    it('should return 0 and update quantity when there is enough product to export', () => {
      const amountToExport = new ProductQuantityValueObject(3);
      const leftOver =
        productLoadEntity.exportAmountAndReturnLeftOver(amountToExport);
      expect(leftOver).toEqual(new ProductQuantityValueObject(0));
      expect(productLoadEntity.quantity).toEqual(
        new ProductQuantityValueObject(2),
      );
    });

    it('should return the amount to export and update quantity to 0 when there is not enough product to export', () => {
      const amountToExport = new ProductQuantityValueObject(6);
      const leftOver =
        productLoadEntity.exportAmountAndReturnLeftOver(amountToExport);
      expect(leftOver).toEqual(new ProductQuantityValueObject(1));
      expect(productLoadEntity.quantity).toEqual(
        new ProductQuantityValueObject(0),
      );
    });
  });

  describe('isEnoughToExport', () => {
    it('should return true when there is enough product to export', () => {
      const amountToExport = new ProductQuantityValueObject(3);
      expect(productLoadEntity.isEnoughToExport(amountToExport)).toBe(true);
    });

    it('should return false when there is not enough product to export', () => {
      const amountToExport = new ProductQuantityValueObject(7);
      expect(productLoadEntity.isEnoughToExport(amountToExport)).toBe(false);
    });
  });

  describe('exportEntireQuantity', () => {
    it('should set the quantity to 0', () => {
      productLoadEntity.exportEntireQuantity();
      expect(productLoadEntity.quantity).toEqual(
        new ProductQuantityValueObject(0),
      );
    });
  });

  describe('quantity', () => {
    it('should get the quantity', () => {
      expect(productLoadEntity.quantity).toEqual(
        new ProductQuantityValueObject(5),
      );
    });

    it('should set the quantity', () => {
      productLoadEntity.quantity = new ProductQuantityValueObject(10);
      expect(productLoadEntity.quantity).toEqual(
        new ProductQuantityValueObject(10),
      );
    });
  });
});

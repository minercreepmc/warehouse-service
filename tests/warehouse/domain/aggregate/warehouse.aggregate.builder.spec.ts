import { WarehouseAggregateBuilder } from '@warehouse-aggregate';

describe('WarehouseAggregateBuilder', () => {
  describe('build', () => {
    it('throws an error when the name is missing', () => {
      const builder = new warehouseaggregatebuilder();
      builder.withcapacity(100).withname('somename');

      expect(() => builder.build()).toThrow('Warehouse name is required');
    });
  });
});

import { Provider } from '@nestjs/common';
import { ProductEventStore } from '@product-database/event-store';
import { productEventStoreDiToken } from '@product-gateway/driven-ports';

export const productEventStoreProvider: Provider = {
  provide: productEventStoreDiToken,
  useClass: ProductEventStore,
};

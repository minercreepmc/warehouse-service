import { ProductImportedDomainEvent } from './product-imported';
import { ProductShippedDomainEvent } from './product-shipped';

export type ProductDomainEvent =
  | ProductImportedDomainEvent
  | ProductShippedDomainEvent;

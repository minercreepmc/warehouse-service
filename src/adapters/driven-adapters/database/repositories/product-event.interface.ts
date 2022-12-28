import { ProductAggregate } from "@aggregates/product";

export interface ProductEventsRebuilded {
  [key: string]: ProductAggregate
}

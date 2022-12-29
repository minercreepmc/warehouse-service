export interface ShipProductsResponseDtoData {
  readonly name: string;
  readonly quantity: number;
  readonly unit: string;
}

export class ShipProductsResponseDto {
  readonly message = 'Product shipped successfully';
  readonly name: string;
  readonly quantity: number;
  readonly unit: string;

  constructor(data: ShipProductsResponseDtoData) {
    this.name = data.name;
    this.quantity = data.quantity;
    this.unit = data.unit;
  }
}

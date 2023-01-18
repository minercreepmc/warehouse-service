export interface ShipProductsResponseDtoData {
  readonly name: string;
  readonly quantity: number;
}

export class ShipProductsResponseDto {
  readonly message = 'Product shipped successfully';
  readonly name: string;
  readonly quantity: number;

  constructor(data: ShipProductsResponseDtoData) {
    this.name = data.name;
    this.quantity = data.quantity;
  }
}

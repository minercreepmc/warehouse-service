export interface ExportProductsResponseDtoData {
  readonly name: string;
  readonly quantity: number;
}

export class ExportProductsResponseDto {
  readonly message = 'Product exported successfully';
  readonly name: string;
  readonly quantity: number;

  constructor(data: ExportProductsResponseDtoData) {
    this.name = data.name;
    this.quantity = data.quantity;
  }
}

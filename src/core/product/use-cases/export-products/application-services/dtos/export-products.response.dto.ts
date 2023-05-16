export interface ExportProductsResponseDtoData {
  readonly name: string;
  readonly quantity: number;
  readonly postponed: number;
  readonly isPostponed: boolean;
}

export class ExportProductsResponseDto {
  readonly message = 'Product exported successfully';
  readonly name: string;
  readonly quantity: number;
  readonly postponed: number;
  readonly isPostponed: boolean;

  constructor(data: ExportProductsResponseDtoData) {
    this.name = data.name;
    this.quantity = data.quantity || 0;
    this.postponed = data.postponed || 0;
    this.isPostponed = data.isPostponed || false;
  }
}

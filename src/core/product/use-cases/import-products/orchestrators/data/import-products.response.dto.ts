export interface ImportProductsResponsePropsDto {
  name: string;
  quantity: number;
}

export class ImportProductsResponseDto {
  readonly message = 'Product imported successfully';
  readonly name: string;
  readonly quantity: number;
  constructor(props: ImportProductsResponsePropsDto) {
    this.name = props.name;
    this.quantity = props.quantity;
  }
}

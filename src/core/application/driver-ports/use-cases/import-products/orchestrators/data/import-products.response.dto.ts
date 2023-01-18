export interface ImportProductsResponseDtoProps {
  name: string;
  quantity: number;
}

export class ImportProductsResponseDto {
  readonly message = 'Product imported successfully';
  readonly name: string;
  readonly quantity: number;
  constructor(props: ImportProductsResponseDtoProps) {
    this.name = props.name;
    this.quantity = props.quantity;
  }
}

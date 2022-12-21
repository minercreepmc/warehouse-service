export interface ImportProductsResponseDtoProps {
  name: string;
  quantity: number;
  unit: string;
}

export class ImportProductsResponseDto {
  readonly message = 'Product imported successfully';
  readonly name: string;
  readonly quantity: number;
  readonly unit: string;
  constructor(props: ImportProductsResponseDtoProps) {
    this.name = props.name;
    this.quantity = props.quantity;
    this.unit = props.unit;
  }
}

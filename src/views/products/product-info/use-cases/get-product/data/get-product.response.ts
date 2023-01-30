export class GetProductResponse {
  readonly name: string;
  readonly quantity: number;
  //readonly unit: string;
  constructor(data: GetProductResponse) {
    this.name = data.name;
    this.quantity = data.quantity;
    //this.unit = data.unit;
  }
}

export interface GetQualityOnHandResponseDtoData {
  readonly name: string;
  readonly quantity: number;
  //readonly unit: string;
}

export class GetQualityOnHandResponseDto {
  readonly name: string;
  readonly quantity: number;
  //readonly unit: string;
  constructor(data: GetQualityOnHandResponseDtoData) {
    this.name = data.name;
    this.quantity = data.quantity;
    //this.unit = data.unit;
  }
}

export class CreateWarehouseResponseDto {
  readonly name: string;
  readonly location: object;
  readonly capacity: object;

  constructor(params: CreateWarehouseResponseDto) {
    this.name = params.name;
    this.location = params.location;
    this.capacity = params.capacity;
  }
}

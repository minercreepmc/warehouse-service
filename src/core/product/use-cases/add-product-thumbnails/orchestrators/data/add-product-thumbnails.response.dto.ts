export class AddProductThumbnailsResponseDto {
  readonly paths: string[];
  readonly productName: string;
  constructor(params: AddProductThumbnailsResponseDto) {
    this.paths = params.paths;
    this.productName = params.productName;
  }
}

export class AddProductThumbnailsResponseDto {
  readonly thumbnailPaths: string[];
  readonly productName: string;
  constructor(params: AddProductThumbnailsResponseDto) {
    this.thumbnailPaths = params.thumbnailPaths;
    this.productName = params.productName;
  }
}

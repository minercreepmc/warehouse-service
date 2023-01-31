import { ApiProperty } from '@nestjs/swagger';

export class AddProductThumbnailsHttpRequest {
  @ApiProperty({
    description: 'Product name for adding thumbnails',
    example: 'Chicken',
  })
  productName: string;

  @ApiProperty({
    description: 'Thumbnails for product',
    example: ['https://picsum.photos/200/300'],
  })
  thumbnailPaths: string[];
}

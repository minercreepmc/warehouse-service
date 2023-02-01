import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddProductsThumbnailsCommand implements ICommand {
  @IsNotEmpty()
  @IsString({ each: true })
  readonly thumbnailPaths: string[];

  @IsNotEmpty()
  @IsString()
  readonly productName: string;
  constructor(dto: any) {
    this.thumbnailPaths = dto.thumbnailPaths;
    this.productName = dto.productName;
  }
}

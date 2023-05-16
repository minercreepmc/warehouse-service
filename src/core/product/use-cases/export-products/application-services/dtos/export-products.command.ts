import { ICommand } from '@nestjs/cqrs';

export class ExportProductsCommand implements ICommand {
  name: string;
  quantity?: number;
  postponed?: number;
  isPostponed?: boolean;

  constructor(dto: any) {
    this.name = dto.name;
    this.quantity = dto.quantity;
    this.postponed = dto.postponed;
    this.isPostponed = dto.isPostponed;
  }
}

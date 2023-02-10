import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminCommand implements ICommand {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(dto: any) {
    this.username = dto.username;
    this.password = dto.password;
  }
}

export class CreateAdminResponseDto {
  readonly username: string;

  constructor(dto: CreateAdminResponseDto) {
    this.username = dto.username;
  }
}

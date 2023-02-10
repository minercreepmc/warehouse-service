import * as bcrypt from 'bcrypt';

interface IRegisterData {
  username: string;
  password: string;
}

export class AuthService {
  async register(dto: IRegisterData) {
    const { password } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);

  }
}

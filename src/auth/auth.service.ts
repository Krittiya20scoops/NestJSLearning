import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: username, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      }),
    };
  }
}

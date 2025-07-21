import { User } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from './Interfaces/token-paylod.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const tokenPayload: TokenPayload = { userId: user.id };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        this.configService.get<number>('JWT_EXPIRATION_TIME', 3600),
    );
    const token = await this.jwtService.signAsync(tokenPayload);
    response.cookie('Authentication', token, { httpOnly: true, expires });

    return token;
  }

  getHello(): string {
    return 'Hello World!';
  }
}

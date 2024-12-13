import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly JwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async genereJwtToken(user) {
    const payload = {user}
    return this.JwtService.sign(payload, {
      secret: this.configService.get('jwt_secret'),
      expiresIn: this.configService.get('jwt_expire')
    })
  }

}

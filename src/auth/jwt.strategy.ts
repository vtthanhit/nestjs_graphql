import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as path from 'path';
import * as fs from 'fs';

import { UsersService } from './../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    const publicPath = path.resolve(__dirname, `${process.env.JWT_PUBLIC_KEY}`);
    const publicKey = fs.readFileSync(publicPath, 'utf-8');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: publicKey,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne(payload.payload.username);
    const { password, ...result } = user;
    return result;
  }
}

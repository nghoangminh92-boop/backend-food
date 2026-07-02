import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// @ts-ignore
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET || 'your-secret-key',
    });
  }

validate(payload: any) {
  return { userId: payload.sub, email: payload.email, fullName: payload.fullName, avatar: payload.avatar, role: payload.role };
}
}

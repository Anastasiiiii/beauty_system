import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../token-payload.interface';
import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../users/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // By default, retrieve the token from cookies
          let token: string = request.cookies?.Authentication;

          // If it's not present there, seek for it in headers
          if (!token) {
            token = request.headers?.authorization;

            // If this token is present, trim off the Bearer thing
            if (token) {
              token = token.replace('Bearer', '').trim();
            }
          }

          // Last chance: "token" request field
          if (!token) {
            token = request.body?.token;
          }

          return token;
        },
      ]),
      secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    return this.userModel.findOne({ _id: payload.userId }).exec();
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: Buffer.from(
        configService.get<string>('JWT_SECRET_KEY'),
        'base64',
      ),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      signOptions: { algorithm: 'HS512' },
    });
  }

  async validate(payload) {
    const { sub } = payload;
    const member: Member = await this.memberRepository.findOne({
      where: { username: sub },
    });
    if (!member) {
      throw new UnauthorizedException();
    }

    return member;
  }
}

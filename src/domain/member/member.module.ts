import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, // 추가된 모듈
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { algorithm: 'HS512' },
      }),
      inject: [ConfigService], // 추가된 inject
    }),
    TypeOrmModule.forFeature([Member]),
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class MemberModule {}

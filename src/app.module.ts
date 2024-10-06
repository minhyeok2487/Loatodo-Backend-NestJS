import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { MemberModule } from './member/member.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = process.env.NODE_ENV === 'production';
        return {
          type: 'mysql',
          host: configService.get(
            isProduction ? 'DATABASE_PROD_URL' : 'DATABASE_DEV_URL',
          ),
          port: Number(
            configService.get(
              isProduction ? 'DATABASE_PROD_PORT' : 'DATABASE_DEV_PORT',
            ),
          ),
          database: configService.get(
            isProduction ? 'DATABASE_PROD_NAME' : 'DATABASE_DEV_NAME',
          ),
          username: configService.get(
            isProduction ? 'DATABASE_PROD_USERNAME' : 'DATABASE_DEV_USERNAME',
          ),
          password: configService.get(
            isProduction ? 'DATABASE_PROD_PASSWORD' : 'DATABASE_DEV_PASSWORD',
          ),
          entities: [path.join(__dirname, '**/*.entity.{js, ts}')],
          synchronize: false,
          logging: !isProduction, // 개발 환경에서는 true, 배포 환경에서는 false
          timezone: 'KST',
        };
      },
    }),
    CommentsModule,
    MemberModule,
  ],
  controllers: [],
})
export class AppModule {}

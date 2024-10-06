import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { CommentsRepository } from './comments.repository';
import { Notification } from '../notification/notification.entity';
import { NotificationRepository } from '../notification/notification.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Comments, Notification])],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, NotificationRepository],
})
export class CommentsModule {}

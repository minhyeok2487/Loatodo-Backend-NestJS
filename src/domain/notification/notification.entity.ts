import { BaseTimeEntity } from 'src/global/basetime.entity';
import { Member } from 'src/domain/member/entities/member.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Notification extends BaseTimeEntity {
  @PrimaryGeneratedColumn({ name: 'notification_id', type: 'bigint' })
  id: string;

  @Column()
  content: string;

  @Column({ name: 'notification_type' })
  notificationType: NotificationType;

  @Column({ name: 'is_read' })
  isRead: boolean;

  @Column({ name: 'board_id', type: 'bigint' })
  boardId?: string = '0';

  @Column({ name: 'comment_id', type: 'bigint' })
  commentId?: string = '0';

  @Column({ name: 'friend_id', type: 'bigint' })
  friendId?: string = '0';

  @Column({ name: 'friend_username' })
  friendUsername?: string = null;

  @Column({ name: 'friend_character_name' })
  friendCharacterName?: string = null;

  @ManyToOne(() => Member, (member) => member.notifications, { eager: false })
  @JoinColumn({ name: 'member_id' })
  receiver: Member;
}

export enum NotificationType {
  BOARD = 'BOARD',
  COMMENT = 'COMMENT',
  FRIEND = 'FRIEND',
}

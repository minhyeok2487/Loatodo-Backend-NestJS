import { Comments } from 'src/domain/comments/comments.entity';
import { Notification } from 'src/domain/notification/notification.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn({ name: 'member_id', type: 'bigint' })
  id: string;

  @Column({ unique: true })
  username: string;

  //   @Column()
  //   apiKey: string;

  //   @Column()
  //   authProvider: string;

  //   @Column()
  //   accessKey: string;

  //   @Column()
  //   password: string;

  //   @Column()
  //   mainCharacter: string;

  @Column()
  role: Role;

  @OneToMany(() => Comments, (comments) => comments.member, { eager: false })
  comments: Comments[];

  @OneToMany(() => Notification, (notification) => notification.receiver, { eager: false })
  notifications: Notification[];
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  PUBLISHER = 'PUBLISHER',
}

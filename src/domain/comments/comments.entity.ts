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
export class Comments extends BaseTimeEntity {
  @PrimaryGeneratedColumn({ name: 'comments_id', type: 'bigint' })
  id: string;

  @Column({ length: 1000 })
  body: string;

  @ManyToOne(() => Member, (member) => member.comments, { eager: false })
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @Column({ name: 'parent_id', type: 'bigint' })
  parentId: string;
}

import { Member } from 'src/member/entities/member.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn({ name: 'comments_id', type: 'bigint' })
  id: string;

  @Column({ length: 1000 })
  body: string;

  @ManyToOne(() => Member, (member) => member.comments, { eager: false })
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @Column({ name: 'parent_id', type: 'bigint' })
  parentId: string;

  @CreateDateColumn({
    name: 'created_date',
    type: 'datetime',
    precision: 6,
    update: false,
  })
  createdDate: Date;

  @UpdateDateColumn({
    name: 'last_modified_date',
    type: 'datetime',
    precision: 6,
  })
  lastModifiedDate: Date;
}

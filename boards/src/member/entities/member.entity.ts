import { Comments } from 'src/comments/entities/comments.entity';
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
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  PUBLISHER = 'PUBLISHER',
}

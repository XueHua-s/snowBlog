import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: '' })
  nickName: string;
  @Column({ type: 'longtext', nullable: true })
  avatar: string;
  @Column({ default: '' })
  signature: string;
  @Column({ default: '' })
  homepage: string;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  @CreateDateColumn()
  createdTime: Date;
  @UpdateDateColumn()
  updatedTime: Date;
}

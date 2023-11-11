import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: '' })
  nickName: string;
  @Column({ default: '' })
  signature: string;
  @Column({ default: '' })
  homepage: string;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}

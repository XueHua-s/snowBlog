import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'longtext', nullable: true })
  commentContent: string;
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn()
  user: number;
  @Column({ type: 'bigint', default: new Date().getTime() })
  createdTime: number;
}

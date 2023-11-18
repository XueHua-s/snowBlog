import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from '../../user/entities/user.entity';
@Entity()
export class Friendship {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text' })
  icon: string;
  @Column()
  name: string;
  @Column()
  link: string;
  @ManyToOne(() => User, (user) => user.friendships)
  @JoinColumn()
  user: User;
  @CreateDateColumn()
  createdTime: Date;
  @UpdateDateColumn()
  updateTime: Date;
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  action: string;
  @Column()
  record: string;
  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn({
    foreignKeyConstraintName: '日志创建用户',
  })
  user: User;
}

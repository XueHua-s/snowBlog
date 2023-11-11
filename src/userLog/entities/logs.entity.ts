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
  path: string;
  @Column()
  method: string;
  @Column()
  data: string;
  @Column()
  result: number;
  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn({
    foreignKeyConstraintName: '日志创建用户',
  })
  user: User;
}

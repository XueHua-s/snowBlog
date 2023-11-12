import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Classify } from './classify.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ type: 'longtext', select: false })
  content: string;
  @Column({ type: 'longtext' })
  cover: string;
  @ManyToOne(() => Classify, (classify) => classify.articles)
  @JoinColumn()
  classify: Partial<Classify>;
  @Column({ default: new Date().getTime().toString() })
  createdTime: string;
  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn()
  user: Partial<User>;
}

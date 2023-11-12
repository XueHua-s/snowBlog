import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Classify } from './classify.entity';
import { Review } from '../../review/entities/review.entity';

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
  @Column({ default: new Date().getTime(), type: 'bigint' })
  createdTime: number;
  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn()
  user: Partial<User>;
  @OneToMany(() => Review, (review) => review.article)
  reviews: Review[];
}

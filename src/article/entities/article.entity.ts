import {
  Column, CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Classify } from '../../classify/entities/classify.entity';
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
  @Column({ type: 'longtext', nullable: true })
  cover: string;
  @ManyToOne(() => Classify, (classify) => classify.articles)
  @JoinColumn()
  classify: Partial<Classify>;
  @CreateDateColumn()
  createdTime: Date;
  @UpdateDateColumn()
  updateTime: Date;
  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn()
  user: Partial<User>;
  @OneToMany(() => Review, (review) => review.article)
  reviews: Review[];
}

import {
  BeforeInsert,
  Column, CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from '../../user/entities/user.entity';
import { Article } from '../../article/entities/article.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'longtext', nullable: true })
  commentContent: string;
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn()
  user: User;
  @ManyToOne(() => Article, (article) => article.reviews)
  @JoinColumn()
  article: Article;
  @CreateDateColumn()
  createdTime: Date;
}

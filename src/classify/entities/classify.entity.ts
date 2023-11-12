import {
  Column, CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { Article } from '../../article/entities/article.entity';

@Entity()
export class Classify {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: 'longtext', nullable: true })
  icon: string;
  @Column({ default: -1 })
  parentId: number;
  @OneToMany(() => Article, (article) => article.classify)
  articles: Article[];
  @CreateDateColumn()
  createdTime: Date;
  @UpdateDateColumn()
  updateTime: Date;
}

import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./article.entity";

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
  @Column({ type: 'bigint', default: new Date().getTime() })
  createdTime: number;
}

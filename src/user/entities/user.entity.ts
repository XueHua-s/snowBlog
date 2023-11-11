import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Logs } from '../../userLog/entities/logs.entity';
import { Article } from "../../article/entities/article.entity";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column({ select: false })
  password: string;
  @Column({ default: new Date().getTime().toString() })
  createdTime: string;
  @OneToMany(() => Logs, (log) => log.user)
  logs: Logs[];
  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];
}

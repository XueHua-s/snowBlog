import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Logs } from '../../userLog/entities/logs.entity';
import { Article } from "../../article/entities/article.entity";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ type: 'bigint', default: new Date().getTime() })
  createdTime: number;
  @OneToMany(() => Logs, (log) => log.user)
  logs: Logs[];
  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];
}

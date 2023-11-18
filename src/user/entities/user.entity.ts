import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Logs } from '../../userLog/entities/logs.entity';
import { Article } from '../../article/entities/article.entity';
import { Profile } from './profile.entity';
import { Review } from '../../review/entities/review.entity';
import { Role } from '../../roles/entities/role.entity';
import { Friendship } from '../../friendship/entities/friendship.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column({ select: false })
  password: string;
  @CreateDateColumn()
  createdTime: Date;
  @OneToMany(() => Logs, (log) => log.user)
  logs: Logs[];
  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];
  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
  @OneToMany(() => Friendship, (friendship) => friendship.user)
  friendships: Friendship[];
}

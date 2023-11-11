import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Logs } from '../../userLog/entities/logs.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column({ select: false })
  password: string;
  @OneToMany(() => Logs, (log) => log.user)
  logs: Logs[];
}

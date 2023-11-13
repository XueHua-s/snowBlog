import {
  Column,
  CreateDateColumn,
  Entity, JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from '../../user/entities/user.entity';
import { Permission } from "../../permission/entities/permission.entity";

@Entity()
export class Role {
  @PrimaryColumn()
  id: number;
  @Column()
  roleName: string;
  @Column({ default: '' })
  roleCode: string;
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
  @CreateDateColumn()
  createdTime: Date;
  @UpdateDateColumn()
  updateTime: Date;
  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  permissions: Permission[];
}

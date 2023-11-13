import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";

@Entity()
export class Permission {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  code: string;
  // 默认为数据权限
  @Column({
    default: 1,
  })
  type: number;
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}

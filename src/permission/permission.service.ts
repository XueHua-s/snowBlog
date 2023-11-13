import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/entities/role.entity';
import { Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';
import { Permission } from './entities/permission.entity';
import { defineAbility } from '@casl/ability';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private roleService: RolesService,
  ) {}
  // 通过角色id获取权限
  async getPermissionByRole(roleId: number) {
    const data = await this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .where('role.id = :roleId', {
        roleId,
      })
      .getOne();
    if (data) {
      return data.permissions.map((i) => ({ ...i }));
    }
    return null;
  }
  // 获取用户所有权限
  async exampleQueryAllPermissionsOfAUser(
    userId: number,
  ): Promise<Permission[]> {
    const userAllMenu = await this.roleService.getUserRoles(userId);
    const allPermisson = [];
    const promiseAll = [];
    const hash = {};
    for (const role of userAllMenu) {
      promiseAll.push(
        this.getPermissionByRole(role.id).then((data) => {
          for (const permission of data) {
            // 哈希散列表去重
            if (!hash[permission.id]) {
              allPermisson.push(permission);
            }
          }
        }),
      );
    }
    await Promise.all(promiseAll);
    if (allPermisson) {
      return allPermisson.map((i) => ({ ...i }));
    }
    return [];
  }
  // 导出用户权限实体模块
  async authenticationExpose(userId: number) {
    const allPermission = await this.exampleQueryAllPermissionsOfAUser(userId);
    const ablity = defineAbility((can) => {
      for (const permission of allPermission) {
        can(permission.code, userId.toString());
      }
    });
    return ablity;
  }
}

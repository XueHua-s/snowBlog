import { HttpException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { User } from '../user/entities/user.entity';
import { FindRoleListDto } from './dto/find-role-list.dto';
import { FindRoleUsersDto } from './dto/find-role-users.dto';
import { AllotRolePermissionDto } from './dto/allot-role-permission.dto';
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  // 通过用户id获取用户菜单
  async getUserRoles(userId: number) {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.id = :userId', {
        userId,
      })
      .getOne();
    if (data) {
      return data.roles.map((item) => ({ ...item }));
    }
    return null;
  }
  // 分页查询角色表
  async getRoleQueryPage(query: FindRoleListDto) {
    const findBuilder = this.roleRepository.createQueryBuilder('role');
    if (query.roleName) {
      findBuilder.where('role.roleName LIKE :roleName', {
        roleName: query.roleName,
      });
    }
    const data = await findBuilder
      .offset(((query.current || 1) - 1) * (query.size || 10))
      .limit(query.size || 10)
      .getMany();
    if (data) {
      return data.map((i) => ({
        ...i,
      }));
    }
    return [];
  }
  // 查询角色下所有用户
  async findRoleAllUser(query: FindRoleUsersDto, userId: number) {
    const data = await this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.users', 'users')
      .where('role.id = :id', {
        id: query.roleId,
      })
      .offset(((query.current || 1) - 1) * (query.size || 10))
      .limit(query.size || 10)
      .getMany();
    if (data) {
      return data.map((i) => ({ ...i }));
    }
    return [];
  }
  // 保存角色权限
  async saveRolePermission(params: AllotRolePermissionDto, userId: number) {
    const data = await this.roleRepository.save(params);
    if (data) {
      return {
        ...data,
      };
    }
    return null;
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Profile } from './entities/profile.entity';
import { UserProfileDto } from './dto/userProfile.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRespository: Repository<Profile>,
  ) {}
  // 注册用户方法
  async registerUser(user: Partial<User>) {
    if (!/^[a-zA-Z0-9]+$/.test(user.username)) {
      throw new HttpException('用户名只能为数字或英文', 202);
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/.test(
        user.password,
      )
    ) {
      throw new HttpException('密码为大小写字母, 数字, 字符: = . *混合', 202);
    }
    const hashPassword = await argon2.hash(user.password);
    // 判断用户是否存在（避免数据库唯一索引报错给用户，友好提示）
    const isHaveUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', {
        username: user.username,
      })
      .getOne();
    if (!isHaveUser?.id) {
      throw new HttpException('该用户已存在', 202);
    }
    return await this.userRepository.save({
      username: user.username,
      password: hashPassword,
    });
  }
  // 验证用户密码方法
  async verifyUserAndPassword(user: Partial<User>) {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', {
        username: user.username,
      })
      .addSelect('user.password')
      .getOne();
    if (argon2.verify(data.password, user.password)) {
      return data;
    }
    return null;
  }
  // 通过ID获取用户信息方法
  async getUserInfoById(userId: number): Promise<User> {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('profile.userId = :userId', {
        userId,
      })
      .getOne();
    return {
      ...data,
      profile: {
        ...data.profile,
      },
    };
  }
  // 更新用户关联信息(传user实体)
  async updateUserInfo(proFile: UserProfileDto) {
    if (!/^(http|https):\/\//.test(proFile.homepage)) {
      throw new HttpException('主页不是一个http或https', 202);
    }
    // 获取用户信息实例
    const proFileDetail = await this.getUserInfoById(proFile.user.id);
    if (proFileDetail) {
      // 如果有用户资料进行保存更新
      const data = await this.profileRespository.save({
        ...proFileDetail.profile,
        ...proFile,
      });
      if (data) {
        return await this.getUserInfoById(proFile.user.id);
      }
      return null;
    } else {
      // 没有进行数据插入
      const data = await this.profileRespository.insert({
        ...proFile,
      });
      if (data) {
        return await this.getUserInfoById(proFile.user.id);
      }
      return null;
    }
  }
  // 删除用户(鉴权有无权限)
  async removeUser() {}
  // 用户列表(鉴权有无权限)
  async findUserList() {}
}

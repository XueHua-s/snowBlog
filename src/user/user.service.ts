import { Injectable } from '@nestjs/common';
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
    const hashPassword = await argon2.hash(user.password);
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
  async getUserInfoById(userId: number) {
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
  // 更新用户关联信息(传userId)
  async updateUserInfo(proFile: UserProfileDto) {
    // 获取用户信息实例
    const proFileDetail = await this.getUserInfoById(proFile.userId);
    if (proFileDetail) {
      // 如果有用户资料进行保存更新
      const data = await this.profileRespository.save({
        ...proFileDetail.profile,
        ...proFile,
        userId: undefined,
        user: {
          id: proFile.userId,
        },
      });
      if (data) {
        return await this.getUserInfoById(proFile.userId);
      }
      return null;
    } else {
      // 没有进行数据插入
      const data = await this.profileRespository.insert({
        ...proFile,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        userId: undefined,
        user: {
          id: proFile.userId,
        },
      });
      if (data) {
        return await this.getUserInfoById(proFile.userId);
      }
      return null;
    }
  }
  // 删除用户(鉴权有无权限)
  async removeUser() {}
  // 用户列表(鉴权有无权限)
  async findUserList() {}
}

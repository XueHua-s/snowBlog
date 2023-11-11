import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async registerUser(user: Partial<User>) {
    const hashPassword = await argon2.hash(user.password);
    return await this.userRepository.save({
      username: user.username,
      password: hashPassword,
    });
  }
  async verifyUserAndPassword(user: Partial<User>) {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('password')
      .where('user.username = :username', {
        username: user.username,
      })
      .getOne();
    if (argon2.verify(data.password, user.password)) {
      return data;
    }
    return null;
  }
}

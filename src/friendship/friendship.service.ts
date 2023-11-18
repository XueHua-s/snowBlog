import { HttpException, Injectable } from '@nestjs/common';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friendship } from './entities/friendship.entity';
import { PermissionService } from '../permission/permission.service';
import { QueryFriendshipDto } from './dto/query-friendship.dto';

@Injectable()
export class FriendshipService {
  constructor(
    @InjectRepository(Friendship)
    private readonly friendshipRepository: Repository<Friendship>,
    private readonly permissionService: PermissionService,
  ) {}
  // 新增
  async friendship(createFriendshipDto: CreateFriendshipDto) {
    // 鉴权
    const ability = await this.permissionService.authenticationExpose(
      createFriendshipDto.user.id,
    );
    if (!ability.can('friendship', createFriendshipDto.user.id.toString())) {
      throw new HttpException('您没有管理友链的权限', 202);
    }
    const data = await this.friendshipRepository.save(createFriendshipDto);
    if (data) {
      return data;
    }
    return null;
  }
  // 分页查询
  async getQueryPageFriendship(queryFriendshipDto: QueryFriendshipDto) {
    const findBuilder =
      this.friendshipRepository.createQueryBuilder('friendship');
    if (queryFriendshipDto.name) {
      findBuilder.where('friendship.name LIKE :name', {
        name: queryFriendshipDto.name,
      });
    }
    const data = await findBuilder
      .offset(
        ((queryFriendshipDto.current || 1) - 1) *
          (queryFriendshipDto.size || 10),
      )
      .limit(queryFriendshipDto.size || 10)
      .getMany();
    const total = await findBuilder.getCount();
    return {
      records: JSON.parse(JSON.stringify(data)),
      total: total,
    };
  }
  // 删除
  async delFriendship(id: number, userId: number) {
    // 鉴权
    const ability = await this.permissionService.authenticationExpose(userId);
    if (!ability.can('friendship', userId.toString())) {
      throw new HttpException('您没有管理友链的权限', 202);
    }
    const data = await this.friendshipRepository.remove({
      id: id,
    } as Friendship);
    if (data) {
      return data.id;
    }
    return null;
  }
}

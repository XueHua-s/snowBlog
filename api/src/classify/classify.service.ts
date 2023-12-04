import { HttpException, Injectable, Post } from '@nestjs/common';
import { FindClassifyThreeDto } from '../article/dto/findClassifyThree.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Classify } from './entities/classify.entity';
import { Repository } from 'typeorm';
import { CreateClassifyDto } from './dto/create-classify.dto';
import { PermissionService } from '../permission/permission.service';
import { UpdateClassifyDto } from './dto/update-classify.dto';
import { LogService } from '../userLog/log.service';
@Injectable()
export class ClassifyService {
  constructor(
    @InjectRepository(Classify)
    private readonly classifyRepository: Repository<Classify>,
    private readonly permissionService: PermissionService,
    private readonly logService: LogService,
  ) {}
  // 查询树状分类列表
  async getClassifyThree(params: FindClassifyThreeDto) {
    const createBuilder = this.classifyRepository
      .createQueryBuilder('classify')
      .where('classify.parentId = :id', {
        id: -1,
      });
    if (params.name) {
      createBuilder.andWhere('classify.name = :name', {
        name: params.name,
      });
    }
    const data = await createBuilder
      .offset(((params.current || 1) - 1) * (params.size || 10))
      .limit(params.size || 10)
      .getMany();
    const total = await createBuilder.getCount();
    // 子查询递归
    const promiseAll = [];
    for (const item of data) {
      promiseAll.push(
        this.getsTheCategoriesAssociatedWithTheCategory(item.id).then((res) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          item.children = res;
        }),
      );
    }
    await Promise.all(promiseAll);
    if (data) {
      return {
        records: JSON.parse(JSON.stringify(data)),
        total: total,
      };
    }
    return null;
  }
  // 获取父分类下的子分类
  async getsTheCategoriesAssociatedWithTheCategory(classId: number) {
    const data = await this.classifyRepository
      .createQueryBuilder('classify')
      .andWhere('classify.parentId = :parentId', {
        parentId: classId,
      })
      .getMany();
    if (data) {
      const promieAll = [];
      for (const item of data) {
        promieAll.push(
          this.getsTheCategoriesAssociatedWithTheCategory(item.id).then(
            (res) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              item.children = res;
            },
          ),
        );
      }
      await Promise.all(promieAll);
      return JSON.parse(JSON.stringify(data));
    }
    return null;
  }
  // 通过分类id获取分类实例
  async getClassify(classId: number) {
    const data = await this.classifyRepository
      .createQueryBuilder('classify')
      .where('classify.id = :id', {
        id: classId,
      })
      .getOne();
    if (data) {
      return data;
    }
  }
  // 新建分类
  async addClassify(params: CreateClassifyDto, userId: number) {
    const ablity = await this.permissionService.authenticationExpose(userId);
    if (!ablity.can('classify', userId.toString)) {
      return new HttpException('您没权限设置分类', 403);
    }
    const data = await this.classifyRepository.save(params);
    if (data) {
      if (params.id) {
        await this.logService.addLog({
          action: '添加分类',
          record: `添加的id为${data.id}`,
          user: {
            id: userId,
          },
        });
      } else {
        await this.logService.addLog({
          action: '更新分类',
          record: `添加的id为${data.id}, ${params.name}变成了${data.name}`,
          user: {
            id: userId,
          },
        });
      }
      return data;
    }
  }
}

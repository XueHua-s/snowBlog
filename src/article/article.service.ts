import { Body, HttpException, Injectable, Post } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { Classify } from './entities/classify.entity';
import { QueryArticlesDto } from './dto/queryArticles.dto';
import { UserService } from '../user/user.service';
import { FindClassifyThreeDto } from './dto/findClassifyThree.dto';
import { orderBy } from "lodash";
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Classify)
    private readonly classifyRepository: Repository<Classify>,
    private userService: UserService,
  ) {}
  // 创建文章
  async createArticle(params: CreateArticleDto) {
    const createBuildParams = {
      ...params,
      classify: undefined,
    };
    // 分类实体
    const classifyEntity = await this.getClassify(params.classifyId);
    if (classifyEntity) {
      if (classifyEntity.parentId === -1) {
        throw new HttpException('文章分类不能为一级分类', 500);
      }
    }
    const data = await this.articleRepository.insert({
      ...createBuildParams,
      classify: classifyEntity || null,
      user: {
        id: params.userId,
      },
    });
    if (data) {
      const rawId = data.raw.insertId;
      return rawId;
    }
    return null;
  }
  // 通过文章id获取文章详情
  async getArticleDetail(id: number) {
    const data = await this.articleRepository
      .createQueryBuilder('article')
      .addSelect('article.content', 'content')
      .leftJoinAndSelect('article.user', 'user')
      .leftJoinAndSelect('article.classify', 'classify')
      .where('article.id = :id', {
        id,
      })
      .getOne();
    if (data) {
      const userProfile = await this.userService.getUserInfoById(data.user.id);
      data.user = JSON.parse(JSON.stringify(userProfile));
      return data;
    }
    return null;
  }
  // 通过分类id获取分类信息
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
  // 分页查询文章列表
  async getArticles(params: QueryArticlesDto) {
    const createBuilder = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user')
      .leftJoinAndSelect('article.classify', 'classify')
      .orderBy('desc');
    if (params.title) {
      createBuilder.where('article.title LIKE :title', {
        title: params.title,
      });
    }
    if (params.classifyId) {
      createBuilder.andWhere('classify.id = :id', {
        id: params.classifyId,
      });
    }
    const total = await createBuilder.getCount();
    const data = await createBuilder
      .offset(((params.current || 1) - 1) * (params.size || 10))
      .limit(params.size || 10)
      .getMany();
    if (total > 0) {
      // 子查询查用户资料
      const resPromise = [];
      for (const article of data) {
        resPromise.push(
          this.userService
            .getUserInfoById(article.user.id)
            .then((profile: any) => {
              article.user = profile;
            }),
        );
      }
      await Promise.all(resPromise);
      return {
        records: data.map((article) => ({
          ...article,
          user: {
            ...article.user,
          },
          classify: article.classify && {
            ...article.classify,
          },
        })),
        total: total,
      };
    }
    return null;
  }
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
}

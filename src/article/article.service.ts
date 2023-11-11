import { HttpException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { Classify } from './entities/classify.entity';
import { QueryArticlesDto } from './dto/queryArticles.dto';
import { UserService } from "../user/user.service";
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
      const userProfile = await this.userService.getUserInfoById(data.user.id)
      data.user = {
        ...data.user,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        userProfile,
      }
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
      .leftJoinAndSelect('article.user', 'user');
    if (params.title) {
      createBuilder.where('article.title LIKE :title', {
        title: params.title,
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              article.user.profile = profile;
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
        })),
        total: total,
      };
    }
    return null;
  }
}

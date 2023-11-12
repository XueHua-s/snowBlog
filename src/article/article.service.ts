import { HttpException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { QueryArticlesDto } from './dto/queryArticles.dto';
import { UserService } from '../user/user.service';
import { ClassifyService } from '../classify/classify.service';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private userService: UserService,
    private classifyService: ClassifyService,
  ) {}
  // 创建文章
  async createArticle(params: CreateArticleDto) {
    // 分类实体
    const classifyEntity = await this.classifyService.getClassify(
      params.classifyId,
    );
    if (classifyEntity) {
      if (classifyEntity.parentId === -1) {
        throw new HttpException('文章分类不能为一级分类', 500);
      }
    }
    const data = await this.articleRepository.insert({
      ...params,
      classify: classifyEntity,
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
      .select([
        'article.id',
        'article.title',
        'article.content',
        'article.createdTime',
        'article.description',
        'article.updateTime',
      ])
      .leftJoinAndSelect('article.user', 'user')
      .leftJoinAndSelect('article.classify', 'classify')
      .where('article.id = :id', {
        id,
      })
      .getOne();
    if (data) {
      const userProfile = await this.userService.getUserInfoById(data.user.id);
      data.user = userProfile;
      return JSON.parse(JSON.stringify(data));
    }
    return null;
  }
  // 分页查询文章列表
  async getArticles(params: QueryArticlesDto) {
    const createBuilder = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user')
      .leftJoinAndSelect('article.classify', 'classify')
      .orderBy('article.createdTime', params.orderBy === '2' ? 'ASC' : 'DESC');
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
}

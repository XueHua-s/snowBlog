import { HttpException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { ArticleCheckReviewPageFindDto } from './dto/article-check-review-page-find.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { ArticleService } from '../article/article.service';
@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private userService: UserService,
    private articleService: ArticleService,
  ) {}
  // 创建评论，需要包含用户实体
  async createReview(params: CreateReviewDto) {
    const data = await this.reviewRepository.save({
      commentContent: params.commentContent,
      user: params.user,
      article: {
        id: params.articleId,
      },
    });
    if (data) {
      return data.id;
    }
    return null;
  }
  // 查询文章关联评论
  async findArticleReview(params: ArticleCheckReviewPageFindDto) {
    const data = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .orderBy('review.createdTime', 'DESC')
      .offset(((params.current || 1) - 1) * (params.size || 10))
      .limit(params.size || 10)
      .getMany();
    // 子查询完整用户信息
    const promiseAll = [];
    for (const item of data) {
      promiseAll.push(
        this.userService.getUserInfoById(item.user.id).then((user) => {
          item.user = user;
        }),
      );
    }
    await Promise.all(promiseAll);
    if (data) {
      return JSON.parse(JSON.stringify(data));
    }
    return null;
  }
  // 删除评论()
  async delReview(id: number, user: Partial<User>) {
    const reviewDetail = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.article', 'article')
      .where('review.id = :id', {
        id: id,
      })
      .getOne();
    // 和评论关联的文章
    const canderArticle = await this.articleService.getArticleDetail(
      reviewDetail.article.id,
    );
    // 判断用户是不是这个文章的主人
    if (canderArticle.user.id === user.id) {
      const data = this.reviewRepository.remove(reviewDetail);
      return JSON.parse(JSON.stringify(data));
    } else {
      throw new HttpException('用户没有权限删除该评论', 401);
    }
  }
}

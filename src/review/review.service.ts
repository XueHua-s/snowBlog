import { HttpException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { ArticleCheckReviewPageFindDto } from './dto/article-check-review-page-find.dto';
import { UserService } from '../user/user.service';
@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private userService: UserService,
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
}

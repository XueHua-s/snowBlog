import { HttpException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Review } from "./entities/review.entity";
@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}
  // 创建评论需包含用户id
  async createReview(params: CreateReviewDto) {
    if (!params.userId) {
      throw new HttpException('没有用户id', 500);
    }
    const data = await this.reviewRepository.insert({
      commentContent: params.commentContent,
      user: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        id: params.userId,
      },
      article: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        id: params.articleId,
      },
    });
    if (data) {
      return data.raw.insertId;
    }
    return null;
  }
}

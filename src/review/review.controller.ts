import { Controller, Post, Body, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiOperation } from '@nestjs/swagger';
import JwtAuth, { JwtSwaggerAuthHeader } from '../decorator/JwtAuth';
import { JwtAuthRequestType } from '../@type/JwtAuthRequestType';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @JwtSwaggerAuthHeader()
  @ApiOperation({
    summary: '登录用户发布评论',
  })
  @JwtAuth()
  @Post('/loggedInUsersPostComments')
  async loggedInUsersPostComments(
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: JwtAuthRequestType,
  ) {
    const data = await this.reviewService.createReview({
      ...createReviewDto,
      userId: req.user.id,
    });
    if (data) {
      return {
        code: 1,
        data,
        message: '发布成功',
      };
    }
    return {
      code: 0,
      data: null,
      message: '发布失败',
    };
  }
}

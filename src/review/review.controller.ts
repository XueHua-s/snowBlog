import { Controller, Post, Body, Req, Delete, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import JwtAuth, { JwtSwaggerAuthHeader } from '../decorator/JwtAuth';
import { JwtAuthRequestType } from '../@type/JwtAuthRequestType';
import { ArticleCheckReviewPageFindDto } from './dto/article-check-review-page-find.dto';
@ApiTags('评论接口')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @JwtSwaggerAuthHeader()
  @ApiOperation({
    summary: '登录用户发布评论',
  })
  @JwtAuth()
  @Post('loggedInUsersPostComments')
  async loggedInUsersPostComments(
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: JwtAuthRequestType,
  ) {
    const data = await this.reviewService.createReview({
      ...createReviewDto,
      user: {
        id: req.user.id,
      },
    });
    if (data) {
      return {
        code: 1,
        data,
        message: '评论成功',
      };
    }
    return {
      code: 0,
      data: null,
      message: '发布失败',
    };
  }
  @ApiOperation({
    summary: '查询文章关联评论',
  })
  @Post('checkTheCommentsUnderTheArticle')
  async checkTheCommentsUnderTheArticle(
    @Body() body: ArticleCheckReviewPageFindDto,
  ) {
    const data = await this.reviewService.findArticleReview(body);
    if (data) {
      return {
        code: 1,
        data,
        message: '查询成功',
      };
    }
    return {
      code: 0,
      data,
      message: '查询失败',
    };
  }
  @ApiOperation({
    summary: '删除评论',
  })
  @JwtSwaggerAuthHeader()
  @JwtAuth()
  @Delete('delReview/:id')
  async delReview(@Param('id') id: number, @Req() req: JwtAuthRequestType) {
    const data = await this.reviewService.delReview(id, req.user);
    if (data) {
      return {
        code: 1,
        data,
        message: '删除成功',
      };
    }
    return {
      code: 0,
      data: null,
      message: '删除失败',
    };
  }
}

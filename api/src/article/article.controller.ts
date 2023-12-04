import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import JwtAuth, { JwtSwaggerAuthHeader } from '../decorator/JwtAuth';
import { JwtAuthRequestType } from '../@type/JwtAuthRequestType';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryArticlesDto } from './dto/queryArticles.dto';
import { PagePipe } from '../pipe/Page.pipe';
import { UpdateArticleDto } from './dto/update-article.dto';
import { defineAbility } from '@casl/ability';
import { PermissionService } from '../permission/permission.service';
import { ReviewAnArticleParamsDto } from './dto/reviewAnArticleParams.dto';
@ApiTags('文章接口')
@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly permissionService: PermissionService,
  ) {}
  // 发布文章
  @JwtSwaggerAuthHeader()
  @JwtAuth()
  @ApiOperation({
    summary: '登录用户发布文章',
  })
  @Post('publishArticle')
  async publishArticle(
    @Body() createDto: CreateArticleDto,
    @Req() req: JwtAuthRequestType,
  ) {
    const data = await this.articleService.createArticle({
      ...createDto,
      user: {
        id: req.user.id,
      },
    });
    if (data) {
      return {
        code: 1,
        data: data,
        message: '创建成功',
      };
    } else {
      return {
        code: 0,
        data: null,
        message: '创建失败',
      };
    }
  }
  // 发布文章
  @JwtSwaggerAuthHeader()
  @JwtAuth()
  @ApiOperation({
    summary: '登录用户更新文章',
    description: '敏感操作,鉴权是否文章本人 + 审核权限用户可更新',
  })
  @Put('updateArticle')
  async updateArticle(
    @Body() body: UpdateArticleDto,
    @Req() req: JwtAuthRequestType,
  ) {
    const data = await this.articleService.updateArticle(body, req.user.id);
    if (data) {
      return {
        code: 1,
        data: data,
        message: '更新成功',
      };
    }
  }
  // 获取文章列表
  @ApiOperation({
    summary: '文章列表',
  })
  @Get('getArticles')
  async getArticles(@Query(PagePipe) query: QueryArticlesDto) {
    const data = await this.articleService.getArticles({
      ...query,
      // 审核通过的
      pub: 1,
    });
    if (data) {
      return {
        code: 1,
        data,
        message: '查询成功',
      };
    }
    return {
      code: 0,
      data: null,
      message: '查询失败',
    };
  }
  // 获取文章审核列表
  @JwtSwaggerAuthHeader()
  @JwtAuth()
  @ApiOperation({
    summary: '获取文章审核列表',
    description: '敏感操作，需鉴权',
  })
  @Get('getArticleReviewList')
  async getArticleReviewList(
    @Query(PagePipe) query: QueryArticlesDto,
    @Req() req: JwtAuthRequestType,
  ) {
    const ability = await this.permissionService.authenticationExpose(
      req.user.id,
    );
    if (!ability.can('examine', req.user.id.toString())) {
      return new HttpException('您没有文章审核权限', 403);
    }
    const data = await this.articleService.getArticles({
      ...query,
      // 未审核的
      pub: 0,
    });
    if (data) {
      return {
        code: 1,
        data,
        message: '查询成功',
      };
    }
    return {
      code: 0,
      data: null,
      message: '查询失败',
    };
  }
  // 通过 / 拒绝文章
  @ApiOperation({
    summary: '审批文章',
    description: '敏感操作，需鉴权',
  })
  @JwtSwaggerAuthHeader()
  @JwtAuth()
  @Post('reviewAnArticle')
  async reviewAnArticle(
    @Body() body: ReviewAnArticleParamsDto,
    @Req() req: JwtAuthRequestType,
  ) {
    const data = await this.articleService.updateArticle(body, req.user.id);
    if (data) {
      return {
        code: 1,
        data,
        message: body.pub === 1 ? '审核成功' : '拒绝成功',
      };
    }
    return {
      code: 0,
      data: null,
      message: '失败',
    };
  }
  @JwtSwaggerAuthHeader()
  @JwtAuth()
  @ApiOperation({
    summary: '登录用户删除文章',
    description: '敏感操作,鉴权是否文章本人 + 审核权限用户可更新',
  })
  @Delete('delArticle')
  async delArticle(@Param('id') id: number, @Req() req: JwtAuthRequestType) {
    const data = await this.articleService.delArticle(id, req.user.id);
    if (data) {
      return {
        code: 1,
        data,
        message: '删除成功',
      };
    }
    return {
      code: 0,
      data,
      message: '删除失败',
    };
  }
  // 获取文章详情
  @ApiOperation({
    summary: '获取文章详情',
  })
  @Get('getArticleById/:id')
  async getArticleById(@Param('id') id: number) {
    const data = await this.articleService.getArticleDetail(id);
    if (data) {
      return {
        code: 1,
        data: {
          ...data,
        },
        message: '查询成功',
      };
    }
    return {
      code: 0,
      data: null,
      message: '未查询到该文章',
    };
  }
}

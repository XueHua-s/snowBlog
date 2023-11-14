import {
  Body,
  Controller,
  Delete,
  Get,
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
@ApiTags('文章接口')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
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
    // console.log(createDto, 'createDto');
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
    const data = await this.articleService.getArticles(query);
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

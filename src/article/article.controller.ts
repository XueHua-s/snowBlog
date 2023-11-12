import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UsePipes,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import JwtAuth, { JwtSwaggerAuthHeader } from '../decorator/JwtAuth';
import { JwtAuthRequestType } from '../@type/JwtAuthRequestType';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryArticlesDto } from './dto/queryArticles.dto';
import { PagePipe } from '../pipe/Page.pipe';
import { FindClassifyThreeDto } from './dto/findClassifyThree.dto';
@ApiTags('文章')
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
        id: req.user.id
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
  @ApiOperation({
    summary: '获取树状分类列表',
  })
  @Post('getClassifyList')
  async getClassifyList(@Body() body: FindClassifyThreeDto) {
    const data = await this.articleService.getClassifyThree(body);
    if (data) {
      return {
        code: 1,
        data,
        message: '查询成功',
      };
    }
    return {
      code: 1,
      data,
      message: '查询成功',
    };
  }
}

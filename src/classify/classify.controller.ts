import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { ClassifyService } from './classify.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindClassifyThreeDto } from '../article/dto/findClassifyThree.dto';
import JwtAuth, { JwtSwaggerAuthHeader } from "../decorator/JwtAuth";
import { CreateClassifyDto } from "./dto/create-classify.dto";
import { JwtAuthRequestType } from "../@type/JwtAuthRequestType";
import { UpdateClassifyDto } from "./dto/update-classify.dto";
@ApiTags('文章分类接口')
@Controller('classify')
export class ClassifyController {
  constructor(private classifyService: ClassifyService) {}
  @ApiOperation({
    summary: '获取树状分类列表',
  })
  @Post('getClassifyList')
  async getClassifyList(@Body() body: FindClassifyThreeDto) {
    const data = await this.classifyService.getClassifyThree(body);
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
  @JwtAuth()
  @JwtSwaggerAuthHeader()
  @ApiOperation({
    summary: '新增分类',
    description: '敏感操作,需鉴权',
  })
  @Post('addClassify')
  async addClassify(
    @Body() body: CreateClassifyDto,
    @Req() req: JwtAuthRequestType,
  ) {
    const data = await this.classifyService.addClassify(body, req.user.id);
    if (data) {
      return {
        code: 1,
        data,
        message: '新增成功',
      };
    }
    return {
      code: 0,
      data,
      message: '新增失败',
    };
  }
  @JwtAuth()
  @JwtSwaggerAuthHeader()
  @ApiOperation({
    summary: '更新分类',
    description: '敏感操作,需鉴权',
  })
  @Put('updateClassify')
  async updateClassify(
    @Body() body: UpdateClassifyDto,
    @Req() req: JwtAuthRequestType,
  ) {
    const data = await this.classifyService.addClassify(body, req.user.id);
    if (data) {
      return {
        code: 1,
        data,
        message: '新增成功',
      };
    }
    return {
      code: 0,
      data,
      message: '新增失败',
    };
  }
}

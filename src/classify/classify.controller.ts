import { Body, Controller, Post } from '@nestjs/common';
import { ClassifyService } from './classify.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindClassifyThreeDto } from '../article/dto/findClassifyThree.dto';
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
}

import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindLogsQueryDto } from './dto/find-logs-query.dto';
import JwtAuth, { JwtSwaggerAuthHeader } from '../decorator/JwtAuth';
import { LogService } from './log.service';
import { JwtAuthRequestType } from '../@type/JwtAuthRequestType';
@ApiTags('日志接口')
@Controller('log')
export class LogController {
  constructor(private readonly logservice: LogService) {}
  @JwtAuth()
  @JwtSwaggerAuthHeader()
  @ApiOperation({
    summary: '查询日志',
    description: '敏感操作需鉴权',
  })
  @Post('findLogs')
  async findLogs(
    @Body() body: FindLogsQueryDto,
    @Req() req: JwtAuthRequestType,
  ) {
    const data = await this.logservice.getLogs(body, req.user.id);
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
}

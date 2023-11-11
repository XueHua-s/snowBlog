import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import JwtAuth, { JwtSwaggerAuthHeader } from '../decorator/JwtAuth';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthRequestType } from '../@type/JwtAuthRequestType';
import { UserProfileDto } from './dto/userProfile.dto';
@ApiTags('用户相关接口')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('hello')
  hello() {
    return '你好世界';
  }
  @ApiOperation({
    summary: '获取登录人信息',
  })
  @JwtSwaggerAuthHeader()
  @JwtAuth()
  @Get('getUserInformation')
  async getUserInformation(@Req() req: JwtAuthRequestType) {
    const user = req.user;
    const data = await this.userService.getUserInfoById(user.id);
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
      message: '该用户没有资料记录',
    };
  }
  @ApiOperation({
    summary: '更新登录人信息',
  })
  @JwtSwaggerAuthHeader()
  @JwtAuth()
  @Put('updateUserInfo')
  async updateUserInfo(
    @Req() req: JwtAuthRequestType,
    @Body() proFile: UserProfileDto,
  ) {
    const data = await this.userService.updateUserInfo({
      ...proFile,
      userId: req.user.id,
    });
    if (data) {
      return {
        code: 0,
        data: {
          ...data,
        },
        message: '更新成功',
      };
    }
    return {
      code: 1,
      data: null,
      message: '更新失败',
    };
  }
}

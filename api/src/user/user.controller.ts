import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import JwtAuth, { JwtSwaggerAuthHeader } from '../decorator/JwtAuth';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthRequestType } from '../@type/JwtAuthRequestType';
import { UserProfileDto } from './dto/userProfile.dto';
import { UserSetRolePipe } from './pipe/userSetRole.pipe';
import { UserSetRoleDto } from './dto/userSetRole.dto';
@ApiTags('用户接口')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // 获取登录人信息
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
  // 更新登录人信息
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
      user: {
        id: req.user.id,
      },
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
  // 通过id获取用户信息
  @ApiOperation({
    summary: '通过id获取用户信息',
  })
  @Get('getUserInfoById/:id')
  async getUserById(@Param('id') id: number) {
    const data = await this.userService.getUserInfoById(id);
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
      message: '为查找到该用户信息',
    };
  }
  @ApiOperation({
    summary: '为用户分配角色',
    description: '敏感数据需鉴权',
  })
  @JwtSwaggerAuthHeader()
  @JwtAuth()
  @Post('setUserRole')
  async setUserRole(@Body(UserSetRolePipe) body: UserSetRoleDto, req: JwtAuthRequestType) {
    const data = await this.userService.setUserRole(body, req.user.id);
    if (data) {
      return {
        code: 1,
        data,
        message: '分配成功',
      };
    }
    return {
      code: 0,
      data,
      message: '分配失败',
    };
  }
}

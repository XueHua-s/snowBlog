import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import jwtAuth, { JwtSwaggerAuthHeader } from '../decorator/JwtAuth';
import { JwtAuthRequestType } from '../@type/JwtAuthRequestType';
@ApiTags('权限接口')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  @ApiOperation({
    summary: '通过角色ID获取权限',
  })
  // 通过角色获取权限
  // @JwtSwaggerAuthHeader()
  // @jwtAuth()
  @Get('getPermissionByRole/:roleId')
  async getPermissionByRole(@Param('roleId') roleId: number) {
    const data = await this.permissionService.getPermissionByRole(roleId);
    if (data) {
      return {
        code: 1,
        data: data,
        message: '查询成功',
      };
    }
    return {
      code: 0,
      data: null,
      message: '查询失败',
    };
  }
  @ApiOperation({ summary: '查询登录人权限' })
  @JwtSwaggerAuthHeader()
  @jwtAuth()
  @Get('exampleQueryAllPermissionsOfAUser')
  async exampleQueryAllPermissionsOfAUser(@Req() req: JwtAuthRequestType) {
    const data = await this.permissionService.exampleQueryAllPermissionsOfAUser(
      req.user.id,
    );
    if (data) {
      return {
        code: 1,
        data: data,
        message: '查询成功',
      };
    }
    return {
      code: 0,
      data: null,
      message: '查询失败',
    };
  }
}

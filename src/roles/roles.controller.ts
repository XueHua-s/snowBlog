import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { RolesService } from './roles.service';
import JwtAuth, { JwtSwaggerAuthHeader } from '../decorator/JwtAuth';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthRequestType } from '../@type/JwtAuthRequestType';
import { FindRoleListDto } from './dto/find-role-list.dto';
import { PermissionService } from '../permission/permission.service';
import { FindRoleUsersDto } from './dto/find-role-users.dto';
@ApiTags('角色接口')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly permissionService: PermissionService,
  ) {}
  @JwtSwaggerAuthHeader()
  @JwtAuth()
  @ApiOperation({
    summary: '获取登录人拥有的角色',
  })
  @Get('getUserMenus')
  async getUserMenus(@Req() req: JwtAuthRequestType) {
    const data = await this.rolesService.getUserRoles(req.user.id);
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
  @JwtSwaggerAuthHeader()
  @JwtAuth()
  @ApiOperation({
    summary: '分页查询角色列表',
  })
  @Post('findRoles')
  async findRoles(@Body() body: FindRoleListDto) {
    const data = await this.rolesService.getRoleQueryPage(body);
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
    summary: '查询角色下所有用户',
    description: '敏感数据，需鉴权',
  })
  @Post('findRoleAllUser')
  async findRoleAllUser(
    @Body() body: FindRoleUsersDto,
    @Req() req: JwtAuthRequestType,
  ) {
    // 验证用户敏感数据权限
    const ablity = await this.permissionService.authenticationExpose(
      req.user.id,
    );
    if (ablity.can('sensitiveQuery', req.user.id.toString())) {
      const data = await this.rolesService.findRoleAllUser(body);
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
    return {
      code: 0,
      data: null,
      message: '您没有查看敏感数据的权限',
    };
  }
}

import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { RolesService } from './roles.service';
import JwtAuth, { JwtSwaggerAuthHeader } from '../decorator/JwtAuth';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthRequestType } from '../@type/JwtAuthRequestType';
import { FindRoleListDto } from './dto/find-role-list.dto';
import { FindRoleUsersDto } from './dto/find-role-users.dto';
import { AllotRolePermissionDto } from './dto/allot-role-permission.dto';
import { AllotRolePipe } from './pipe/allotRole.pipe';
@ApiTags('角色接口')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @JwtSwaggerAuthHeader()
  @JwtAuth()
  @ApiOperation({
    summary: '获取登录人拥有的角色',
  })
  @Get('getUserRoles')
  async getUserRoles(@Req() req: JwtAuthRequestType) {
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
    const data = await this.rolesService.findRoleAllUser(body, req.user.id);
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
    summary: '为角色分类权限',
    description: '敏感数据，需鉴权',
  })
  @Post('allotRolePermisson')
  async allotRolePermisson(
    @Body(AllotRolePipe) body: AllotRolePermissionDto,
    @Req() req: JwtAuthRequestType,
  ) {
    console.log(body);
    const data = await this.rolesService.saveRolePermission(body, req.user.id);
    if (data) {
      return {
        code: 1,
        data: data,
        message: '分配成功',
      };
    }
    return {
      code: 0,
      data: null,
      message: '失败',
    };
  }
}

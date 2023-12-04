import {
  Body,
  Controller,
  Get,
  HttpException, Param,
  Post,
  Req
} from "@nestjs/common";
import { RolesService } from './roles.service';
import JwtAuth, { JwtSwaggerAuthHeader } from '../decorator/JwtAuth';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthRequestType } from '../@type/JwtAuthRequestType';
import { FindRoleListDto } from './dto/find-role-list.dto';
import { FindRoleUsersDto } from './dto/find-role-users.dto';
import { AllotRolePermissionDto } from './dto/allot-role-permission.dto';
import { AllotRolePipe } from './pipe/allotRole.pipe';
import { PermissionService } from '../permission/permission.service';
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
  @ApiOperation({
    summary: '通过用户id获取角色',
  })
  @Get('getUserRolesById/:userId')
  async getUserRolesById(@Param('userId') userId: number) {
    const data = await this.rolesService.getUserRoles(userId);
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
  // @JwtSwaggerAuthHeader()
  // @JwtAuth()
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
    const ablity = await this.permissionService.authenticationExpose(req.user.id);
    if (!ablity.can('sensitiveQuery', req.user.id.toString())) {
      return new HttpException('您没有权限查看', 403);
    }
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
  @JwtSwaggerAuthHeader()
  @JwtAuth()
  @ApiOperation({
    summary: '为角色分配权限',
    description: '敏感数据，需鉴权',
  })
  @Post('allotRolePermisson')
  async allotRolePermisson(
    @Body(AllotRolePipe) body: AllotRolePermissionDto,
    @Req() req: JwtAuthRequestType,
  ) {
    const ability = await this.permissionService.authenticationExpose(
      req.user.id,
    );
    if (!ability.can('allotRolePermisson', req.user.toString)) {
      return new HttpException('您没有权限为角色分配权限', 403);
    }
    const data = await this.rolesService.saveRolePermission(body);
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

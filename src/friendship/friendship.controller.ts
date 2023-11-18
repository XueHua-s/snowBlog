import { Controller, Post, Body, Req, Put, Delete, Param } from "@nestjs/common";
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import JwtAuth, { JwtSwaggerAuthHeader } from '../decorator/JwtAuth';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthRequestType } from '../@type/JwtAuthRequestType';
import { UpdateFriendshipDto } from "./dto/update-friendship.dto";
import { QueryFriendshipDto } from "./dto/query-friendship.dto";
@ApiTags('友链接口')
@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}
  // 新增友链
  @ApiOperation({ summary: '新增友情链接' })
  @JwtAuth()
  @JwtSwaggerAuthHeader()
  @Post('addFriendship')
  async addFriendship(
    @Body() createFriendshipDto: CreateFriendshipDto,
    @Req() req: JwtAuthRequestType,
  ) {
    const data = await this.friendshipService.addFriendship({
      ...createFriendshipDto,
      user: req.user,
    });
    if (data) {
      return {
        code: 1,
        data,
        message: '新建成功',
      };
    }
    return {
      code: 0,
      data,
      message: '新建失败',
    };
  }
  // 编辑
  @ApiOperation({ summary: '更新友情链接' })
  @JwtAuth()
  @JwtSwaggerAuthHeader()
  @Put('updateFriendship')
  async updateFriendship(
    @Body() createFriendshipDto: UpdateFriendshipDto,
    @Req() req: JwtAuthRequestType,
  ) {
    const data = await this.friendshipService.addFriendship({
      ...createFriendshipDto,
      user: req.user,
    });
    if (data) {
      return {
        code: 1,
        data,
        message: '更新成功',
      };
    }
    return {
      code: 0,
      data,
      message: '更新失败',
    };
  }
  // 删除
  @ApiOperation({ summary: '删除友情链接' })
  @JwtAuth()
  @JwtSwaggerAuthHeader()
  @Delete('delFriendship/:id')
  async delFriendship(@Param('id') id: number, @Req() req: JwtAuthRequestType) {
    const data = await this.friendshipService.delFriendship(id, req.user.id);
    if (data) {
      return {
        code: 1,
        data,
        message: '删除成功',
      };
    }
    return {
      code: 0,
      data,
      message: '删除失败',
    };
  }
  // 查询
  @ApiOperation({ summary: '查询链接列表' })
  @Post('queryFriendship')
  async queryFriendship(@Body() body: QueryFriendshipDto) {
    const data = await this.friendshipService.getQueryPageFriendship(body);
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

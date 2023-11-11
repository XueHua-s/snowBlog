import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import JwtAuth from '../decorator/JwtAuth';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('用户相关接口')
@JwtAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('hello')
  hello() {
    return '你好世界';
  }
}

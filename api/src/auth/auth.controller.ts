import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SigninUserDto } from './dto/signin-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
@ApiTags('鉴权接口')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}
  @ApiOperation({
    summary: '用户登录接口',
  })
  @Post('login')
  async login(@Body() user: SigninUserDto) {
    const res = await this.userService.verifyUserAndPassword(user);
    if (res) {
      return {
        code: 1,
        data: {
          ...res,
          token: await this.jwt.signAsync({
            username: res.username,
            password: res.password || '',
            id: res.id,
          }),
        },
        message: '登录成功',
      };
    }
    console.log(res, 'res');
    return {
      code: 0,
      data: res,
      message: '登录失败',
    };
  }
  @ApiOperation({
    summary: '用户注册接口',
  })
  @Post('register')
  async register(@Body() user: SigninUserDto) {
    const res = await this.userService.registerUser(user);
    return {
      code: 1,
      data: {
        ...res,
        password: undefined,
      },
      message: '注册成功',
    };
  }
}

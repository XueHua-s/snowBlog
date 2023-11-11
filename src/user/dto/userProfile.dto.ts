import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
// 无用户id的dto
export class UserProfileDto {
  @ApiProperty({
    example: '',
    required: false,
    title: '昵称',
  })
  @IsString()
  nickName: string;
  @ApiProperty({
    example: '',
    required: false,
    title: '信息描述',
  })
  @IsString()
  signature: string;
  @ApiProperty({
    example: '',
    required: false,
    title: '主页地址',
  })
  @IsString()
  homepage: string;
}
// 带用户id的dto
export class UserProfileUpdateDto extends UserProfileDto {
  constructor() {
    super();
  }
  @ApiProperty({
    example: '',
    required: false,
    title: '用户id',
  })
  @IsNumber()
  userId: number;
}
// 带主键id的dto
export class UserProfileChangeDto extends UserProfileDto {
  constructor() {
    super();
  }
  @ApiProperty({
    example: '',
    required: false,
    title: '记录id',
  })
  @IsNumber()
  id: number;
}

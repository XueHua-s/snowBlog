import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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
    description: '头像传base64',
    title: '头像',
  })
  @IsString()
  avatar: string;
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
  user: {
    id: number;
  };
}

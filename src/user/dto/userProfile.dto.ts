import { IsByteLength, IsOptional, IsString, validate } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class UserProfileDto {
  @ApiProperty({
    example: '',
    required: false,
    title: '昵称',
  })
  @IsByteLength(1, 12)
  @IsString()
  @IsOptional()
  nickName: string;
  @ApiProperty({
    example: '',
    required: false,
    description: '头像传base64',
    title: '头像',
  })
  @IsString()
  @IsOptional()
  avatar: string;
  @ApiProperty({
    example: '',
    required: false,
    title: '信息描述',
  })
  @IsByteLength(0, 255)
  @IsString()
  @IsOptional()
  signature: string;
  @ApiProperty({
    example: '',
    required: false,
    title: '主页地址',
  })
  @IsByteLength(0, 255)
  @IsString()
  @IsOptional()
  homepage: string;
  user: {
    id: number;
  };
}

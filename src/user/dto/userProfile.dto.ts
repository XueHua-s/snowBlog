import { IsByteLength, IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class UserProfileDto {
  @ApiProperty({
    example: '',
    required: false,
    minLength: 1,
    maxLength: 12,
    title: '昵称',
  })
  @Length(1, 12)
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
    maxLength: 255,
    minLength: 0,
  })
  @Length(0, 255)
  @IsString()
  @IsOptional()
  signature: string;
  @ApiProperty({
    example: '',
    required: false,
    title: '主页地址',
    maxLength: 255,
    minLength: 0,
  })
  @Length(0, 255)
  @IsString()
  @IsOptional()
  homepage: string;
  user: {
    id: number;
  };
}

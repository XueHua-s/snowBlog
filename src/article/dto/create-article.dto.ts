import { ApiProperty } from '@nestjs/swagger';
import { IsByteLength, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    required: true,
    title: '标题',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty({
    required: true,
    title: '文章描述',
  })
  @IsByteLength(0, 255)
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty({
    required: true,
    title: '文章内容',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
  @ApiProperty({
    required: true,
    title: '分类id',
  })
  @IsNumber()
  @IsOptional()
  classifyId: number;
  @ApiProperty({
    required: false,
    title: '文章封面(base64)',
  })
  @IsString()
  @IsOptional()
  cover: string;
  user: {
    id: number;
  };
}

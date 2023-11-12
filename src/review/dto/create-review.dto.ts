import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: '评论内容',
  })
  commentContent: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    title: '文章id',
  })
  articleId: number;
  userId: number;
}

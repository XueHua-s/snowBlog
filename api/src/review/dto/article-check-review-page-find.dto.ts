import { PageDto } from '../../dto/PageDto.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common';

export class ArticleCheckReviewPageFindDto extends PageDto {
  @ApiProperty({
    title: '文章ID',
  })
  @IsNumber()
  @IsNotEmpty()
  articleId: number;
  @ApiProperty({
    title: '评论排序asc/desc',
  })
  @Validate((target: string) => {
    if (target !== "ASC" && target !== "DESC" && target !== undefined) {
      throw new HttpException("您输入的值不正确", 500)
    }
  })
  @IsOptional()
  @IsString()
  sort: "ASC" | "DESC" | undefined;
}

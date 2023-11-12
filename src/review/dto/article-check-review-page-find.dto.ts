import { PageDto } from '../../dto/PageDto.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleCheckReviewPageFindDto extends PageDto {
  @ApiProperty({
    title: '文章ID',
  })
  @IsNumber()
  @IsNotEmpty()
  articleId: number;
}

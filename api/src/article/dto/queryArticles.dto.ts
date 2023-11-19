import { PageDto } from '../../dto/PageDto.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryArticlesDto extends PageDto {
  constructor() {
    super();
  }
  @ApiProperty({
    title: '筛选参数',
    required: false,
  })
  @IsOptional()
  @IsString()
  title: string;
  @ApiProperty({
    title: '筛选参数',
    required: false,
  })
  @ApiProperty({
    title: '排序',
    description: '1降序, 2升序, 默认为1',
    required: false,
  })
  @IsOptional()
  @IsString()
  orderBy: string;
  @ApiProperty({
    title: '分类ID',
    required: false,
  })
  @IsOptional()
  classifyId: number;
  @ApiProperty({
    title: '用户ID',
    required: false,
  })
  @IsOptional()
  userId: number;
  // 不可见, 客户端不可传
  pub: number;
}

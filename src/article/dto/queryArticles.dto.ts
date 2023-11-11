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
}

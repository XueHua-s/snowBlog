import { PageDto } from '../../dto/PageDto.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindClassifyThreeDto extends PageDto {
  constructor() {
    super();
  }
  @ApiProperty({
    title: '父级分类名称',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;
}

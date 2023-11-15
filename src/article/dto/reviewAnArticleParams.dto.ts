import { IsIn, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ReviewAnArticleParamsDto {
  @ApiProperty({
    title: '主键id',
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @ApiProperty({
    title: '发布状态',
    description: '1通过, 2: 拒绝',
    example: 1,
  })
  @IsIn([1, 2])
  @IsNumber()
  @IsNotEmpty()
  pub: number;
}

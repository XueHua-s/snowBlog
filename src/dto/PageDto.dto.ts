import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PageDto {
  @ApiProperty({
    title: '当前页',
    example: 1,
  })
  // @IsNumber()
  @IsNotEmpty()
  current: number;
  @ApiProperty({
    title: '每页几条',
    example: 10,
  })
  // @IsNumber()
  @IsNotEmpty()
  size: number;
}

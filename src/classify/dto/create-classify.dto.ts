import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassifyDto {
  id: number;
  @ApiProperty({
    title: '分类名称',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    title: '图标',
  })
  @IsString()
  @IsNotEmpty()
  icon: string;
  @ApiProperty({
    title: '父节点',
  })
  @IsNumber()
  @IsOptional()
  parentId: number;
}

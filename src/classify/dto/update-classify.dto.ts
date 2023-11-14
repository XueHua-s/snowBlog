import { ApiProperty } from '@nestjs/swagger';
import { CreateClassifyDto } from './create-classify.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateClassifyDto extends CreateClassifyDto {
  @ApiProperty({
    title: '分类id',
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

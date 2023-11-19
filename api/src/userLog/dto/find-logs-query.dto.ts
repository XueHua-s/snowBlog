import { PageDto } from '../../dto/PageDto.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class FindLogsQueryDto extends PageDto {
  @ApiProperty({
    title: '用户id',
  })
  @IsNumber()
  @IsOptional()
  userId: number;
}

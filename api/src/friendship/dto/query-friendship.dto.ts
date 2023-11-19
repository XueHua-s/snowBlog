import { PageDto } from '../../dto/PageDto.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryFriendshipDto extends PageDto {
  @ApiProperty({
    title: '名称',
  })
  @IsString()
  @IsOptional()
  name: string;
}

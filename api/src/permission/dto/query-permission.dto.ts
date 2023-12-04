import { PageDto } from '../../dto/PageDto.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from "class-validator";

export class CreatePermissionDto extends PageDto {
  @ApiProperty({
    title: '名称',
  })
  @IsOptional()
  name: string;
}

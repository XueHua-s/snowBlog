import { PageDto } from '../../dto/PageDto.dto';
import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FindRoleListDto extends PageDto {
  @ApiProperty({
    title: '角色名称',
  })
  @IsString()
  @IsOptional()
  roleName: string;
}

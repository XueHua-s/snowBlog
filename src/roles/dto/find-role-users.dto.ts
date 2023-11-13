import { PageDto } from '../../dto/PageDto.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindRoleUsersDto extends PageDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    title: '角色id',
  })
  roleId: number;
}

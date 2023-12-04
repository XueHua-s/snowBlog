import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Role } from '../../roles/entities/role.entity';

export class UserSetRoleDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ title: '用户id' })
  id: number;
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    title: '角色列表',
    example: [1, 2, 3],
  })
  roles: Partial<Role>[];
}

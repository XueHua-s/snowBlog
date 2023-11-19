import { Permission } from '../../permission/entities/permission.entity';
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AllotRolePermissionDto {
  @ApiProperty({
    title: '角色id',
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @ApiProperty({
    title: '权限列表',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNotEmpty()
  permissions: Partial<Permission>[];
}

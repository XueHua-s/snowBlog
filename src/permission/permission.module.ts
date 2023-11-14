import { forwardRef, Global, Module } from "@nestjs/common";
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../roles/entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RolesModule } from '../roles/roles.module';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission]),
    forwardRef(() => RolesModule),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}

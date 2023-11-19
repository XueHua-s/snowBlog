import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { User } from '../user/entities/user.entity';
import { PermissionModule } from '../permission/permission.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User]),
    forwardRef(() => PermissionModule),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}

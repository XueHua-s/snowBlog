import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { Permission } from '../permission/entities/permission.entity';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User, Permission]),
    UserModule,
    forwardRef(() => PermissionModule),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}

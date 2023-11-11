import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logs } from '../userLog/entities/logs.entity';
import { User } from './entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Logs, User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

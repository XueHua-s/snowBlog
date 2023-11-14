import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { PermissionModule } from '../permission/permission.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logs } from './entities/logs.entity';
import { LogController } from './log.controller';

@Module({
  imports: [PermissionModule, TypeOrmModule.forFeature([Logs])],
  providers: [LogService],
  exports: [LogService],
  controllers: [LogController],
})
export class LogModule {}

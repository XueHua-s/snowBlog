import { HttpException, Injectable } from '@nestjs/common';
import { FindLogsQueryDto } from './dto/find-logs-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logs } from './entities/logs.entity';
import { PermissionService } from '../permission/permission.service';
import { AddLogDto } from './dto/add-log.dto';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
    private readonly permissionService: PermissionService,
  ) {}
  // 查看日志
  async getLogs(params: FindLogsQueryDto, userId: number) {
    const ability = await this.permissionService.authenticationExpose(userId);
    if (!ability.can('sensitiveQuery', userId.toString)) {
      return new HttpException('您没有权限查看日志', 403);
    }
    const builderFind = this.logsRepository
      .createQueryBuilder('')
      .leftJoinAndSelect('log.user', 'user');
    if (params.userId) {
      builderFind.where('user.id', {
        id: params.userId,
      });
    }
    const data = await builderFind
      .offset(((params.current || 1) - 1) * (params.size || 10))
      .limit(params.size || 10)
      .getMany();
    const total = await builderFind.getCount();
    return {
      records: JSON.parse(JSON.stringify(data)),
      total,
    };
  }
  async addLog(log: AddLogDto) {
    const data = await this.logsRepository.save(log);
    return data;
  }
}

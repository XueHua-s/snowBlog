import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DBENUM } from '../@enums/DBENUM';
import { User } from '../user/entities/user.entity';
import { Logs } from '../userLog/entities/logs.entity';
import { Profile } from "../user/entities/profile.entity";

export const typeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    ({
      type: configService.get(DBENUM.DB_TYPE),
      host: configService.get(DBENUM.DB_HOST),
      username: configService.get(DBENUM.DB_USERNAME),
      password: configService.get(DBENUM.DB_PASSWORD),
      database: configService.get(DBENUM.DB_BASE),
      entities: [User, Logs, Profile],
      // 同步本地的schema与数据库 -> 初始化时去使用
      synchronize: true,
      logging: ['error'],
    }) as TypeOrmModuleOptions,
});

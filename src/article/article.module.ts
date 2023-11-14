import { forwardRef, Module } from "@nestjs/common";
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ClassifyModule } from '../classify/classify.module';
import { PermissionModule } from "../permission/permission.module";
import { LogModule } from "../userLog/log.module";

@Module({
  imports: [
    UserModule,
    forwardRef(() => ClassifyModule),
    TypeOrmModule.forFeature([Article]),
    PermissionModule,
    LogModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}

import { forwardRef, Module } from '@nestjs/common';
import { ClassifyService } from './classify.service';
import { ClassifyController } from './classify.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classify } from './entities/classify.entity';
import { ArticleModule } from '../article/article.module';
import { PermissionModule } from '../permission/permission.module';
import { LogModule } from '../userLog/log.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Classify]),
    forwardRef(() => ArticleModule),
    PermissionModule,
    LogModule,
  ],
  controllers: [ClassifyController],
  providers: [ClassifyService],
  exports: [ClassifyService],
})
export class ClassifyModule {}

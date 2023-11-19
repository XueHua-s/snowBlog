import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { UserModule } from '../user/user.module';
import { Article } from '../article/entities/article.entity';
import { ArticleModule } from '../article/article.module';
import { PermissionModule } from '../permission/permission.module';
import { LogModule } from '../userLog/log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    UserModule,
    ArticleModule,
    PermissionModule,
    LogModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}

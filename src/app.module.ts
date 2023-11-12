import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { typeOrmModule } from './TypeOrm/TypeOrm.module';
const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;
import { LoggerModule } from 'nestjs-pino';
import { UserModule } from './user/user.module';
import { AuthModule } from "./auth/auth.module";
import { LogModule } from './userLog/log.module';
import { LogService } from './userLog/log.service';
import { ArticleModule } from './article/article.module';
import { ReviewModule } from './review/review.module';
@Module({
  imports: [
    // 环境变量模块
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      // load: [() => dotenv.config({ path: '.env' })],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'uat')
          .default('development'),
        DB_PORT: Joi.number().default(3306),
        DB_HOST: Joi.string().required(),
        DB_TYPE: Joi.string().valid('mysql'),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
      }),
    }),
    typeOrmModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV === 'production'
            ? {
                target: 'pino-roll',
                options: {
                  file: 'log.txt',
                  frequency: 'daily',
                  mkdir: true,
                },
              }
            : {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                },
              },
      },
    }),
    UserModule,
    AuthModule,
    LogModule,
    ArticleModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService, LogService],
})
export class AppModule {}

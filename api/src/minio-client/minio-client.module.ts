import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioClientController } from './minio-client.controller';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from "@nestjs/config";
@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        endPoint: configService.get('MINIO_ENDPOINT'),
        port: parseInt(configService.get('MINIO_PORT')),
        useSSL: false,
        accessKey: configService.get('MINIO_ACCESSKEY'),
        secretKey: configService.get('MINIO_SECRETKEY'),
      }),
    }),
  ],
  controllers: [MinioClientController],
  providers: [MinioClientService],
})
export class MinioClientModule {}

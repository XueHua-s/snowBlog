import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  Inject,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { MinioClientService } from './minio-client.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Reflector } from '@nestjs/core';
import JwtAuth, { JwtSwaggerAuthHeader } from "../decorator/JwtAuth";
import { ConfigService } from "@nestjs/config";
@ApiTags('文件')
@Controller('minio-client')
export class MinioClientController {
  constructor(
    private readonly minioClientService: MinioClientService,
    @Inject(Reflector) private readonly reflector: Reflector,
    private configService: ConfigService,
  ) {}
  @JwtSwaggerAuthHeader()
  @JwtAuth()
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '文件上传,返回 url 地址' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          description: '文件',
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadMinio(@UploadedFile() file: any, @Req() req: Request) {
    const data = await this.minioClientService.upload({ file: file }, `${this.configService.get('MINIO_CONACT')}${req.get('host')}${req.path}`);
    if (data) {
      return {
        code: 1,
        data,
        message: '上传成功',
      };
    }
    return null;
  }
  @ApiProperty({
    description: '获取文件',
  })
  @Get('file/:fileName')
  async getFile(
    @Param('fileName') fileName: string,
    @Res() response: Response,
  ) {
    const file = await this.minioClientService.getFile(fileName);
    response.setHeader('Content-Type', 'application/octet-stream');
    // 发送二进制数据给客户端
    response.send(file);
  }
}
